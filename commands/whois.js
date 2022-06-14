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
        .setName('whois')
        .setDescription("Doxea a un usuario")
        .addUserOption( option => option.setName('user').setDescription('User').setRequired(true)),
        async execute(interaction){
            const red = Math.floor(Math.random()*256), green = Math.floor(Math.random()*256), blue = Math.floor(Math.random()*256)
            const color = hexColorCode(red, green, blue)
            const user = interaction.options.getUser('user');
            const embed = new MessageEmbed()
                .setColor(color)
                .setDescription(`Hola, ${user}
                
***Usuario:***
${user}

***ID:***
${user.id}

***Tag:***
${user.tag}

***Username:***
${user.username}

***Usuario de Discord desde:***
${user.createdAt}
`); 
            await interaction.reply('Hora del doxeo...');
            await wait(2000);
            await interaction.followUp({embeds: [embed]});
            await wait (3000);
            await interaction.followUp('doxeado <:fuckcat:920737219373842452>');
            
        }
}