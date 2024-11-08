const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pausa o reanuda la canción actual. Para conversar más piola'),
  async execute(interaction) {
    const queue = interaction.client.distube.getQueue(interaction);
    if (!queue) return interaction.reply('❌ No hay ninguna canción reproduciéndose actualmente. Tontito');

    // Verifica si la canción está en pausa o en reproducción y cambia su estado
    if (queue.paused) {
      queue.resume(); // Reanuda la canción si está en pausa
      await interaction.reply('▶️ Canción reanudada. !YIAAAA!');
    } else {
      queue.pause(); // Pausa la canción si está en reproducción
      await interaction.reply('⏸️ Canción pausada. Pura depresión no ma');
    }
  },
};
