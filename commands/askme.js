const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('askme')
        .setDescription('Pregúntame algo :3')
        .addStringOption( option => option.setName('pregunta').setDescription('Escribe tu pregunta').setRequired(true)),
        async execute(interaction){
            const answers = [
                "Hmmm, no lo creo...",
                "Estoy seguro de que sí.",
                "No, definitivamente.",
                "¿Qué tal si me preguntas más tarde?",
                "Absolutamente.",
                "Preferiría decirte una mentira...",
                "Eso no se pregunta...  ._.",
                "¿Qué pasaría si te dijera que sí?",
                "¿Crees que esa tontería es posible?",
                "Le pregunté a Google y dice que sí.",
                "Eso es un secreto. 7w7",
                "¿Para qué quieres saberlo?",
                "Sí.",
                "No.",
                "Puede que sí, puede que no...",
                "Tal vez. (?)",
                "Lo dudo mucho...",
                "Es probable que sí.",
                "Es probable que no.",
                "No me pongas en estas situaciones... -_-",
                "¿Qué te hace pensar eso?",
                "Haces preguntas muy extrañas...  -_-",
                "¿Qué tal si lo discutimos después?",
                "No voy a responder a eso.",
                "Diría que sí, pero me caes mal.",
                "¿Tú qué opinas?",
                "A mí me parece que sí.",
                "Beep Beep Boop Boop",
                "X_X",
                "*Se muere*",
                "¿Qué tal si le preguntamos a Siri?",
                "¿Qué te hace pensar que lo sé?"
            ];

            const select = Math.floor(Math.random()*answers.length);
            const ask = interaction.options.getString('pregunta');
            const user = interaction.user.username;

            await interaction.deferReply( );
            await wait(3000);
            await interaction.editReply(`${user} pregunta: ${ask}
Shinji responde: ${answers[select]}`);
        }
}