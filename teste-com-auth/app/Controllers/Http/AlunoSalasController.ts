import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import AlunoSala from 'App/Models/AlunoSala'
import Sala from 'App/Models/Sala'
import User from 'App/Models/User'

export default class AlunoSalasController {


    public async listarAlunos({ params, response }) {
        try {
            const sala = await Sala.findByOrFail('numerosala', params.numerosala);

            const alunos = await Database.from('aluno_salas')
                .where('sala_id', sala.id)
                .select('user_id');

            const usuarios = await User.query()
                .whereIn('id', alunos.map((aluno) => aluno.user_id))
                .select('id', 'nome');

            const resultado = {
                sala: params.numerosala,
                usuarios,
            };

            return response.json(resultado);
        } catch (error) {
            return response.status(400).json({ message: 'Não foi possível listar os alunos da sala' });
        }
    }



    public async show({ params, auth, response }: HttpContextContract) {

        const prof = auth.user

        if (prof?.tipo !== 'professor') {
            return response.status(403).send({ message: "usuario sem privilegios" })
        }

        const tabelaincrivel = await AlunoSala.findByOrFail("user_id", params.user_id)

        return response.status(200).send(tabelaincrivel)

    }


    public async store({ request, auth, response }: HttpContextContract) {
        const data = request.only(['user_id', 'numerosala']);

        const sala = await Sala.findByOrFail('numerosala', data.numerosala);
        const prof = auth.user;

        if (prof?.tipo !== 'professor') {
            return response.status(403).send({ message: "Somente professores podem alocar alunos" });
        }

        const alunoSala = await AlunoSala.query()
            .where('user_id', data.user_id)
            .where('sala_id', sala.id)
            .first();

        if (alunoSala) {
            return response.status(409).send({ message: "O aluno já está na sala" });
        }

        const total = await AlunoSala.query().where('sala_id', sala.id).count('* as total')[0];

        if (total == sala.capacidade) {
            return response.status(409).send({ message: 'A sala já está cheia' });
        }

        const obj = {
            sala_id: sala.id,
            user_id: data.user_id,
        };

        await AlunoSala.create(obj);
        return obj;
    }


    public async destroy({ params, auth, response, request }: HttpContextContract) {

        const data = request.only(['user_id'])

        const sala = await Sala.findByOrFail('numerosala', params.numerosala)

        const prof = auth.user

        if (prof?.tipo !== 'professor') {
            return response.status(403).send({ message: "só professor pode" })
        }

        if (sala.user_id !== prof.id && sala.user_id !== null) {
            return response.status(403).send({ message: "sala nao pertece a este professor" })
        }

        const aluno = await User.findByOrFail('id', data.user_id)

        await AlunoSala.query().where('user_id', aluno.id).delete()

        return response.status(200).send({ message: 'aluno excluido da sala' })
    }



}
