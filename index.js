import 'dotenv/config'
import { inicializePrint, print }  from './services/print.js'
import { getOrders } from './services/sheet.js'

let orders

if (inicializePrint() !== undefined) {

    orders = await getOrders()
    console.log(orders)
    print(orders)
    
}





//setInterval(() => Print(orders), 5000)
