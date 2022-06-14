const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);

const rgbToHex = rgb => { 
    let hex = Number(rgb).toString(16);
    hex.length < 2 ? hex = "0" + hex : hex;
    return hex;
}
const hexColorCode = (r,g,b) => {   
    let red = rgbToHex(r), green = rgbToHex(g), blue = rgbToHex(b);
    return red+green+blue;
}
const splitExpression = (expression, operator) => {
    let numbers = expression.split(operator);
    let result = 0;
    console.log(numbers);

    if(operator == "+"){
        for(number of numbers){
            result += Number(number);
        }
    }else if(operator == "-"){
        for(number of numbers){
            result -= Number(number);
        }
    }else if(operator == "*"){
        for(number of numbers){
            result *= Number(number);
        }
    }else if(operator == "/"){
        for(number of numbers){
            if(number == 0){
                break;
            }else{
                result /= Number(number);
            }
        }
    }else if(operator == "**"){
        result = Math.pow(Number(numbers[0]), Number(numbers[1]))
    }else if(operator == "sqrt"){
        if(numbers[0] < 0){
            result = "i"
        }else{
            if(numbers.length == 1){
                result = Math.sqrt(Number(numbers[0]));
            }else if(numbers.length == 2){
                result = Math.sqrt(Number(numbers[1]));
            }
        } 
    }
    return result;
}

module.exports = {
    data: new SlashCommandBuilder()
    .setName('calc')
    .setDescription('Ejecuta operaciones básicas')
    .addStringOption(option => option.setName('operator').setDescription('Operador matemático').setRequired(true))
    .addStringOption(option => option.setName('expression').setDescription('Expresión matemática').setRequired(true)),

    async execute(interaction){
        const red = Math.floor(Math.random()*256), green = Math.floor(Math.random()*256), blue = Math.floor(Math.random()*256);
        const color = hexColorCode(red, green, blue);
        const operator = interaction.options.getString('operator');
        const expression = interaction.options.getString('expression');
        try{
            const result = splitExpression(expression, operator);
            const embed = new MessageEmbed()
                .setColor(color)
                .setTitle(`*Resultado de ${expression}.*`)
                .setDescription(`${result}`);
            await interaction.reply({ embeds: [embed] });
        }catch(e){
            console.error(e);
        }

    }
}