/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function GetIntervalo(clientAPI) {
    const interval = clientAPI.binding.cust_intervalo.toString()
    var cRet = interval
    if (Number(interval) > 1){
        cRet += ' Horas'
    }else{
        cRet += ' Hora'
    }
    return(cRet)
}
