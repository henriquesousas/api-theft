
> ## Casos de sucesso

1. ✅  Recebe uma requisição do tipo **POST** na rota **/api/occurrence**
2. ✅  Valida dados obrigatórios **userId**, **title**, **description**, **product**, **dateOccurrence**
3. 🔲  Valida dados obrigatórios de endereço **neighborhood**, **city**, **state**, **zipCode**
4. ✅  **Valida** se existe um usuário que irá cadastrar a ocorrência
5. 🔲  **Valida** se o enum do produto cadastrado existe
6. ✅  Retorna **200** se criar uma ocorrência com sucesso

---

> ## Exceções

1. 🔲 Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se userId, title, description, product, dateOccurrence não forem fornecidos pelo client
3. 🔲 Retorna erro **400** se neighborhood, city, state, product, zipCode não forem fornecidos pelo client
4. 🔲 Retorna erro **401** se der erro ao tentar criar uma occorrência com usuário inexistente
5. 🔲 Retorna erro **401** se der erro ao tentar criar uma occorrência sem um produto existente
6. 🔲 Retorna erro **500** se der erro ao tentar criar uma occorrência
