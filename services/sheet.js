import 'dotenv/config'

import { JWT } from 'google-auth-library'
import { GoogleSpreadsheet } from 'google-spreadsheet'

const initSheet = async () => {

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

    const doc = new GoogleSpreadsheet(config.sheet_id, serviceAccountAuth)
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]

    return sheet
}

const getOrders = async () => {

    const sheet = await initSheet()
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
            "obs": rows[i].get('ObservacaoPedido'),
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

const getOrdersHeader = async() => {
    const sheet = await initSheet()
    const rows = await sheet.getRows()

    const header = sheet.headerValues

    let arr = []
    arr.push(replaceHeader(header))
    for (let i=0;i<rows.length;i++){
        arr.push(rows[i]._rawData)
        await rows[i].delete()
    }

    const arrAjusteds = adjustHeaders(arr)
    return arrAjusteds
}

const replaceHeader = (header) =>{

    let headerReplaced = []

    for(let i=0; i<header.length;i++) {
        headerReplaced.push(header[i].replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, ''))
    }

    return headerReplaced
}

const adjustHeaders = (array) => {
    const headers = array.shift()
    const returnArray = []
    array.forEach((value, index) => {
      const returnObject = {}
      value.forEach((column, index) => {
        returnObject[headers[index]] = column
      })
      returnArray.push(returnObject)
    })
    return returnArray
}

export { getOrders, getOrdersHeader }