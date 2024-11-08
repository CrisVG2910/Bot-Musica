module.exports = {
    DESCRIPTION: "Sirve par ver el ping del bot",
    PERMISSIONS: ["Administrator", "KickMembers", "BanMembers"],
    async execute(client, message, args, prefix){
        return message.reply(`\`${client.ws.ping}ms\``)
    }
}