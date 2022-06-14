const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('editnick')
        .setDescription('Editar nickname de un usuario')
        .setDefaultPermission(false)
        .addUserOption( option => option.setName('user').setDescription('usuario').setRequired(true))
        .addStringOption( option => option.setName('nick').setDescription('nuevo nick').setRequired(true)),
        async execute(interaction){

            const user = interaction.options.getUser('user');
            const usernick = user.username;
            const nick = interaction.options.getString('nick');
            
            await interaction.guild.members.fetch({ user, force: true })
                .then(member => member.edit({ nick: nick, channel: null }))
                .catch(e => console.error(e));
            
            await interaction.reply(`Has cambiado el nombre de ${usernick} a ${nick}.`);
        }
}