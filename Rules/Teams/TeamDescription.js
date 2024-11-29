/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function TeamDescription(clientAPI) {
    var dDate = new Date(clientAPI.binding.cust_START_TME) 
    var cRet  = 'Início: ' + dDate.getDate().toString().padStart(2,"0") + "/" + (dDate.getMonth()+1).toString().padStart(2,"0") + "/" + dDate.getFullYear().toString()
    cRet += " às " + dDate.getHours().toString().padStart(2,"0") +":"+ dDate.getMinutes().toString().padStart(2,"0") + "h"
    
    cRet += "\n"

    dDate = new Date(clientAPI.binding.cust_END_TME) 
    cRet += 'Fim: ' + dDate.getDate().toString().padStart(2,"0") + "/" + (dDate.getMonth()+1).toString().padStart(2,"0") + "/" + dDate.getFullYear().toString()
    cRet += " às " + dDate.getHours().toString().padStart(2,"0") +":"+ dDate.getMinutes().toString().padStart(2,"0") + "h"

    cRet += "\n"
    
    cRet += "ID da Turma: " + clientAPI.binding.externalCode.toString()
    return(cRet)
}
 