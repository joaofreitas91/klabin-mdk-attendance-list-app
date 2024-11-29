/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function TeamDuration(clientAPI) {
    var cHoras = clientAPI.binding.cust_SSG_SEG_NUM.toString()
    var cRet = cHoras
    if (Number(cHoras) > 1){
        cRet += ' Horas'
    }else{
        cRet += ' Hora'
    }
    return(cRet)
}
