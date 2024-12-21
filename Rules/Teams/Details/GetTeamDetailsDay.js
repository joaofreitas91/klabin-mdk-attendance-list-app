/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function GetTeamDetailsDay(clientAPI) {
    const query = `$filter=cust_turma eq '${clientAPI.binding.cust_turma}'&$orderby=cust_startdate`
    const entity = await clientAPI.read("/Attendance_List/Services/CAP_SERVICE_SF_LMS.service", "cust_listadiaria", ["cust_startdate"], query)

    const dayIndex = entity.map(i => i.cust_startdate).indexOf(clientAPI.binding.cust_startdate)

    return `Dia ${dayIndex + 1}`
}
