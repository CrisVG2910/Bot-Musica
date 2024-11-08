module.exports = {
    name: 'pause',
    description: 'Pausa la canción actual',
    async execute(message) {
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) return message.channel.send('❌ ¡Debes estar en un canal de voz para usar este comando!');
  
      try {
        const queue = message.client.distube.getQueue(message);
        if (!queue) return message.channel.send('❌ No hay ninguna canción reproduciéndose.');
        
        if (queue.paused) {
          return message.channel.send('⏸️ La canción ya está pausada.');
        }
        
        queue.pause();
        message.channel.send('⏸️ La canción ha sido pausada.');
      } catch (error) {
        console.error("Error al intentar pausar la canción:", error);
        message.channel.send('❌ Hubo un error al intentar pausar la canción.');
      }
    },
  };
  