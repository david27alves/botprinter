import { Printer, Image } from "@node-escpos/core"
import USB from "@node-escpos/usb-adapter"

//let device, printer

// export const inicializePrint = () => {
	
// 	//console.log("Entrou aqui")
// 	device.open(async function(err){

// 		if(err){
// 		  // handle error
// 		  console.log(`Error: ${err}`)
// 		  return
// 	  }

// 	  const options = { encoding: "GB18030" /* default */ }
// 	  let printer = new Printer(device, options)
  
// 	  return printer
	
// 	})

// }

export const print = (order) => {

	const device = new USB()
	
	device.open(async function(err) {

		if(err){
		  // handle error
		  console.log(`Error: ${err}`)
		  return
	  }

	const options = { encoding: "GB18030" /* default */ }
	let printer = new Printer(device, options)

	const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

	  
	for(let i=0;i<order.length;i++) {

		printer
			.font("a")
			.align("ct")
			.size(1, 1)
			.text('--------------- PEDIDO ---------------')
		
		printer
			.font("a")
			.size(1, 1)
			.align("lt")
			.style("normal")
			.text(`CLIENTE: ${order[i].name}`)
			.text(`NUMERO DO PEDIDO: ${order[i].num}`)
			.text(`DATA: ${order[i].date}`)
			.text(`FORMA DE PAGAMENTO: ${"falta"}`)
			.text(` `)
			.text(`PEDIDO: ${order[i].itens.replace(regex, '')}`)
			.text(`${order[i].itensComp.replace(regex, '')}`)
			.text(`OBSERVACAO: ${order[i].obs.replace(regex, '')}`)
			.text(`VALOR DO PEDIDO: R$ ${order[i].value}`)
			.text(`TAXA DE ENTREGA: R$ ${order[i].valueShipping}`)
			.text(`VALOR TOTAL: R$ ${order[i].value}`)
			.text(` `)
			.text('-------------- ENTREGA --------------')
			.text(`NOME DO CLIENTE: ${order[i].name}`)
			.text(`ENDERECO: ${order[i].address}`)
			.text(`COMPLEMENTO: ${order[i].addressComp}`)
			.text(`PONTO DE REFERENCIA: ${order[i].addressRef}`)
			.text(`BAIRRO: ${order[i].addressNeigh}`)
			.text(`CIDADE: ${order[i].addressCity}`)
			.text(`DISTANCIA: ${order[i].distance}`)
			.text('-------------- FIM --------------')
			.text(` `)		

		printer
			.cut()
	
	}
	
	printer
	    .close()
	
	})
}
