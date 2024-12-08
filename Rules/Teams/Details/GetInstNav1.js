/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function GetInstNav1(clientAPI) {
    const query = `$filter=externalCode eq '${clientAPI.binding.cust_INST_ID1}'`
    const entity = await clientAPI.read("/Attendance_List/Services/CAP_SERVICE_SF_LMS.service", "cust_Instrutores", ["cust_fname", "cust_lname"], query)
    const item = entity.find(i => Boolean(i.cust_fname) && Boolean(i.cust_lname))
    const label = `${item.cust_fname} ${item.cust_lname}`

    return item ? label : '-' 
}
