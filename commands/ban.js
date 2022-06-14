const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Banear a un usuario')
        .setDefaultPermission(false)
        .addUserOption( option => option.setName('banuser').setDescription('usuario').setRequired(true)),
        async execute(interaction){
            const user = interaction.options.getUser('banuser');
            interaction.guild.members.ban(user);
        }
}