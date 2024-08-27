import 'dotenv/config'
import { Printer } from "@node-escpos/core"
import USB from "@node-escpos/usb-adapter"
import Serial from "@node-escpos/serialport-adapter"
import Network from "@node-escpos/network-adapter"
import { getOrderTemplate } from './template.js'

const initPrint = () => {
	let device 
	const portPrinter = process.env.PRINTER_PORT
	const typePrinter = Number(process.env.PRINTER_TYPE)

	switch(typePrinter){
		case 1:
			device = new USB()
			break
		case 2:
			device = new Serial(portPrinter, { baudRate: 115200, stopBit: 1 })
			break
		case 3:
			device = new Network(process.env.PRINTER_IP, 9100)
			break
		default:
			console.log("Impressora inválida!")
	}

	return device
}

const printFromTemplate = (orders) => {
	
	const device = initPrint()
	device.open(async (err) => {

		if(err){
			console.log(`Error: ${err}`)
			return
		}

		const options = { encoding: "utf-8" /* default */ }
		let printer = new Printer(device, options)
	
		for(let i=0;i<orders.length;i++) {
			printer
				.font("a")
				.align("ct")
				.size(1, 1)
				.text(getOrderTemplate(orders[i]))
		}
	})

}

const print = (orders) => {

	const device = initPrint()
	device.open(async (err) => {
		
		if(err){
			console.log(`Error: ${err}`)
			return
		}
		
		const options = { encoding: "utf-8" /* default */ }
		let printer = new Printer(device, options)
		
		const regexEmoji = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
		
		for(let i=0;i<orders.length;i++) {
			
			let valueOrder = (Number(orders[i].value) + Number(orders[i].valueShipping)).toFixed(2)
			
			printer
			.font("a")
			.align("ct")
			.size(1, 1)
			.text('----------- PEDIDO CHATBOT ------------')
			
			printer
			.font("b")
			.size(1, 1)
			.align("lt")
			.style("normal")
			.text(`CLIENTE: ${orders[i].name}`)
			.text(`Nº DO PEDIDO: ${orders[i].num}`)
			.text(`DATA: ${orders[i].date}`)
			.text(`FORMA DE PAGAMENTO: ${"PIX"}`)
			.text(` `)
			.text(`PEDIDO: ${orders[i].itens.replace(regexEmoji, '')}`)
			.text(`${orders[i].itensComp.replace(regexEmoji, '')}`)
			.text(`VALOR DO PEDIDO: R$ ${orders[i].value}`)
			.text(`TAXA DE ENTREGA: R$ ${orders[i].valueShipping}`)
			.text(`VALOR TOTAL: R$ ${valueOrder}`)
			.text(`OBSERVACAO: ${orders[i].obs}`)
			.text(` `)
			.text('-------------- ENTREGA --------------')
			.text(`NOME DO CLIENTE: ${orders[i].name}`)
			.text(`ENDERECO: ${orders[i].address}`)
			.text(`COMPLEMENTO: ${orders[i].addressComp}`)
			.text(`PONTO DE REFERENCIA: ${orders[i].addressRef}`)
			.text(`BAIRRO: ${orders[i].addressNeigh}`)
			.text(`CIDADE: ${orders[i].addressCity}`)
			.text(`DISTANCIA: ${orders[i].distance}`)
			.text('-------------- FIM --------------')
			.text(` `)		
			
			printer
			.cut()
			
		}
		
		printer
		.close()
		
	})
}

export { print, printFromTemplate }