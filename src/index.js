require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { DisTube } = require('distube');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const { ffmpegPath } = require('@ffmpeg-installer/ffmpeg').path; 

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

// Inicializar DisTube con el plugin YtDlpPlugin, usando el archivo de cookies
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  plugins: [
    new YtDlpPlugin({
      requestOptions: {
        cookies: './cookies.txt'  // Ruta al archivo de cookies
      }
    })
  ],
  ffmpeg: ffmpegPath
});

// Pasar correctamente la instancia de DisTube a distube.js
require('./handlers/distube.js')(client.distube);

// Configuración de comandos slash
client.slashCommands = new Collection();
const slashCommandsPath = path.join(__dirname, 'slashCommands');
const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
  const filePath = path.join(slashCommandsPath, file);
  const command = require(filePath);
  client.slashCommands.set(command.data.name, command);
}

// Configuración de comandos de texto
client.textCommands = new Collection();
const textCommandsPath = path.join(__dirname, 'commands');
const textCommandFiles = fs.readdirSync(textCommandsPath).filter(file => file.endsWith('.js'));

for (const file of textCommandFiles) {
  const filePath = path.join(textCommandsPath, file);
  const command = require(filePath);
  client.textCommands.set(command.name, command);
}

// Manejador para comandos slash
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.slashCommands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Hubo un error al ejecutar este comando.', ephemeral: true });
  }
});

// Manejador para comandos de texto
client.on('messageCreate', async message => {
  if (!message.content.startsWith('!') || message.author.bot) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.textCommands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Hubo un error al intentar ejecutar ese comando.');
  }
});

// Evento cuando el bot esté listo
client.once('ready', () => {
  console.log(`${client.user.tag} está en línea!`);
});

// Inicia sesión en Discord
client.login(process.env.DISCORD_TOKEN);
