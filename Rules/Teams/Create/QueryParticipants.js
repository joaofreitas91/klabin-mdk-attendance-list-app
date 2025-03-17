/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function QueryParticipants(clientAPI) {
    const IASUser = clientAPI.evaluateTargetPath("#Application/#AppData/UserId");
    // const IASUser = "ABILIK"
    const query = `$filter=externalCode eq '${IASUser}' or cust_RELATED_USER eq '${IASUser}'`;
    const response = await clientAPI.read(
        "/Attendance_List/Services/CAP_SERVICE_SF_LMS.service",
        "cust_Instrutores",
        ["externalCode", "cust_RELATED_USER"],
        query
    );
    const ExtCode = response.find(i => i.externalCode)?.externalCode || '';
    const SFUser = response.find(i => i.cust_RELATED_USER)?.cust_RELATED_USER || '';

    const search = clientAPI.searchString || ''


    const capitalizeSearch = search.split(" ").filter(w => w).map(word => {
        const exceptions = ["de", "da", "das", "do", "dos"]
        const wordToLoweCase = word.toLowerCase()

        if (exceptions.includes(wordToLoweCase)) {
            return wordToLoweCase
        }

        const capitalize = wordToLoweCase[0].toUpperCase() + wordToLoweCase.slice(1)

        return capitalize
    }).join(' ')

    let cFilter = `$filter=externalCode ne '${ExtCode}' and cust_matricula ne '${ExtCode}' and externalCode ne '${SFUser}' and cust_matricula ne '${SFUser}'&$search='${capitalizeSearch}'`
    return cFilter
}
