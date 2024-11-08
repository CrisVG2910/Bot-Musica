module.exports = {
    name: 'resume',
    description: 'Reanuda la canción pausada',
    async execute(message) {
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) return message.channel.send('❌ ¡Debes estar en un canal de voz para usar este comando!');
  
      try {
        const queue = message.client.distube.getQueue(message);
        if (!queue) return message.channel.send('❌ No hay ninguna canción en la cola.');
  
        if (!queue.paused) {
          return message.channel.send('▶️ La canción ya está en reproducción.');
        }
  
        queue.resume();
        message.channel.send('▶️ La canción ha sido reanudada.');
      } catch (error) {
        console.error("Error al intentar reanudar la canción:", error);
        message.channel.send('❌ Hubo un error al intentar reanudar la canción.');
      }
    },
  };
  