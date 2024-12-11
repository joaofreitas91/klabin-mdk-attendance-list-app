/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function GenerateId(clientAPI) {
    try {
        const entity = await clientAPI.read('/Attendance_List/Services/CAP_SERVICE_SF_LMS.service', 'cust_Turmas', ['externalCode'])
        const onlyExternalCodes = entity
            .map(i => i.externalCode)

        alert(onlyExternalCodes)

        const externalCodes = onlyExternalCodes  
            .filter(i => String(i) != 'NaN')
            .sort((a, b) => a - b);

        const onlyExternalCode = externalCodes.find((_, index) => index == (externalCodes.length - 1))
        
        return String(onlyExternalCode + 1)
        
    } catch (error) {
        alert(error)
    }
    
}
