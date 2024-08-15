import { Printer, Image } from "@node-escpos/core"
import Network from "@node-escpos/network-adapter"


let device = new Network("192.168.1.87", 9100)

device.open(async function(err) {

    if(err){
        // handle error
        console.log(`Error: ${err}`)
        return
    }

    const options = { encoding: "utf-8" /* default */ }
	let printer = new Printer(device, options)

    printer
        .font("a")
        .align("ct")
        .size(1, 1)
        .text('--------------- PEDIDO ---------------')

    printer.cut().close()
})