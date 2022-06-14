const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const request = require('request');

const { JDOODLE_CLIENT_ID, JDOODLE_SECRET_CLIENT } = require('../JSON/config.json');

const rgbToHex = rgb => { 
    let hex = Number(rgb).toString(16);
    hex.length < 2 ? hex = "0" + hex : hex;
    return hex;
}

const hexColorCode = (r,g,b) => {   
    let red = rgbToHex(r), green = rgbToHex(g), blue = rgbToHex(b);
    return red+green+blue;
}

module.exports= {
    data: new SlashCommandBuilder()
    .setName('compile')
    .setDescription('Ejecuta tu propio código Python')
    .addStringOption(option => option.setName('code').setDescription('Código a ejecutar').setRequired(true)),
    async execute(interaction){
        const red = Math.floor(Math.random()*256), green = Math.floor(Math.random()*256), blue = Math.floor(Math.random()*256);
        const color = hexColorCode(red, green, blue);
        const code = interaction.options.getString('code');

        const pyCode = {
            script: code,
            language: "python3",
            versionIndex: "0",
            clientId: JDOODLE_CLIENT_ID,
            clientSecret: JDOODLE_SECRET_CLIENT
        }
        const req = {
            url: 'https://api.jdoodle.com/execute',
            method: "POST",
            json: pyCode
        }
        await request(req, (e, resp, body) => {
            try{
                const embed = new MessageEmbed()
                    .setColor(color)
                    .setTitle(`*Resultado de ejecutar ${pyCode.script}.*`)
                    .setDescription(`${body.output}`)
                    .setFooter(`Memory used: ${body.memory} kb, CPU time: ${body.cpuTime} s.`)
                interaction.reply({ embeds: [embed] });

                console.log('statusCode:', resp && resp.statusCode);
                console.log('body:', body);

            }catch(e){
                console.error(e);
                interaction.reply({ content: "No se pudo compilar, lo siento :c", ephemeral: true });
            }

        });

    }
}