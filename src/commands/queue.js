module.exports = {
    name: 'queue',
    description: 'Muestra la cola de canciones',
    async execute(message) {
      const queue = message.client.distube.getQueue(message);
      if (!queue) return message.channel.send('❌ No hay ninguna canción en la cola.');
  
      const queueString = queue.songs
        .map((song, index) => `${index + 1}. ${song.name} - \`${song.formattedDuration}\``)
        .join('\n');
  
      message.channel.send(`🎶 **Cola de reproducción:**\n${queueString}`);
    },
  };
  