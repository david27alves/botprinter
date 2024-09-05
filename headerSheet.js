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

const doc = new GoogleSpreadsheet(config.sheet_id, serviceAccountAuth)
await doc.loadInfo()
const sheet = doc.sheetsByIndex[0]
const rows = await sheet.getRows()

const header = sheet.headerValues

const replaceHeader = (header) =>{

    let headerReplaced = []

    for(let i=0; i<header.length;i++) {
        headerReplaced.push(header[i].replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, ''))
    }

    return headerReplaced
}

const adjustValues = (array) => {
    const indexes = array.shift()
    const returnArray = []
    array.forEach((value, index) => {
      const returnObject = {}
      value.forEach((column, index) => {
        returnObject[indexes[index]] = column
      })
      returnArray.push(returnObject)
    })
    return returnArray
}

let arr = []
arr.push(replaceHeader(header))
for (let i=0;i<rows.length;i++){
    arr.push(rows[i]._rawData)
}

//console.log(arr)

console.log(adjustValues(arr))