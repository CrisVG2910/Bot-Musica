module.exports = (distube) => {
  distube
    .on('playSong', (queue, song) =>
      queue.textChannel.send(`🎶 Reproduciendo: **${song.name}** - \`${song.formattedDuration}\``)
    )
    .on('error', (channel, error) => {
      channel.send('Ocurrió un error con la música.');
      console.error(error);
    });
};
