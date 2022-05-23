# UpdateOccurrence

> ## Casos de sucesso
1. 🔲  Recebe uma requisição do tipo **PUT** na rota **/api/occurrence**
2. 🔲  Valida dados obrigatórios **userId**, **title**, **description**, **product**
3. 🔲  Valida dados obrigatórios de endereço **neighborhood**, **city**, **state**, **zipCode**
3. 🔲  Deve ter um campo indicando a data da atualização **updateAt**,
4. 🔲  **Valida** se existe um usuário que irá alterar a ocorrência
5. 🔲  **Valida** se o enum do produto alterado existe
6. 🔲  Retorna **200** se alterar a ocorrência com sucesso

---

> ## Exceções
2. 🔲 Retorna erro **400** se userId, title, description, product não forem fornecidos pelo client
3. 🔲 Retorna erro **400** se neighborhood, city, state, product, zipCode não forem fornecidos pelo client
4. 🔲 Retorna erro **401** se der erro ao tentar alterar uma occorrência com usuário inexistente
5. 🔲 Retorna erro **401** se der erro ao tentar alterar uma occorrência sem um produto existente
5. 🔲 Retorna erro **401** se o token de acesso for inválido ou não informado
1. 🔲 Retorna erro **404** se a API não existir
6. 🔲 Retorna erro **500** se der erro ao tentar alterar uma occorrência
