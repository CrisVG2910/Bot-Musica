const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Reproduce una canción en el canal de voz')
    .addStringOption(option =>
      option.setName('cancion')
        .setDescription('El nombre o URL de la canción')
        .setRequired(true)
    ),
  async execute(interaction) {
    const query = interaction.options.getString('cancion');

    // Responde de inmediato para evitar que la interacción expire
    await interaction.reply({ content: '🔄 Procesando tu solicitud...', ephemeral: true });

    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.followUp({ content: '¡Debes estar en un canal de voz para usar este comando!', ephemeral: true });
    }

    try {
      await interaction.client.distube.play(voiceChannel, query, {
        textChannel: interaction.channel,
        member: interaction.member,
      });
      // Mensaje de confirmación de reproducción
      await interaction.followUp(`🎶 Reproduciendo **${query}** en el canal de voz.`);
    } catch (error) {
      console.error("Error al intentar reproducir la canción:", error);
      // Enviar mensaje de error si la reproducción falla
      await interaction.followUp({ content: 'Hubo un error al intentar reproducir la canción.', ephemeral: true });
    }
  },
};
