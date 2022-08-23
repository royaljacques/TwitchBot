const rankSysteme = require("./../modules/rankSysteme");

module.exports = {
    data: {
        name: "rank"
    },
    async runCommands(msg, client) {
        rankSysteme.profil(msg)
    }
}