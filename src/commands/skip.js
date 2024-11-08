module.exports = {
    name: 'skip',
    description: 'Salta a la siguiente canción',
    async execute(message) {
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) return message.channel.send('❌ ¡Debes estar en un canal de voz para usar este comando!');
  
      try {
        const queue = message.client.distube.getQueue(message);
        if (!queue) return message.channel.send('❌ No hay ninguna canción reproduciéndose.');
  
        await queue.skip();
        message.channel.send('⏭️ Canción saltada.');
      } catch (error) {
        console.error("Error al intentar saltar la canción:", error);
        message.channel.send('❌ Hubo un error al intentar saltar la canción.');
      }
    },
  };
  