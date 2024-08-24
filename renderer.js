require('dotenv/config')
const { ipcRenderer } = require('electron')


const txtLog =  document.getElementById('txt-log')
const time = process.env.TIME * 1000
const btnSalvar = document.getElementById('btn-salvar')


ipcRenderer.on('return-txt-log', (event, arg) => {
    addLog(arg)
})

const addLog = (msg) => {
    const time = new Date().toLocaleString()
    txtLog.innerHTML = `${time} ${msg}\n${txtLog.innerHTML}`
}

setInterval(() => {
    ipcRenderer.send('get-orders')
}, time)

// btnSalvar.addEventListener('click', () => {
//     const selectImpressora = document.getElementById('tipo-impressora');
//     tipoImpressora = selectImpressora.options[selectImpressora.selectedIndex].value;
//     console.log(tipoImpressora)
// })