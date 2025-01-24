/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function CloseTeam(clientAPI) {
    try {
        const custAlunosQuery = `$filter=cust_Turma eq '${clientAPI.binding.externalCode}'`
        const custAlunos = await clientAPI.read('/Attendance_List/Services/CAP_SERVICE_SF_LMS.service', 'cust_ListadePresenca', ['cust_Aluno'], custAlunosQuery)
        const alunosList = custAlunos.map(i => i.cust_Aluno)

        const endDate = new Date(clientAPI.binding.cust_END_TME)
        const currentDate = new Date()

        if (endDate.getTime() >= currentDate.getTime()) {
            return await clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Erro ao encerrar turma",
                    "Message": "Essa turma ainda tem dias de treinamento pendentes!",
                },
            });
        }

        if (!alunosList.length) {
            return await clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Erro ao encerrar turma",
                    "Message": "Turmas sem participantes não podem ser encerradas!",
                },
            });
        }
        // fim validacoes
        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/Teams/CloseTeam.action",
            "Properties": {
                "Properties": {
                    "cust_LMS": "S"
                }
            }
        })
        
        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Encerramento de turma",
                "Message": "Turma encerrada com sucesso!",
                "OnOK": "/Attendance_List/Actions/Teams/NavToMain.action"
            },
        });

    }catch(e){
        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Criação de turma",
                "Message": `Erro: ${e.message}`
            }
        });
    }
}
