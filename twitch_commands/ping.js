module.exports = {
    data: {
        name: "ping"
    },
    async runCommands(msg, client) {
        let ping = await client.ping()
        await msg.channel.send("je met actuellement: "+ ping +" ms pour vous répondre! ");
    }
}