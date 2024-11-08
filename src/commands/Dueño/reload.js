const {EmbedBuilder} = require('discord.js');
module.exports = {
    DESCRIPTION: "Recarga los archivos del bot.",
    OWNER: true,
    async execute(client, message, args, prefix){
        let opcion = "Comandos, Eventos y Handlers";

        try {
            switch (args[0]?.toLowerCase()) {
                case "commands":
                case "comandos": {
                    opcion = "Comandos"
                    await client.loadCommands();
                }    
                    break;

                case "slashcommands":
                case "slash": {
                    opcion = "Comandos Diagonales"
                    await client.loadSlashCommands();
                }
                    break;

                case "handlers": {
                    opcion = "Handlers"
                    await client.loadHandlers();
                }    
                    break;

                case "events":
                case "eventos": {
                    opcion = "Eventos"
                    await client.loadEvents();
                }    
                    break;

                default:{
                    await client.loadHandlers();
                    await client.loadEvents();
                    await client.loadSlashCommands();
                    await client.loadCommands();
                }
                    break;
            }

            message.reply({
                embeds: [
                    new EmbedBuilder()
                    .addFields({name: `✅ ${opcion} Recargados!`, value: `> *Okay!*`})
                    .setColor(process.env.COLOR)
                ]
            });

        } catch(e){
            message.reply({content: `**Ha ocurrido un error al recargar los archivos!**\n*Mira la consola para más detalle!.*`});
            console.log(e);

        }
    }
}