import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Sala from "App/Models/Sala"
import User from "App/Models/User"


export default class SalasController {



    public async store({ request, auth, params, response }: HttpContextContract) {
        const data = request.only(['numerosala', 'capacidade', 'disponibilidade']);

        //const user = await User.findOrFail(params.idusuario)

        const user = auth.user   //não funciona de maneira alguma
        //edit: consegui fazer funcionar!

        if (!user || user?.tipo !== 'professor') {
            return response.status(403).send({ message: "Apenas professores podem fazer sala" });
        }

        let obj = {
            numerosala: data.numerosala,
            capacidade: data.capacidade,
            disponibilidade: data.disponibilidade,
            user_id: user.id,
        };

        const sala = await Sala.create(obj);
        return sala;
    }



    public async update({ params, request, auth, response }: HttpContextContract) {

        const data = request.only(['numerosala', 'capacidade', 'disponibilidade'])
        const user = auth.user
        //  console.log(user);
        // const user = await User.findOrFail(params.idusuario)

        if (user?.tipo !== 'professor') {
            return response.status(403).send({ message: "só professor pode alterar sala" })
        }

        const sala = await Sala.find(params.numerosala)

        if (!sala) {
            return response.status(404).send({ message: `sala ${params.numerosala} nao encontrada` })
        }


        let obj = {
            numerosala: data.numerosala,
            capacidade: data.capacidade,
            disponibilidade: data.disponibilidade,
            user_id: params.idusuario
        }

        sala.user_id = params.idusuario
        sala.merge(obj)
        await sala.save()
        return sala
    }

    public async destroy({ params, auth, response }: HttpContextContract) {
        const user = auth.user

        if (user?.tipo !== 'professor') {
            return response.status(403).send({ message: "Não permitido!" })
        }

        const sala = await Sala.query()
            .where('numerosala', params.numerosala)
            .firstOrFail()

        if (!sala) {
            return response.status(404).send({ message: `Sala ${params.numerosala} não encontrada` })
        }

        await sala.delete()

        return response.status(200).send({ message: `Sala ${params.numerosala} excluída` })
    }


    public async index() {
        const salas = await Sala.all()
        return salas
    }

    public async show({ params, auth, response }: HttpContextContract) {
        const user = auth.user;
      
        if (user?.tipo !== 'professor') {
          return response.status(403).send({
            message: "Apenas para professores"
          });
        }
      
        const sala = await Sala.query().where('numerosala', params.numerosala).firstOrFail();
      
        if (!sala) {
          return response.status(404).send({
            message: "Sala não encontrada"
          });
        }
      
        return response.status(200).send({
          sala
        });
      }
      
}
