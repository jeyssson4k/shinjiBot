const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ty')
        .setDescription('Thank you')
        .addUserOption( option => option.setName('user').setDescription('Dar gracias a').setRequired(true)),
        async execute(interaction){
            const userThanks = interaction.options.getUser('user');
            await interaction.deferReply( );
            await wait(3000);
            await interaction.editReply(`Shinji dice: Gracias ${userThanks}`);
        }
}