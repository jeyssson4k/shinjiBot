const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong'),
        async execute(interaction){
            const embed = new MessageEmbed()
                .setColor('#3399FF')
                .setTitle('Ping!')
                .setDescription(`Pong! \n***${interaction.client.ws.ping}ms.***`);

            await interaction.reply( { embeds: [embed] });
        }
}