import { Printer, Image } from "@node-escpos/core"
import USB from "@node-escpos/usb-adapter"
import { join } from "path"

//let device, printer

export const inicializePrint = () => {
	
	try {
		const device = new USB()
	} catch (e) {
		console.error("\x1b[31m Falha na comunicação com a impressora! \x1b[0m")
		return
	}
	
	//console.log("Entrou aqui")
	device.open(async function(err){

		if(err){
		  // handle error
		  console.log(`Error: ${err}`)
		  return
	  }
	})

	const options = { encoding: "GB18030" /* default */ }
	let printer = new Printer(device, options)

	return printer

}

export const print = (order) => {
	
	
	const printer = inicializePrint()

	// encoding is optional
	  
	for(let i=0;i<order.length;i++) {

		printer
			.font("a")
			.align("ct")
			.style("bu")
			.size(2, 2)
			.text('PIZZARIA DO MARCELO')
		
			printer
			.text(" ")

		printer
			.font("a")
			.size(1, 1)
			.align("lt")
			.style("normal")
			.text(`COMANDA #${order[i].num}`)

		printer
			.text(" ")

		printer
			.font("a")
			.size(1, 1)
			.align("lt")
			.style("normal")
			.text(`${order[i].name} - ${order[i].phone}`)
		
		printer
			.font("a")
			.size(1, 1)
			.align("lt")
			.style("normal")
			.text(`${order[i].itens}`)

		printer
			.text(" ")
		
		printer
			.font("a")
			.size(1, 1)
			.align("lt")
			.style("normal")
			.text(`================================================`)
		
		printer
			.text(" ")

		printer
			.font("a")
			.size(1, 1)
			.align("lt")
			.style("normal")
			.text(`TOTAL                               R$${order[i].value}`)

		printer
			.text(" ")
		

		printer
			.cut()
	
	}
	
	printer
	    .close()
	
	
}
