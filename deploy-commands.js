const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const commandsPath = path.join(__dirname, 'src', 'slashCommands'); // Ajuste de la ruta
fs.readdirSync(commandsPath).forEach(folder => {
  const folderPath = path.join(commandsPath, folder);

  if (fs.lstatSync(folderPath).isDirectory()) {
    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(path.join(folderPath, file));
      // Verificación de la estructura de comando
      if (command && command.data && typeof command.data.toJSON === 'function') {
        commands.push(command.data.toJSON());
      } else {
        console.warn(`Advertencia: el archivo ${file} no tiene una estructura válida de comando.`);
      }
    }
  } else if (folder.endsWith('.js')) {
    const command = require(folderPath);
    // Verificación de la estructura de comando
    if (command && command.data && typeof command.data.toJSON === 'function') {
      commands.push(command.data.toJSON());
    } else {
      console.warn(`Advertencia: el archivo ${folder} no tiene una estructura válida de comando.`);
    }
  }
});

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Iniciando el registro de comandos slash.');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log('Comandos registrados con éxito.');
  } catch (error) {
    console.error(error);
  }
})();
