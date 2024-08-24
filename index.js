import 'dotenv/config'
import { app, dialog, ipcMain, Menu } from 'electron'
import { print }  from './services/print.js'
import { getOrders } from './services/sheet.js'
import { createWindow } from './window.js'

console.log('BOTPrinter run!')

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('segunda', (event, arg) => {
    console.log("Segunda instancia detectada")
})

ipcMain.on('get-orders', async(event, arg) => {
    const orders = await getOrders()
    
    if (orders.length >= 1) {
        let numOrdersPrint = []
        for(let i=0; i<orders.length;i++) {
            numOrdersPrint.push(orders[i].num)
        }
        event.sender.send('return-txt-log', `Imprimindo pedido${numOrdersPrint.length>1 ? 's' : ''} ${numOrdersPrint}`)
        print(orders)
    } else {
        event.sender.send('return-txt-log', 'Nenhum pedido para impressão!')
    }

})