const rgbToHex = rgb => { 
    let hex = Number(rgb).toString(16);
    hex.length < 2 ? hex = "0" + hex : hex;
    return hex;
}
const hexColorCode = (r,g,b) => {   
    let red = rgbToHex(r), green = rgbToHex(g), blue = rgbToHex(b);
    return red+green+blue;
}

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

const wait = require('util').promisify(setTimeout);
const { WEATHER_API_KEY } = require('../JSON/config.json');

module.exports= {
    data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Muestra el clima de una ubicación')
    .addNumberOption(option => option.setName('latitud').setDescription('Latitud de la coordenada').setRequired(false))
    .addNumberOption(option => option.setName('longitud').setDescription('Longitud de la coordenada').setRequired(false)),
    async execute(interaction){
        try{
            const red = Math.floor(Math.random()*256), green = Math.floor(Math.random()*256), blue = Math.floor(Math.random()*256);
            const color = hexColorCode(red, green, blue);
            const Unilat = 4.635556, Unilon = -74.082778;
            const lat = interaction.options.getNumber('latitud');
            const lon = interaction.options.getNumber('longitud');
            console.log(lat,lon);
            let url;
            if(lon && lat){
                url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
            }else{
                url = `https://api.openweathermap.org/data/2.5/weather?lat=${Unilat}&lon=${Unilon}&appid=${WEATHER_API_KEY}`;
            }
            const clima = await fetch(url)
                .then(resp => resp.json())
                .then((data) => {
                    let weatherFrom;
                    if(!(lon || lat)){
                        weatherFrom = "Universidad Nacional de Colombia - Sede Bogotá "
                    }else{
                        weatherFrom = `${data.coord.lon}° , ${data.coord.lat}°, ${data.sys.country}`
                    }
                    const embed = new MessageEmbed()
                        .setColor(color)
                        .setTitle(`*El clima en ${weatherFrom}.*`)
                        .setDescription(`\n\n***Estamos cerca de:***   ${data.name}\n***Caraterística:***   ${data.weather[0].main}\n${data.weather[0].description}\n\n***Temperatura:***   ${Math.floor(data.main.temp-273)} °C\n***Humedad:***   ${data.main.humidity}%\n***Vientos:***   ${data.wind.speed} Km/h ; ${data.wind.deg}°`)
                    console.log(data);
                    interaction.reply({ embeds: [embed] });
                });
            
            console.log(clima);  

        }catch(e){
            console.error(e);
            return;
        }
    }
}