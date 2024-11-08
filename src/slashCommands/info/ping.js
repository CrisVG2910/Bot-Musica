const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder() // Cambia `CMD` a `data`
    .setName("ping")
    .setDescription("Ver ping del bot"),

  async execute(client, interaction, prefix) {
    return interaction.reply(`\`${client.ws.ping}ms\``);
  }
};
