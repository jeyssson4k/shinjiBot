const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Expulsar a un usuario')
        .setDefaultPermission(false)
        .addUserOption( option => option.setName('banuser').setDescription('usuario').setRequired(true))
        .addStringOption( option => option.setName('razon').setDescription('Motivo de la expulsión').setRequired(true)),
        async execute(interaction){
            const user = interaction.options.getUser('banuser');
            const reason = interaction.options.getString('razon');
            interaction.guild.members.ban(user,reason);
        }
}