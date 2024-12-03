/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function InicioTurma(clientAPI) {
    var dDate = new Date(clientAPI.binding.cust_START_TME) 
    var cRet  = 'Início: ' + dDate.getDate().toString().padStart(2,"0") + "/" + (dDate.getMonth()+1).toString().padStart(2,"0") + "/" + dDate.getFullYear().toString()
    cRet += " às " + dDate.getHours().toString().padStart(2,"0") +":"+ dDate.getMinutes().toString().padStart(2,"0") + "h"
    return(cRet)
}
 