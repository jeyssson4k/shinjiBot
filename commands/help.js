const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

const helper = id => {
    let help = [];
    switch(id){
        case 'addreminder':
            help.push("*addreminder* es un comando de *Shinji* el cual asigna un recordatorio por medio del chat");
            help.push(" \n\n*User:* Opción reservada para selección del usuario al cual desea asignarle el recordatorio");
            help.push(" \n*Reminder:* Opción reservada para digitar la descripción del recordatorio");
            help.push(" \n*Minutes:* Opción reservada para digitar la cantidad de minutos de cuenta regresiva.\n");
            break;
        case 'askme':
            help.push("*askme* es un comando de *Shinji* el cual responde a una pregunta del usuario;\nla pregunta debe ser de respuesta cerrada (Sí/No)");
            help.push(" \n*Pregunta:* Opción reservada para digitar la pregunta que se desea realizar a Shinji.\n");
            break;
        case 'calc':
            help.push("*calc* es un comando de *Shinji* el cual permite realizar operaciones en cadena");
            help.push(" \n\n***Condiciones:***\n1. Las operaciones deben ser de un mismo tipo.\n2. Si la operación es *división*, no se puede añadir el número cero (0).\n3. Si la operación es *raíz cuadrada (sqrt)* se debe ingresar un número igual o mayor a cero (0)");
            help.push(" \n*Operator:* Opción reservada para indicar el tipo de operación que debe realizar *Shinji*");
            help.push(" \n*Expression:* Opción reservada para indicar la cadena de operaciones que debe realizar *Shinji*.\n");
            break;
        case 'lyric':
            help.push("*lyric* es un comando de *Shinji* el cual permite buscar la letra de una canción por medio de el nombre de la canción y el artista (beta)");
            help.push(" \n\n*Songname:* Opción reservada para digitar el nombre de la canción y del artista.\n");
            break;
        default:
            help.push("nothing selected...");
    }

    return help.toString();
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Ayuda sobre los comandos')
        .addStringOption( option => option.setName('command').setDescription('Comando del cual desea más información').setRequired(true)),
        async execute(interaction){

            const command = interaction.options.getString('command');
            const help = helper(command);
            await interaction.deferReply( );
            await wait(3000);
            await interaction.editReply(`${help}`);
        }
}