import { Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { Operacao } from '../../../especificacao';
import { GqlDtoInput } from '../../../legacy';
import { DiarioProfessorService } from './diario-professor.service';
import { DiarioProfessorDto } from './diario-professor.dtos';

@Resolver(() => DiarioProfessorDto)
export class DiarioProfessorResolver {
  constructor(private diarioProfessorService: DiarioProfessorService) {}

  @Operacao(Spec.DiarioProfessorFindAllOperator())
  async diarioProfessorFindAll(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Spec.DiarioProfessorFindAllOperator()) dto: Spec.ISearchInputDto,
  ) {
    return this.diarioProfessorService.diarioProfessorFindAll(contextoDeAcesso, dto);
  }

  @Operacao(Spec.DiarioProfessorFindOneByIdOperator())
  async diarioProfessorFindOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Spec.DiarioProfessorFindOneByIdOperator()) dto: Spec.IDiarioProfessorFindOneByIdInputDto,
  ) {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(contextoDeAcesso, dto);
  }

  @Operacao(Spec.DiarioProfessorCreateOperator())
  async diarioProfessorCreate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Spec.DiarioProfessorCreateOperator()) dto: Spec.IDiarioProfessorInputDto,
  ) {
    return this.diarioProfessorService.diarioProfessorCreate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.DiarioProfessorUpdateOperator())
  async diarioProfessorUpdate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Spec.DiarioProfessorUpdateOperator()) dto: Spec.IDiarioProfessorUpdateDto,
  ) {
    return this.diarioProfessorService.diarioProfessorUpdate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.DiarioProfessorDeleteOperator())
  async diarioProfessorDeleteOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Spec.DiarioProfessorDeleteOperator()) dto: Spec.IDiarioProfessorDeleteOneByIdInputDto,
  ) {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(contextoDeAcesso, dto);
  }
}
