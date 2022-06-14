const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);
const { shinjiLogs } = require('../JSON/loopcamp.json');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Elimina una cantidad de mensajes determinada.')
        .setDefaultPermission(false)
        .addIntegerOption(option => option.setName('amount').setDescription('User').setRequired(true)),
        async execute(interaction){
            const amount = interaction.options.getInteger('amount');
            console.log(interaction);
            console.log(interaction.member.guild.channels.cache.get(interaction.channelId));
            await interaction.member.guild.channels.cache.get(interaction.channelId).bulkDelete(amount,true);
            await wait(2000);
            await interaction.deferReply();

            //Show a log message in shinji-logs
            await interaction.member.guild.channels.cache.get(shinjiLogs).send(`${interaction.user.username} ha borrado ${amount} mensajes en ${interaction.member.guild.channels.cache.get(interaction.channelId).name}`);
            await interaction.editReply({content: `He borrado ${amount} mensajes exitosamente.`, ephemeral: false});          
        }
}