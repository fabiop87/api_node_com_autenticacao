import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

    public async login({ request, auth, response }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')
        const token = await auth.use('api').attempt(email, password,{
            expiresIn: '7 days'
          })
        const user = auth.user
        return response.status(200).send({ message: "login realizado com sucesso", token, tipo: user?.tipo })
    }

    public async logout({ auth, response }: HttpContextContract) {
        await auth.use('api').revoke()
        return response.status(200).send({ message: "logout realizado com sucesso" })
    }
}
