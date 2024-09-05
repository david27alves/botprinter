import 'dotenv/config'
import { app, ipcMain } from 'electron'
import { print, printFromTemplate }  from './services/print.js'
import { getOrders, getOrdersHeader } from './services/sheet.js'
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
    const orders = await getOrdersHeader()
    
    if (orders.length >= 1) {
        event.sender.send('return-txt-log', `Imprimindo pedidos!`)
        printFromTemplate(orders)
    } else {
        event.sender.send('return-txt-log', 'Nenhum pedido para impressão!')
    }

})