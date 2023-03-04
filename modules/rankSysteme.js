const {QuickDB} = require("quick.db");

const db = new QuickDB({filePath: "assets/db/rankSystem.sqlite"})
let {rankSystem} = require("./config.json")


module.exports.addXp = async (id, msg)=> {
    let username = id.toString();
    let data = await db.get(msg.channel.name +"."  + username)
    if (data === null || data === undefined){
        await db.set(msg.channel.name +"."+ username, {xp: 1,level: 0})
    }else{    
        let level = await db.get(msg.channel.name +"."+ username+ ".level")
        let xp = await db.get(msg.channel.name +"."+ username+ ".xp")
        let randomXp = Math.floor(Math.random() * (5 - 1)) + 1;
        xp = xp + randomXp;
    
        if(xp >= rankSystem[level]){
            console.log("levelup");
            level++
            await db.set(msg.channel.name +"."+ username+ ".level", level)
            await db.set(msg.channel.name +"."+ username+ ".xp", 0)
            await msg.channel.send("GG!! "+ msg.author.username + " viens de monter au niveau " + level );
        }else{
            await db.set(msg.channel.name +"."+ username+ ".xp", xp)

        }
    }
}
module.exports.profil = async(msg) => {
    let id = msg.author.id.toString();
    let data = await db.get(msg.channel.name +"."  + id)
    if (data === null || data === undefined){
        await msg.channel.send("Tu n'as pas encore été enregistrer dans notre systeme . écrit un autre message svp")
    }else{
        let xprestant = rankSystem[data.level] - data.xp
        await msg.channel.send(`tu es actuellement niveau ${data.level}, il te faut encore ${xprestant} xp afin de monter au niveau supérieur!!`)
    }


}
