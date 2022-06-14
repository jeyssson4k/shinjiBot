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

const { MUSIC_API_KEY } = require('../JSON/config.json');


module.exports= {
    data: new SlashCommandBuilder()
    .setName('lyric')
    .setDescription('Muestra la letra de una canción (beta)')
    .addStringOption(option => option.setName('songname').setDescription('Nombre de la canción').setRequired(true)),
    async execute(interaction){
        const red = Math.floor(Math.random()*256), green = Math.floor(Math.random()*256), blue = Math.floor(Math.random()*256);
        const color = hexColorCode(red, green, blue);
        const song = interaction.options.getString('songname');
        let url = `http://api.musixmatch.com/ws/1.1/track.search?apikey=${MUSIC_API_KEY}&q=${song}`;
        
        const lyric = await fetch(url)
            .then(resp => resp.json())
            .then(data => data.message)
            .then(data => data.body)
            .then (data => data.track_list)
            .then((data) => {
                //console.log(data);
                for(i of data){
                    try{
                        console.log(i);
                        if(i.track.has_lyrics == 1){
                            const songName = i.track.track_name;
                            const artistName = i.track.artist_name;

                            const lyricSong = fetch(`http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${MUSIC_API_KEY}&track_id=${i.track.track_id}`)
                                .then(resp => resp.json())
                                .then(data => data.message)
                                .then(data => data.body)
                                .then(data => {
                                    console.log(data);
                                    const embed = new MessageEmbed()
                                        .setColor(color)
                                        .setTitle(`*${songName} - ${artistName}.*`)
                                        .setDescription(`\n\n${data.lyrics.lyrics_body}`);
    
                            interaction.reply({ embeds: [embed] });
                                });
                            break;
                        }
                    }catch(e){
                        console.error(e);

                        interaction.reply({content: `Interacción fallida. Error ${e}`});
                        return;
                    }
                    
                }
            });
		    
    }
}