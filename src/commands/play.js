module.exports = {
  name: 'play',
  description: 'Reproduce una canción usando solo el título',
  async execute(message, args) {
    const query = args.join(' ');
    if (!query) return message.channel.send('❌ Debes proporcionar el título de una canción.');
  
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send('❌ ¡Debes estar en un canal de voz para usar este comando!');
  
    try {
      // Intentamos reproducir la canción
      await message.client.distube.play(voiceChannel, query, {
        textChannel: message.channel,
        member: message.member,
      });
      
      // Confirmación de que la canción está siendo buscada y reproducida
      await message.channel.send(`🎶 Buscando y reproduciendo **${query}** en el canal de voz.`);
    } catch (error) {
      // Mostramos el error en la consola y enviamos mensaje de error al canal
      console.error("Error al intentar reproducir la canción:", error);
      
      // Verificamos si el error tiene un mensaje específico y mostramos el mensaje adecuado
      const errorMessage = error.message || 'Cargando tu petición...';
      await message.channel.send(`🔄 ${errorMessage}`);
    }
  },
};
