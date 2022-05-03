> ## Casos de sucesso

1. :black_square_button: Recebe uma requisição do tipo **POST** na rota **/api/signup**
2. :black_square_button: Valida dados obrigatórios **name**, **email**, **password**
3. :black_square_button: Valida que o campo **email** é um e-mail válido
4. :black_square_button: **Valida** se já existe um usuário com o email fornecido
5. :black_square_button: Gera uma senha **criptografada** (essa senha não pode ser descriptografada)
6. :black_square_button: **Cria** uma conta para o usuário com os dados informados, **substituindo** a senha pela senha criptorafada
7. :black_square_button: Gera um **token** de acesso a partir do ID do usuário
8. :black_square_button: **Atualiza** os dados do usuário com o token de acesso gerado
9. :black_square_button: Retorna **200** com o token de acesso e o nome do usuário

---

> ## Exceções

1. :black_square_button: Retorna erro **404** se a API não existir
2. :black_square_button: Retorna erro **400** se name, email, password não forem fornecidos pelo client
3. :black_square_button: Retorna erro **400** se o campo email for um e-mail inválido
4. :black_square_button: Retorna erro **403** se o email fornecido já estiver em uso
5. :black_square_button: Retorna erro **500** se der erro ao tentar gerar uma senha criptografada
6. :black_square_button: Retorna erro **500** se der erro ao tentar criar a conta do usuário
7. :black_square_button: Retorna erro **500** se der erro ao tentar gerar o token de acesso
8. :black_square_button: Retorna erro **500** se der erro ao tentar atualizar o usuário com o token de acesso gerados
