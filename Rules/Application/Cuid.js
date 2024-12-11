export default function Cuid(context) {
    const cuidPrefix = 'c';
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 10);
    const uniqueID = cuidPrefix + timestamp + randomPart;
    return uniqueID;
}
