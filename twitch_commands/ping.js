module.exports = {
    data: {
        name: "ping"
    },
    async runCommands(msg, client) {

        await msg.channel.send("je met actuellement: "+ ping +" ms pour vous répondre! ");
    }
}