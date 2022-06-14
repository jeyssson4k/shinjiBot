const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);
module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Shows information about this server'),
        async execute(interaction){
            const embed = new MessageEmbed()
                .setColor('#3399FF')
                .setDescription(`Buen día, estas son las estadísticas de ${interaction.guild.name}

                
***Nombre del servidor:***
${interaction.guild.name}

***Cantidad de miembros:***
${interaction.guild.memberCount}

***Estamos en el canal:***
${interaction.channel}

***Servidor creado el día:***
${interaction.guild.createdAt}`);
            await wait(2000);
            await interaction.reply({ embeds: [embed] });


        }
}