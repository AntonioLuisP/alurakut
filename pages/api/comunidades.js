import { SiteClient } from 'datocms-client'

export default async function recebedorRequests(request, response) {

    if (request.method === 'POST') {
        const TOKEN = 'ca727a6fdface77b1ca2780b1442e4'

        const cliente = new SiteClient(TOKEN)

        const registroCriado = await cliente.items.create({
            itemType: '975366',
            ...request.body
        })

        response.json({
            dados: 'algum dado qualquer',
            registroCriado
        })
        return;
    }

    response.status(404).json({
        dados: 'Estás perdido amigo',
    })
}