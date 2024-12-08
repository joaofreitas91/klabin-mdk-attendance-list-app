export default function SetInitialBinding(context) {

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = (Math.random() * 16) | 0; // Gera um número aleatório de 0-15
            const v = c === 'x' ? r : (r & 0x3) | 0x8; // Ajusta os bits para conformidade com UUID v4
            return v.toString(16); // Retorna o valor em hexadecimal
        });
    }

    // Retorna o UUID gerado
    return uuidv4();
}
