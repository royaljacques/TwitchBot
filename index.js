const { Client } = require('@twitchapis/twitch.js');
const env = require('dotenv').config();
const fs = require("fs");
const path = require('node:path');
const rankSysteme = require("./modules/rankSysteme");
let config = require("./config.json");
const client = new Client({
    channels: config.channels,
});
let commandsLoader = {}
function loadCommands() {
    let commandes = [];
    const commandsPaths = path.join(__dirname, 'twitch_commands');
    const commandFiless = fs.readdirSync(commandsPaths).filter(file => file.endsWith('.js'));
    for (const file of commandFiless) {
        const filePath = path.join(commandsPaths, file);
        const command = require(filePath);
        let name = command.data.name;
        commandes.push({ [name]: command })
        console.log("commands => " + command.data.name + " 🆙");
        commandes.forEach(e => {
            Object.assign(commandsLoader, e)
        })
    }
}
loadCommands()

client.on('ready', e => {
    console.log(`Logged in as ${client.user.name}!`);
});


client.on('message', async (msg) => {
    rankSysteme.addXp(msg.author.id, msg)
    let commandsName = msg.content.slice(1);
    let searchCommands = commandsLoader.hasOwnProperty(commandsName);
    if (searchCommands) {
        commandsLoader[commandsName].runCommands(msg, client);
    }
});

client.login(env.parsed.TOKEN.toString());