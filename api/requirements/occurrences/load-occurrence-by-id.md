# LoadOccurrenceById

> ## Casos de sucesso

1. 🔲  Recebe uma requisição do tipo **GET** na rota **/api/occurrence/{occurrenceId}**
2. 🔲  **Valida** se foi passado no query param o id da ocorrência
3. 🔲  Retorna **200** se encontrar a ocorrência

---

> ## Exceções

1. 🔲 Retorna erro **400** se não encontrar uma ocorrência com o id informado
2. 🔲 Retorna erro **401** se o token não for informado ou inválido
3. 🔲 Retorna erro **404** se a API não existir
4. 🔲 Retorna erro **500** se der erro ao tentar buscar um ocorrência
