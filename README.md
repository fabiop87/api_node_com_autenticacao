# API salas/alunos
- Melhoria da API feita em adonisjs, agora com autenticação funcionando direitinho

<p> Anteriormente o pacote auth do adonisjs não instalava e tinha tentado fazer a autenticação manualmente e acabou ficando meio ruim </p>

<p> Agora está melhorado e funcionando como deveria, com os tokens oat bearer e adicionando o middleware direitinho :rocket: </p>

<p> Anotação para futuros provaveis problemas que demoraram 5 horas para resolver:</p>
1. adicionar a linha ->  `auth: 'App/Middleware/Auth',` no /start/kernel.ts dentro do método registerNamed:  Server.middleware.registerNamed({ auth: 'App/Middleware/Auth',  })
