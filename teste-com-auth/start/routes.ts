/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.get('/', async () => {
  return { hello: 'world' }
})



Route.post('/login', 'AuthController.login')//
Route.post('/logout', 'AuthController.logout')//


Route.post('/user', 'UsersController.store')//
Route.put('/user/:id', 'UsersController.update')//
Route.delete('/user/:id', 'UsersController.destroy')//
Route.get('/user/:id', 'UsersController.show')//
Route.get('/users', 'UsersController.index')//


Route.get('/mostrarSalas', 'UsersController.mostrarSalas').middleware('auth')//mostrar salas aluno
Route.get('/listaralunos/:numerosala', 'AlunoSalasController.listarAlunos')// listar alunos de uma determinada sala






Route.group(()=> {
  Route.get('salas', 'SalasController.index')//
  Route.get('salas/:numerosala', 'SalasController.show')//
  Route.post('salas/', 'SalasController.store')//
  Route.put('salas/:numerosala', 'SalasController.update')//
  Route.delete('salas/:numerosala', 'SalasController.destroy')//

}).middleware('auth')


Route.group(()=> {
Route.get('tabelaincrivel/:user_id', 'AlunoSalasController.show')//
Route.post('tabelaincrivel/', 'AlunoSalasController.store')//
Route.delete('tabelaincrivel/:numerosala', 'AlunoSalasController.destroy')//
}).middleware('auth')





