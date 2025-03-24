/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function QueryParticipantsAddition(clientAPI) {
    const queryInst1 = `$filter=externalCode eq '${clientAPI.binding.cust_INST_ID1}' or cust_RELATED_USER eq '${clientAPI.binding.cust_INST_ID1}'`;
    const responseInst1 = await clientAPI.read(
        "/Attendance_List/Services/CAP_SERVICE_SF_LMS.service",
        "cust_Instrutores",
        ["externalCode", "cust_RELATED_USER"],
        queryInst1
    );
    const ExtCodeInst1 = responseInst1.find(i => i.externalCode)?.externalCode || '';
    const SFUserInst1 = responseInst1.find(i => i.cust_RELATED_USER)?.cust_RELATED_USER || '';

    let filterInst1 = `cust_matricula ne '${ExtCodeInst1}' and externalCode ne '${ExtCodeInst1}' and cust_matricula ne '${SFUserInst1}' and externalCode ne '${SFUserInst1}'`

    const queryInst2 = `$filter=externalCode eq '${clientAPI.binding.cust_INST_ID2}' or cust_RELATED_USER eq '${clientAPI.binding.cust_INST_ID2}'`;
    const responseInst2 = await clientAPI.read(
        "/Attendance_List/Services/CAP_SERVICE_SF_LMS.service",
        "cust_Instrutores",
        ["externalCode", "cust_RELATED_USER"],
        queryInst2
    );
    const ExtCodeInst2 = responseInst2.find(i => i.externalCode)?.externalCode || '';
    const SFUserInst2 = responseInst2.find(i => i.cust_RELATED_USER)?.cust_RELATED_USER || '';

    let filterInst2 = `cust_matricula ne '${ExtCodeInst2}' and externalCode ne '${ExtCodeInst2}' and cust_matricula ne '${SFUserInst2}' and externalCode ne '${SFUserInst2}'`

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

    let cFilter = `$filter=${filterInst1} and ${filterInst2} and cust_fname ne null and cust_NOTACTIVE eq 'N'&$orderby=cust_fname&$search='${capitalizeSearch}'`

    return cFilter
}
