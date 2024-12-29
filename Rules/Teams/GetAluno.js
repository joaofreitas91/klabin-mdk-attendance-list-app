/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function GetAluno(clientAPI) {
    const query = `$filter=externalCode eq '${clientAPI.binding.cust_Aluno}'`
    const value = await clientAPI.read("/Attendance_List/Services/CAP_SERVICE_SF_LMS.service", "cust_Alunos", ["externalName"], query)
    const externalName = value.find(i => i.externalName)
    return externalName.externalName
}
