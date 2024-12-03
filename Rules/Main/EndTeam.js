/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function fimTurma(clientAPI) {
    var dDate = new Date(clientAPI.binding.cust_END_TME)
    var cRet = "Término: " + dDate.getDate().toString().padStart(2, "0") + "/" + (dDate.getMonth() + 1).toString().padStart(2, "0") + "/" + dDate.getFullYear().toString()
    cRet += " às " + dDate.getHours().toString().padStart(2,"0") +":"+ dDate.getMinutes().toString().padStart(2,"0") + "h"
   return(cRet)
}