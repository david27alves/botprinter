import { Sequelize } from 'sequelize'
import { getOrders } from './sheet.js'
import { Order } from '../models/Order.js'
import { TemplateOrder } from '../models/TemplateOrder.js'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'botprinter.db'
})

try {
    await sequelize.authenticate()
    console.log('Conectado!')
} catch(err) {
    console.log(err)
}

const createDB = async () => {
    
    // await sequelize.sync()
    // await TemplateOrder.sync()
    await Order.sync()

}

const deleteDB = async () => {
    
    await Order.drop()

}

const insertOrders = async (orders) => {

    for(let i=0;i<orders.length;i++) {
        const order = Order.build(orders[i])
        await order.save()
    }

}

const insertTemplate = async (template) => {
    const tOrder = TemplateOrder.build(template)
    await tOrder.save()
}

const getAllOrders = async() => {
    const orders = await Order.findAll()
    //console.log(orders)
    //return orders
}

const getAllTemplates = async() => {

    const templates = await TemplateOrder.findAll()
    //console.log(JSON.stringify(templates[0].template))
    return JSON.stringify(templates[0].template)
}

// const orders = await getOrders()
// console.log(orders)

// const order = Order.build({ telefone: '88997865766', data: '15-08-2024 11:13', nome: 'David Alves', num_pedido: 189 })

// insertOrders(orders)
// const orders = await Order.findAll({
//     where: {
//         printed: false
//     }
// });
// console.log(users.every(user => user instanceof Order)); // true
// let todosOrders = JSON.stringify(orders, null, 2)
// console.log('All users:', JSON.stringify(users));
// console.log(todosOrders)
// deleteDB()
// createDB()

//getAllTemplates()
