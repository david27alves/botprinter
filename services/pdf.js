import PDFDocument from 'pdfkit'
import fs from 'fs'


async function makePDF(itens) {

     const docPDF = new PDFDocument(
         {
             size: [250,500],
             margins : { // by default, all are 72
                 top: 10,
                bottom:10,
                 left: 10,
               right: 10
             }
         }
     )

     docPDF.pipe(fs.createWriteStream(`static/comanda.pdf`))

     console.log('Fazendo PDF')
     docPDF
         .font('Courier')
         .text(`COMANDA #${itens.num}`, {
             align: 'center'
         })
         .text(`${itens.nome} - ${itens.telefone}`)
         .text(' ')
         .text(itens.itens)
         .text(' ')
         .text('===============================')
         .text(`TOTAL               R$ ${itens.valor}`)

     docPDF.end()
 }

