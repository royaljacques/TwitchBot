module.exports = {
    data: {
        name: "discord"
    },
    async runCommands(msg, client) {
        let ping = await client.ping()
        await msg.channel.send("https://discord.gg/tbMaZG5UjH");
    }
}