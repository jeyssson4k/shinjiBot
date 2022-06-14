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
const wait = require('util').promisify(setTimeout);
const fetch = require('node-fetch');
const { CAT_API_KEY } = require('../JSON/config.json');

module.exports= {
    data: new SlashCommandBuilder()
    .setName('meow')
    .setDescription('Looking for a cat'),
    async execute(interaction){
        try{
            const red = Math.floor(Math.random()*256), green = Math.floor(Math.random()*256), blue = Math.floor(Math.random()*256);
            const color = hexColorCode(red, green, blue);
            const url = `https://api.thecatapi.com/v1/breeds?api_key=${CAT_API_KEY}`;

            await interaction.reply("Looking for a meow meow :3");
            await wait (2000);

            const meow = await fetch(url)
                .then(resp => resp.json())
                .then(data => id = data.map(data => data.id))
                .then(id => {
                    const cat_id = id[Math.floor(Math.random() * id.length)]
                    const cat_url = fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${cat_id}&api_key=${CAT_API_KEY}`)
                        .then(resp => resp.json())
                        .then(data => {
                            const cat = data[0];
                            const embed = new MessageEmbed()
                                .setColor(color)
                                .setTitle(`*Meow!*`)
                                .setImage(cat.url);

                            interaction.editReply({ content: "Dude, look at this cat :3", embeds: [embed] });
                        });
                });

            console.log(meow);  

        }catch(e){
            console.error(e);
            return;
        }
    }
}