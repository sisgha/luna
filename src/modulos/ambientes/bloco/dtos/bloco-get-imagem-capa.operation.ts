import { ValidationContractUuid, createDtoOperationGetFileOptions } from '../../../../infraestrutura';

// ======================================================

export const BLOCO_GET_IMAGEM_CAPA = createDtoOperationGetFileOptions({
  description: 'Obtêm a imagem de capa do bloco.',

  meta: {
    getFile: {
      mimeType: 'image/jpeg',
    },
  },

  swagger: {
    params: [
      {
        name: 'id',
        description: 'ID do bloco.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
