/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import Cuid from "../Application/Cuid"

export default async function SaveCreate(clientAPI) {

    try {
        const teamId = Cuid()
        const today = new Date().toISOString().split("T")[0].split("-").join("")
        const partners = clientAPI.evaluateTargetPath('#Control:FormCellListPickerParticipants/#Value/')

        const props = partners.map((i, index) => {
            const externalCode = `909090${index}`
            const props = {
                "externalCode": externalCode,
                "cust_Turma": "303030",
                "cust_Aluno": i.ReturnValue,
                "externalName": `Dia ${index + 1}`
            }
            return props
        })

        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/Teams/CreateEntityTeam.action",
            "Properties": {
                "Properties": {
                    "externalCode": "303030"
                }
            }
        })

        await Promise.all(props.map(prop => {

            return clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/Teams/CreatePresenceList.action",
                "Properties": {
                    "Properties": prop,
                }
            })
        }))
        
        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Criação de turma",
                "Message": "Turma criada com sucesso!",
                "OnOK": "/Attendance_List/Actions/Teams/NavToMain.action"
            },
        });

/*         clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/Teams/CreateEntityTeam.action",
            "Properties": {
                "Properties": {
                    "externalCode": "404040"
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

