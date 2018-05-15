function getUUID(){
    let sessionID = '';
    for (let i = 0; i < 8; i++) {
        const random = Math.floor(Math.random() * 36);
        sessionID += random < 10 ? random : String.fromCharCode(65 + random - 10);
    }
    return sessionID;
}

export default getUUID;