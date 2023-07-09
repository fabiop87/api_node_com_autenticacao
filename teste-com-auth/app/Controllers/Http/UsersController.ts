import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AlunoSala from 'App/Models/AlunoSala'
import Sala from 'App/Models/Sala'
import User from 'App/Models/User'

export default class UsersController {

    public async store({ request }: HttpContextContract) {
        const data = request.only(['nome', 'email', 'password', 'matricula', 'aniversario', 'tipo'])
        const user = await User.create(data)
        return user
    }

    public async update({ params, request, response }: HttpContextContract) {
        const user = await User.find(params.id)
        if (!user) {
            return response.status(404).send('usuario nao encontrado')
        }

        const data = request.only(['name', 'email', 'password', 'matricula', 'aniversario', 'tipo'])
        user.merge(data)
        await user.save()
        return user
    }

    public async destroy({ params, response }: HttpContextContract) {
        const user = await User.findOrFail(params.id)
          
        if (!user) {
          return response.status(404).send('usuario nao encontrado')
        }
    
        await user.delete()
        return response.status(200).send('usuario deletado')
      }

      public async show({ params, response }: HttpContextContract) {
        const user = await User.find(params.id)
        if (!user) {
          return response.status(404).send('usuario nao encontrado')
        }
        return user
      }

      public async index() {
        const users = await User.all()
        return users
      }


      public async mostrarSalas({ auth, response }: HttpContextContract) {
    
        const user = auth.user
        if (!user || user.tipo !== 'aluno') {
          return response.status(404).send('nao vai dar, deu ruim')
        }
    
        const tabelaincrivel = await AlunoSala.findByOrFail("user_id", user.id)
        console.log(tabelaincrivel);
        
        const sala = await Sala.findByOrFail("id", tabelaincrivel.sala_id)
    
        const professor = await User.findByOrFail("id", sala.user_id)
    
    
        
        let obj = {
          nome: user.nome,
          professor: professor.nome,
          sala: tabelaincrivel.sala_id
        }
    
        return response.status(200).send({ obj })
      }



}
