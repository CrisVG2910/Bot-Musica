const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Salta a la siguiente canción en la cola. El Fran se la come dobla'),
  async execute(interaction) {
    const queue = interaction.client.distube.getQueue(interaction);
    if (!queue) return interaction.reply('❌ No hay nada más adelanta en la cola hermano');
    
    try {
      queue.skip(); // Salta a la siguiente canción en la cola
      await interaction.reply('⏭️ Pongamo el siguiente tema de la cola. Parece que no les gusto na el tema...');
    } catch (error) {
      console.error("Algo muy feo paso compare:", error);
      await interaction.reply('❌ Hasta aquí llego la cola papito');
    }
  },
};
