module.exports = {
    data: {
        name: "discord"
    },
    async runCommands(msg, client) {
        await msg.channel.send("https://discord.gg/tbMaZG5UjH");
    }
}