/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

import GenerateId from "./Create/GenerateId/GenerateId"
export default async function SaveCreate(clientAPI) {

    try {
        const teamId = await GenerateId(clientAPI)

        const partners = clientAPI.evaluateTargetPath('#Control:FormCellListPickerParticipants/#Value/')
        const props = partners.map((i, index)=> {
            const props = {
                "externalCode": "909090",
                "cust_Turma": teamId,
                "cust_Aluno": i.ReturnValue,
                "externalName": `Dia ${index + 1}`
            }
            return props
        })

        Promise.all(props.map(prop => {

            return clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/Teams/CreatePresenceList.action",
                "Properties": {
                    "Properties": prop
                }
            })

        })).then(() => {
            clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Criação de turma",
                    "Message": "Turma criada com sucesso!",
                    "OnOK": "/Attendance_List/Actions/Teams/NavToMain.action"
                },
            });
        }).catch((e) => {
            clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Criação de turma",
                    "Message": `Erro: ${e}`
                }
            });
        })

/*         clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/Teams/CreateEntityTeam.action",
            "Properties": {
                "Properties": {
                    "externalCode": "1010101010"
                }
            }
        }).then(() => {
            clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Criação de turma",
                    "Message": "Turma criada com sucesso!",
                    "OnOK": "/Attendance_List/Actions/Teams/NavToMain.action"
                },
            });
        })
            .catch((e) => {
                clientAPI.executeAction({
                    "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                    "Properties": {
                        "Title": "Criação de turma",
                        "Message": `Erro: ${e}`
                    }
                });
            }) */

        /* clientAPI.executeAction("/Attendance_List/Actions/Teams/CreateEntityTeam.action").then(() => {
            clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Criação de turma",
                    "Message": "Turma criada com sucesso!",
                    "OnOK": "/Attendance_List/Actions/Teams/NavToMain.action"
                },
            });
        })
            .catch((e) => {
                clientAPI.executeAction({
                    "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                    "Properties": {
                        "Title": "Criação de turma",
                        "Message": `Erro: ${e}`
                    }
                });
            }) */

    } catch (error) {

        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Criação de turma",
                "Message": `Erro: ${error.message}`
            }
        });
    }

}

