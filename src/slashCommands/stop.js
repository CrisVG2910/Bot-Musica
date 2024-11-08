const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Detiene la fiesta y vacía la cola.'),
  async execute(interaction) {
    const queue = interaction.client.distube.getQueue(interaction);
    if (!queue) return interaction.reply('❌ Ponga la canción primero po loco');
    
    queue.stop(); // Detiene la reproducción y vacía la cola
    await interaction.reply('🛑 Se detuvo la fiesta y vaciaste la cola, me así sufrir hermano 😔');
  },
};
