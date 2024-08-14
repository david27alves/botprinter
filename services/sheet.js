import 'dotenv/config'

import { JWT } from 'google-auth-library'
import { GoogleSpreadsheet } from 'google-spreadsheet'

const config = {
    "sheet_id": process.env.SHEET_ID,
    "email": process.env.EMAIL,
    "secret_key": process.env.SECRET_KEY,
    "time": process.env.TIME
}

const serviceAccountAuth = new JWT({
    email: config.email,
    key: config.secret_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
})

export const getOrders = async () => {

    const doc = new GoogleSpreadsheet(config.sheet_id, serviceAccountAuth)

    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[0]
    const rows = await sheet.getRows()

    let orders = []

    

    for(let i=0;i<rows.length;i++){

        orders.push({
            "phone": rows[i].get('Telefone'),
            "date": rows[i].get('Data'),
            "name": rows[i].get('Nome'),
            "num": rows[i].get('N. pedido'),
            "itens": rows[i].get('Lista de Pedido'),
            "itensComp": rows[i].get('Lista de Pedido 1/2'),
            "obs": rows[i].get('Lista de Pedido 1/2'),
            "value": rows[i].get('Valor'),
            "valueShipping": rows[i].get('ValorFrete'),
            "distance": rows[i].get('DistanciaKM'),
            "compr": rows[i].get('ComprovantePgto'),
            "address": rows[i].get('Endereco'),
            "addressComp": rows[i].get('Complemento'),
            "addressRef": rows[i].get('PontoReferencia'),
            "addressNeigh": rows[i].get('Bairro'),
            "addressCity": rows[i].get('Cidade')
         })
        
         await rows[i].delete()

    }

    return orders

}

