const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getlucky')
        .setDescription('Prueba tu suerte :3'),
        async execute(interaction){
            const responses = [
                "Eres piscis, ¿verdad? \nPorque solo veo mala suerte...",
                "¿Te crees de buenas? \nMejor quédate en casa...",
                "Las estrellas se alienaron para decirme que hoy vas a valer v*rg*...",
                "Te irá bien; pero hasta ahí.",
                "Yo de tí compraría un boleto de lotería. \nUno nunca sabe...",
                "Menudo sobrado, vaya suerte que traes hoy <:fuckcat:920737219373842452>",
                "Parece que hoy tendrás un buen día :3"
            ];

            const select = Math.floor(Math.random()*responses.length);;
            const user = interaction.user.username;

            await interaction.deferReply();
            await wait(3000);
            await interaction.editReply(
`${user} quiere saber su suerte para hoy.
Shinji responde: ${responses[select]}`);
        }
}