const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const rgbToHex = rgb => { 
    let hex = Number(rgb).toString(16);
    hex.length < 2 ? hex = "0" + hex : hex;
    return hex;
}
const hexColorCode = (r,g,b) => {   
    let red = rgbToHex(r), green = rgbToHex(g), blue = rgbToHex(b);
    return red+green+blue;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomcolor')
        .setDescription('Create a random color'),
        async execute(interaction){
            const red = Math.floor(Math.random()*256), green = Math.floor(Math.random()*256), blue = Math.floor(Math.random()*256)
            const color = hexColorCode(red, green, blue)
            const embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Este es tu color generado')
                .setDescription(`***Hex***\n #${color}\n\n ***rgb***\n(${red}, ${green}, ${blue})`);

            await interaction.reply( { embeds: [embed] });
        }
}