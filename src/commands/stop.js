module.exports = {
    name: 'stop',
    description: 'Detiene la reproducción y limpia la cola',
    async execute(message) {
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) return message.channel.send('❌ ¡Debes estar en un canal de voz para usar este comando!');
  
      try {
        const queue = message.client.distube.getQueue(message);
        if (!queue) return message.channel.send('❌ No hay ninguna canción reproduciéndose.');
  
        queue.stop();
        message.channel.send('⏹️ La música ha sido detenida y la cola ha sido limpiada.');
      } catch (error) {
        console.error("Error al intentar detener la reproducción:", error);
        message.channel.send('❌ Hubo un error al intentar detener la reproducción.');
      }
    },
  };
  