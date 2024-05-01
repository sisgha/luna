import * as yup from 'yup';
import { createValidationContract, getSchemaField } from '../../../../infraestrutura';
import { AmbienteDtoValidationContract } from './ambiente.dto';

// ======================================================

export const AmbienteInputDtoValidationContract = createValidationContract(() => {
  const schema = AmbienteDtoValidationContract();

  return yup.object().shape({
    nome: getSchemaField(schema, 'nome'),
    descricao: getSchemaField(schema, 'descricao'),
    codigo: getSchemaField(schema, 'codigo'),
    capacidade: getSchemaField(schema, 'capacidade'),
    tipo: getSchemaField(schema, 'tipo'),
  });
});
