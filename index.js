import 'dotenv/config'
import { inicializePrint, print }  from './services/print.js'
import { getOrders } from './services/sheet.js'

let orders
const time = process.env.TIME * 1000

if (inicializePrint() !== undefined) {
    
    console.log('BOTPrinter run!')
    
    setInterval(async () => {
        orders = await getOrders()
        console.log(orders)
        print(orders)
    }, time) 

}

// if (true) {
    
//     setInterval(async () => {

//         orders = await getOrders()
//         console.log(orders)
        
//     }, time) 
    
// }
