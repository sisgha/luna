#!/usr/bin/env bash

set -xe;

if [[ "${CI_CD_CODEGEN_OPENAPI}" == "true" ]]; then
  (cd ./openapi-json; ./scripts/codegen.sh);
fi

if [[ "${CI_CD_CODEGEN_NPM_API_CLIENT_FETCH}" == "true" ]]; then
  (cd ./npm/api-client-fetch; ./scripts/codegen.sh;)
fi
