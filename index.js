import 'dotenv/config'
import { inicializePrint, print }  from './services/print.js'
import { getOrders } from './services/sheet.js'

let orders
const time = process.env.TIME * 1000


if (inicializePrint() !== undefined) {
    
    orders = await getOrders()
    console.log(orders)
    print(orders)

    setInterval(function start () {
        console.log('world');
        return start;
    }(), 5000) 

}

