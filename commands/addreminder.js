//user.id
//user.tag
//user.username
//createdAt
//mention`${user}` 
const rgbToHex = rgb => { 
    let hex = Number(rgb).toString(16);
    hex.length < 2 ? hex = "0" + hex : hex;
    return hex;
}
const hexColorCode = (r,g,b) => {   
    let red = rgbToHex(r), green = rgbToHex(g), blue = rgbToHex(b);
    return red+green+blue;
}

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addreminder')
        .setDescription("Crea un recordatorio")
        .addUserOption( option => option.setName('user').setDescription('User').setRequired(true))
        .addStringOption( option => option.setName('reminder').setDescription('Descripción del recordatorio').setRequired(true))
        .addIntegerOption( option => option.setName('minutes').setMinValue(0).setMaxValue(60).setDescription('Tiempo para activar recordatorio').setRequired(true)),
        async execute(interaction){

            const red = Math.floor(Math.random()*256), green = Math.floor(Math.random()*256), blue = Math.floor(Math.random()*256)
            const color = hexColorCode(red, green, blue)
            const user = interaction.options.getUser('user');
            const reminder = interaction.options.getString('reminder');
            const time = interaction.options.getInteger('minutes');

            const embed = new MessageEmbed()
                .setColor(color)
                .setTitle("Recordatorio")
                .setDescription(`Hola, ${user}\n\n***Es hora de:***  ${reminder}`)
                .setFooter("By Shinji Bot."); 

            await interaction.reply('Recordatorio asignado satisfactoriamente.');
            await wait(time*60*1000);
            await interaction.followUp({embeds: [embed]});            
        }
}