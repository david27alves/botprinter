import Mustache from 'mustache'
import fs from 'node:fs'

const getOrderTemplate = async(order) => {

    const file = process.env.PRINTER_TEMPLATE   
    const order_template = fs.readFileSync(file).toString()

    // const view = {
    //     pedido_cliente_nome: order.name,
    //     pedido_numero: order.num,
    //     pedido_data: order.date,
    //     pedido_pagamento: 'PIX',
    //     pedido_itens: order.itens,
    //     pedido_itens_complemento: order.itensComp,
    //     pedido_valor: order.value,
    //     pedido_valor_entrega: order.valueShipping,
    //     pedido_valor_total: (Number(order.value) + Number(order.valueShipping)).toFixed(2),
    //     pedido_observação: order.obs,
    //     pedido_cliente_endereco: order.address,
    //     pedido_endereco_complemento: order.addressComp,
    //     pedido_referencia: order.addressRef,
    //     pedido_bairro: order.addressNeigh,
    //     pedido_cidade: order.addressCity,
    //     pedido_distancia: order.distance
    // }
    
    const view = order

    const output = Mustache.render(order_template, view)
    return output
}

export { getOrderTemplate }