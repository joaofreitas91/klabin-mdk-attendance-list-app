/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function GetAlunoFirstName(clientAPI) {
    const query = `$filter=externalCode eq '${clientAPI.binding.cust_Aluno}'`
    const response = await clientAPI.read("/Attendance_List/Services/CAP_SERVICE_SF_LMS.service", "cust_Alunos", ["cust_fname"], query)
    const partner = response.find(i => i.cust_fname)
    return `${partner.cust_fname}`

}
