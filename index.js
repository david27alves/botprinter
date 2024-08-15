import 'dotenv/config'
import { print }  from './services/print.js'
import { getOrders } from './services/sheet.js'

let orders
const time = process.env.TIME * 1000

    
console.log('BOTPrinter run!')

setInterval(async () => {
    orders = await getOrders()
    console.log(orders)
    
    if (orders.length >= 1) {
        print(orders)
    }

}, time) 

