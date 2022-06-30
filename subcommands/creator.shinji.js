/*
*****
***** ShinjiMessageInteractions
*****
***** prefix { ! }
***** Subcommand 1: Verify if user is already created
***** Subcommand 2: Protect user's balance
***** Subcommand 3: Work 
***** Subcommand 4: Buy
***** Subcommand 5: AdminGenerator
***** Subcommand 6: SuperadminGenerator
***** Subcommand 7: PokerGame
*****
*****
*****
*/
const wait = require('util').promisify(setTimeout);
const { loopcampEmojis,ownerId } = require('../JSON/loopcamp.json');
const { socialmedia_links, bibliography, commands_and_subcommands, dependencies, features } = require('../JSON/creator.json');

module.exports.creator = {
    __social: async (interaction, socialmedia) =>{
        try{
            for(media of socialmedia_links){
                if(!media.name == socialmedia) continue;
                if(media.name == socialmedia){
                    await interaction.guild.channels.cache.get(interaction.channelId).send(`***${media.name}:*** ${media.link} ${loopcampEmojis.eatpaneko}`);
                    break;
                }
                
            }
        }catch(e){
            console.error(e);
            return;
        }
    },
    __shinji: async interaction =>{
        try{
            //const owner = interaction.guild.members.cache.find(member => member.id === ownerId);
            await interaction.guild.channels.cache.get(interaction.channelId).send(`***ShinjiBot v1.0.0: Desarrollado por <@655218623648104448>*** ${loopcampEmojis.eatpaneko}`);
            await wait(2000);
            await interaction.guild.channels.cache.get(interaction.channelId).send(`***SlashCommands incluídos en ShinjiBot:***`);
            await wait(1000);
            for(item of commands_and_subcommands.slash_commands){
                await interaction.guild.channels.cache.get(interaction.channelId).send(`_${item}_`);
                await wait(1000);
            }
            await wait(2000);
            await interaction.guild.channels.cache.get(interaction.channelId).send(`***dot subcommands incluídos en ShinjiBot:***`);
            for(item of commands_and_subcommands.dot_subcommands){
                await interaction.guild.channels.cache.get(interaction.channelId).send(`_${item}_`);
                await wait(1000);
            }
            await wait(2000);
            await interaction.guild.channels.cache.get(interaction.channelId).send(`***question subcommands incluídos en ShinjiBot:***`);
            for(item of commands_and_subcommands.qst_subcommands){
                await interaction.guild.channels.cache.get(interaction.channelId).send(`_${item}_`);
                await wait(1000);
            }
            await wait(2000);
            await interaction.guild.channels.cache.get(interaction.channelId).send(`***exclamation subcommands incluídos en ShinjiBot:***`);
            for(item of commands_and_subcommands.exc_subcommands){
                await interaction.guild.channels.cache.get(interaction.channelId).send(`_${item}_`);
                await wait(1000);
            }
            await wait(2000);
            await interaction.guild.channels.cache.get(interaction.channelId).send(`***Dependencias requeridas en ShinjiBot:***`);
            for(item of dependencies){
                await interaction.guild.channels.cache.get(interaction.channelId).send(`_${item}_`);
                await wait(1000);
            }
            await wait(2000);
            await interaction.guild.channels.cache.get(interaction.channelId).send(`***Extras incluídos en ShinjiBot:***`);
            for(item of features){
                await interaction.guild.channels.cache.get(interaction.channelId).send(`_${item}_`);
                await wait(1000);
            }
        }catch(e){
            console.error(e);
            return;
        }

    },
    __bibliography: async (interaction) =>{
        try{
            for(link of bibliography){
                await interaction.guild.channels.cache.get(interaction.channelId).send(`${link}`);
                await wait(2000);
            }
        }catch(e){
            console.error(e);
            return;
        }
    },
    __finish: async (interaction) =>{
        try{
            await interaction.guild.channels.cache.get(interaction.channelId).send(`Shinji tiene un mensaje para ti:\n\n***"Si puedes imaginarlo puedes programarlo :3"*** ${loopcampEmojis.lovepaneko}`);
        }catch(e){
            console.error(e);
            return;
        }
    }
}