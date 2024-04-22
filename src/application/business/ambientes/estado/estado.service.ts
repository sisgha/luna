import { Injectable, NotFoundException } from '@nestjs/common';
import * as Dto from '@sisgea/spec';
import { IEstadoFindOneByIdInputDto, IEstadoFindOneByUfInputDto } from '@sisgea/spec';
import { AppResource, AppResourceView } from 'application/utils/qbEfficientLoad';
import { paginateConfig } from 'infrastructure/utils/paginateConfig';
import { map } from 'lodash';
import { paginate } from 'nestjs-paginate';
import { IContextoDeAcesso } from '../../../../domain';
import { getPaginateQueryFromSearchInput, getPaginatedResultDto } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';

const aliasEstado = 'estado';

@Injectable()
export class EstadoService {
  constructor(private databaseContext: DatabaseContextService) {}

  get baseEstadoRepository() {
    return this.databaseContext.estadoRepository;
  }

  //

  async findAll(clienteAccess: IContextoDeAcesso, dto?: Dto.ISearchInputDto, selection?: string[]): Promise<Dto.IEstadoFindAllResultDto> {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder(aliasEstado);

    // =========================================================

    await clienteAccess.aplicarFiltro('estado:find', qb, aliasEstado, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
      ...paginateConfig,
      select: ['id'],
      searchableColumns: ['nome', 'sigla'],
      sortableColumns: ['id', 'nome', 'sigla'],
      defaultSortBy: [['nome', 'ASC']],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);
    AppResourceView(AppResource.ESTADO, qb, aliasEstado, selection);

    // =========================================================

    paginated.data = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();

    // =========================================================

    return getPaginatedResultDto(paginated);
  }

  async findByUf(clienteAccess: IContextoDeAcesso, dto: IEstadoFindOneByUfInputDto, selection?: string[]) {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder(aliasEstado);

    // =========================================================

    await clienteAccess.aplicarFiltro('estado:find', qb, aliasEstado, null);

    // =========================================================

    qb.andWhere(`${aliasEstado}.sigla = :sigla`, { sigla: dto.uf.toUpperCase() });

    // =========================================================

    qb.select([]);
    AppResourceView(AppResource.ESTADO, qb, aliasEstado, selection);

    // =========================================================

    const estado = await qb.getOne();

    // =========================================================

    return estado;
  }

  async findByUfStrict(clienteAccess: IContextoDeAcesso, dto: IEstadoFindOneByUfInputDto, selection?: string[]) {
    const estado = await this.findByUf(clienteAccess, dto, selection);

    if (!estado) {
      throw new NotFoundException();
    }

    return estado;
  }

  async findById(clienteAccess: IContextoDeAcesso, dto: IEstadoFindOneByIdInputDto, selection?: string[]) {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder('estado');

    // =========================================================

    await clienteAccess.aplicarFiltro('estado:find', qb, aliasEstado, null);

    // =========================================================

    qb.andWhere(`${aliasEstado}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    AppResourceView(AppResource.ESTADO, qb, aliasEstado, selection);

    // =========================================================

    const estado = await qb.getOne();

    // =========================================================

    return estado;
  }

  async findByIdStrict(clienteAccess: IContextoDeAcesso, dto: IEstadoFindOneByIdInputDto, selection?: string[]) {
    const estado = await this.findById(clienteAccess, dto, selection);

    if (!estado) {
      throw new NotFoundException();
    }

    return estado;
  }
}
