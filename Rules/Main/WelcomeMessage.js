/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

export default function WelcomeMessage(context) {
    var dToday = new Date()
    var cRet   = ''

    if (dToday.getHours() >= 12 && dToday.getHours() < 18 ){
        cRet = "Boa tarde, "
    }else if(dToday.getHours() >= 18 && dToday.getHours() < 24 ){
        cRet = "Boa noite, "
    }else{
        cRet = "Bom dia, "
    }
        
    cRet += context.evaluateTargetPath("#Application/#AppData/UserId");
    return (cRet);
}