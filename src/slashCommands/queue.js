const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Muestra la cola de canciones actual. Pero eso no me devolera el amor de ella...'),
  async execute(interaction) {
    const queue = interaction.client.distube.getQueue(interaction);
    if (!queue) return interaction.reply('❌ No hay canciones en la cola parace. Pongale no ma');

    // Obtén las canciones de la cola, mostrando solo las primeras 10 para evitar mensajes largos
    const queueSongs = queue.songs
      .slice(0, 10) // Muestra hasta 10 canciones
      .map((song, index) => `${index === 0 ? '🎶' : `${index}.`} ${song.name} - \`${song.formattedDuration}\``)
      .join('\n');

    await interaction.reply({
      content: `**Cola actual:**\n${queueSongs}${queue.songs.length > 10 ? '\n...y todas estas aparte, la mea fiesta' : ''}`,
      ephemeral: true // Muestra solo al usuario que ejecutó el comando
    });
  },
};
