/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function GetReprovedValue(clientAPI) {
    var ficha = clientAPI.binding.externalCode

    var query = `$filter=externalCode eq '${ficha}'`

    const presenceList = await clientAPI.read("/Attendance_List/Services/CAP_SERVICE_SF_LMS.service", "cust_ListadePresenca", ["cust_resultado"], query)

    const presenceListItem = presenceList.find(i => i.cust_resultado)

    if(presenceListItem.cust_resultado){
        return presenceListItem.cust_resultado == "reprovado" ? true : false
    }
    return false
}