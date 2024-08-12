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
            "num": rows[i].get('N. pedido'),
            "name": rows[i].get('Nome'),
            "phone": rows[i].get('Telefone'),
            "itens": rows[i].get('Lista de Pedido'),
            "value": rows[i].get('Valor')
         })
        
         await rows[i].delete()

    }

    return orders

}

