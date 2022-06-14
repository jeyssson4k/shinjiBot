const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);

const { players } = require('../JSON/minigame.json');
const { loopcampEmojis } = require('../JSON/loopcamp.json');

const defineLeaderBoard = () =>{
    const leaderboard = players.sort((a,b) => b.balance - a.balance);
    console.log(leaderboard);
    let board = [];
    for(player of leaderboard){
        if(board.length === 10) break;
        console.log(player);
        board.push(player);
        console.log(board);
    }
    let message = "";
    let i = 1;
    for(player of board){
        console.log(player);
        message += `${i}. ***${player.name}***\nDinero: ${player.balance}\n\n`;
        console.log(message);
        i++;
    }
    return message;
}
console.log();
module.exports = {
    data: new SlashCommandBuilder()
        .setName('shinjirank')
        .setDescription('Muestra el tablero de los mejores jugadores'),
        async execute(interaction){
            const message = defineLeaderBoard(); 
            const embed = new MessageEmbed()
                .setColor('#3399FF')
                .setTitle(`${loopcampEmojis.eatpaneko} ***Shinji's minigame: Leaderboard***`)
                .setDescription(`${message}`)
                .setFooter(`By Shinji Bot`);

            await interaction.deferReply();
            await wait(2500);
            await interaction.editReply({ embeds: [embed] });            
        }
}