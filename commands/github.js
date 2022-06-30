const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('Shows Bot Creator GitHub Profile'),
        async execute(interaction){
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        // .setCustomId('primary')
                        .setLabel('Ver perfil')
                        .setStyle('LINK')
                        // .setDisabled(true)
                        .setEmoji('920737219373842452')
                        .setURL('https://github.com/jeyssson4k')
                );
            // await interaction.reply({ content: 'Pong!', components: [row] });

            const embed = new MessageEmbed()
                .setColor('#3399FF')
                .setTitle('GitHub: Jeyssson4k')
                .setImage('https://landingjfweb.netlify.app/res/gitprofile.jpg')
                // .addFields(
                //     { name: 'title', value: 'value', inline: false },
                // );
            await interaction.reply( { embeds: [embed], components: [row]});

            await wait(5000);

            await interaction.followUp('Recuerda dar follow para ver mis próximos proyectos públicos <:fuckcat:920737219373842452>');
            
        }
}