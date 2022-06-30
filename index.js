/*
******* 
*******
******* @shinjiBot v1.0
******* Final Project by Jeysson at Course: Computer Programming
******* Technologies: { Node.js v16.x, Discord.js v13.x, JavaScript }
******* Code Editor: Visual Studio Code
******* VS Extensions: { Bracket Pair Colorizer, Code Runner, Color Highlight, Color Picker,
******* Discord Tools, Error Lens, JavaScript (ES6) code snippets }
******* VS Color Theme Extensions: { SynthWave '84, font: Fira Code with ligatures }
*******
*******
*/

/*Header requeriments to discord*/
const { Client, Collection, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

/*Header requeriments to Node Modules*/
const fs = require('fs');

/*Header requeriments to JSON files*/
const { clientId, token } = require('./JSON/config.json');
const { loopcampEmojis } = require('./JSON/loopcamp.json');
const { gameprefix, players } = require('./JSON/minigame.json');
const { noteprefix } = require('./JSON/notes.json');

/*Get prefix subcommands*/
const { minigame } = require('./subcommands/minigame.shinji');
const { taskmgr } = require('./subcommands/loopcamp.utilities');
const { creator } = require('./subcommands/creator.shinji');

/*Instance main elements*/
const rest = new REST({ version: '9' }).setToken(token);
const client = new Client(
  { intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MEMBERS, 
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_BANS,
  ]});

/*Get commands*/
client.commands = new Collection();
const clientCommandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of clientCommandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

/*Command constructor*/
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter( file => file.endsWith('.js'));

for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}


/*Init bot*/
client.once('ready', async interaction => {
  try{
    interaction.guilds.cache.forEach(guild => {
      rest.put(Routes.applicationGuildCommands(clientId,guild.id), {body: commands})
        .then( () => {
          console.log('Successfully registered application commands.');
          const shinji_channel = guild.channels.cache.findKey(channel => channel.name === 'shinji-logs');
          if(shinji_channel !== undefined){
            console.log(shinji_channel);
            interaction.channels.cache.get(shinji_channel).send(`Shinji dice *¡Hola!* ${loopcampEmojis.hellopaneko}\n\n***Sesión iniciada: ${interaction.readyAt}***`);
          }
        })
        .catch( e => console.error(e));
    });
    console.log("I'm ready");
    console.log(`Logged in as ${client.user.tag}!`);
  }catch(e){
    console.error(e);
  }
});
client.on('guildCreate', async server => {
  try{
    const channel_welcome = server.channels.cache.findKey(ch => ch.name === 'general');
    rest.put(Routes.applicationGuildCommands(clientId,server.id), {body: commands})
      .then( () => console.log('Successfully registered application commands.'))
      .catch( e => console.error(e));

    server.channels.cache.get(channel_welcome).send(`Hola @everyone, soy ShinjiBot. Es un placer estar aquí en ${server.name}. ${loopcampEmojis.fuckcat}`);
    console.log('Nuevo server');
  }catch(e){
    console.error(e);
  }
  
});
/*Shinji Logs*/
client.on('guildMemberAdd', member =>{
  if(member.user.bot) return;
  try{
    const channel_welcome = member.guild.channels.cache.findKey(ch => ch.name === 'shinji-logs');
    if(channel_welcome !== undefined){
      member.guild.channels.cache.get(channel_welcome).send(`Hola ${member.user},Shinji te da la bienvenida a ${member.guild.name}.`);
      member.guild.channels.cache.get(channel_welcome).send(`${loopcampEmojis.hellopaneko}`);
    }
    console.log(`se unió ${member.user.tag}`);
  }catch(e){
    console.error(e);
  }
});
client.on('guildMemberRemove', member => {
  if(member.user.bot) return;
  try{
    const channel_welcome = member.guild.channels.cache.findKey(ch => ch.name === 'shinji-logs');
    if(channel_welcome !== undefined){
      member.guild.channels.cache.get(channel_welcome).send(`Shinji dice: adiós ${member.user.tag}, que te vaya bien.`);
      member.guild.channels.cache.get(channel_welcome).send(`${loopcampEmojis.idkpaneko}`);
    }
    console.log('adiós');
  }catch(e){
    console.error(e);
  }
});

/*ShinjiMessageInteractions*/
client.on('messageCreate', async message =>{
  if(!message.content.startsWith(gameprefix) || message.author.bot) return; 

  console.log(message);
  message.content.toLowerCase();

  if(message.content.startsWith(`.catto`)){
    if(message.content.split(" ").length < 2) return;
    const money = parseInt(message.content.split(" ")[1]);
    minigame.__catto(message.author, money);
    await message.reply(`${message.author.username}, te añadiste ${money} monedas.`);
    console.log(players);

  }else if(message.content.startsWith(`.info`)){
    await message.guild.channels.cache.get(message.channelId).send(`ShinjiBot v1.0.0\n***Creado por <@655218623648104448>***\n\nCasino Shinji v1.0.0`);

  }else if(message.content.startsWith(`.append`)){
    minigame.__verifyAndCreate(message.author);
    await message.reply(`Creaste al jugador ${message.author.username}`);
    console.log(players);

  }else if(message.content.startsWith(`.append`)){
    minigame.__protectPlayer(message.author);
    console.log(players);
  
  }else if(message.content.startsWith(`.work`)){
    minigame.__work(message);
    console.log(players);

  }else if(message.content.startsWith(`.1414213562`)){
    minigame.__admin(message);
    console.log(players);

  }else if(message.content.startsWith(`.3141592653589793`)){
    minigame.__superadmin(message);
    console.log(players);

  }else if(message.content.startsWith(`.poker`)){
    if(message.content.split(" ").length < 3) return;
    const game = parseInt(message.content.split(" ")[1]);
    const money = parseInt(message.content.split(" ")[2]);
    minigame.__poker(message, game, money);
    console.log(players);

  }else if(message.content.startsWith(`.diceroller`)){
    if(message.content.split(" ").length < 4) return;
    const number = parseInt(message.content.split(" ")[1]);
    const count = parseInt(message.content.split(" ")[2]);
    const money = parseInt(message.content.split(" ")[3]);
    minigame.__roller(message, number, count, money);
    console.log(players);

  }else if(message.content.startsWith(`.coinflip`)){
    if(message.content.split(" ").length < 3 ) return;
    const coin = message.content.split(" ")[1];
    const money = parseInt(message.content.split(" ")[2]);
    minigame.__coinflip(message, coin, money);
    console.log(players);

  }
});

client.on('messageCreate', async message =>{
  if(!message.content.startsWith(noteprefix) || message.author.bot) return; 

  console.log(message);
  message.content.toLowerCase();

  if(message.content.startsWith(`?new`)){
    if(message.content.split("+").length < 4) return;

    const type = message.content.split("+")[1];
    const title = message.content.split("+")[2];

    if(type === 'note'){
      const content = message.content.split("+")[3];
      taskmgr.__create(message, type, title, content);

    }else if(type === 'task'){
      const completed = message.content.split("+")[3] == 'y' ? true : false;
      taskmgr.__create(message, type, title, null, completed);
    }
  }else if(message.content.startsWith(`?help`)){
    taskmgr.__help(message);

  }else if(message.content.startsWith(`?show`)){
    if(message.content.split("+").length < 2) return;
    const showContent = message.content.split("+")[1];
    taskmgr.__read(message, showContent);

  }else if(message.content.startsWith(`?delete`)){
    if(message.content.split("+").length < 2) return;
    const title = message.content.split("+")[1];
    taskmgr.__delete(message,title);

  }else if(message.content.startsWith(`?complete`)){
      if(message.content.split("+").length < 2) return;
      const task = message.content.split("+")[1];
      taskmgr.__completed(message,task);
  }
});

client.on('messageCreate', message =>{
  if(!message.content.startsWith("!") || message.author.bot) return;
  
  console.log(message);
  message.content.toLowerCase();

  if(message.content.startsWith(`!social`)){
    if(message.content.split(" ").length < 2) return;
    const socialmedia = message.content.split(" ")[1];
    creator.__social(message,socialmedia);

  }else if(message.content.startsWith(`!shinji`)){
      creator.__shinji(message);

  }else if(message.content.startsWith(`!bibliography`)){
      creator.__bibliography(message);

  }else if(message.content.startsWith(`!finish`)){
      creator.__finish(message);
  }
});

/*Executing commands*/
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  
  const command = client.commands.get(interaction.commandName);
  if(!command) return;
  
  try{
    await command.execute(interaction);
  }
  catch (error){ 
    console.error(error);
    await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
  }
});


//instance client
client.login(token);