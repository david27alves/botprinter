import { app, BrowserWindow, Tray, Menu, dialog } from 'electron'

let win, win2

const createWindow = () => {
    
    const secondInstance = app.requestSingleInstanceLock()

    win = new BrowserWindow({
        width: 500,
        height: 600,
        maximizable: false,
        resizable: false,
        //icon: "./static/icon.png",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })
    
    //win.webContents.openDevTools()
    win.loadFile('./views/index.html')
    win.setMenu(null)
    
    if (!secondInstance) {
        const options = {
            type: 'info',
            buttons: ['Ok'],
            defaultId: 2,
            title: 'Informação',
            message: 'O aplicativo já está em execução!'
        }
        
        win.hide()
        dialog.showMessageBox(win, options).then((result) => {
            console.log(result.response)
            app.quit()
        })

        setTimeout(() => {
            app.quit()
        }, 10000)   
    }

    // win.on('minimize', (event) => {
    //     win.hide()
    // }) 

    const tray = new Tray('./static/icon.png')
    tray.setToolTip('BOTPrinter run!')
    const menuTray = [
        {
            label: 'Restaurar', 
            click: () => {
                win.show()
            }
        }, 
        {
            label: 'Sair',
            click: () => {
                app.quit()
            }
        }
    ]
    tray.setContextMenu(Menu.buildFromTemplate(menuTray))
}

const openConfigPrintWindow = () => {

    const printWindow = new BrowserWindow({ 
        parent: win,
        width: 500,
        height: 600,
        //icon: "./static/icon.png"
    })
    
    printWindow.loadFile('./views/configprint.html')
    printWindow.show()
    printWindow.removeMenu()
}

const template = [
    {
        label: 'Configurações',
        submenu: [
            {
                label: 'Impressora',
                click: () => {
                    openConfigPrintWindow()
                }
            },
            {
                label: 'Database',
                click: () => {
                    console.log('Clicou no banco de dados!')
                }
            }
        ]
    }
]

const menuApp = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menuApp)

export { createWindow }