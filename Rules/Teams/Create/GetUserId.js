/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function getUserId(clientAPI) {
    let userId= clientAPI.evaluateTargetPath('#Application/#ClientData/UserId');
    alert(userId);

}