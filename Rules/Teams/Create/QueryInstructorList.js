/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function QueryInstructorList(clientAPI) {
    let userId= clientAPI.evaluateTargetPath('#Application/#ClientData/UserId');

    return `$filter=cust_RELATED_USER ne '${userId}' and cust_fname ne null and cust_notactive eq 'N'&$orderby=cust_fname `
}
