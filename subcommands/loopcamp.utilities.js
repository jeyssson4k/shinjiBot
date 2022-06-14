/*
*****
***** ShinjiMessageInteractions
*****
***** prefix { ? }
***** Subcommand 1: Creates notes or tasks
***** Subcommand 2: taskmgr command helper
***** Subcommand 3: Deletes notes, tasks or all
***** Subcommand 4: Marks as complete
***** Subcommand 5: Shows notes, tasks or all
*****
*****
*****
*/
const wait = require('util').promisify(setTimeout);
const { loopcampEmojis } = require('../JSON/loopcamp.json');
const { servernotes, notes_and_tasks } = require('../JSON/notes.json');

module.exports.taskmgr = {
    __create: (interaction, type, title, content = null, completed = null) => {
        try{
            const newElement = {
                type: type,
                title: title,
                content: content,
                completed: completed
            }
            notes_and_tasks.push(newElement);

            interaction.guild.channels.cache.get(interaction.channelId).send(`Creaste una nueva entrada. Usa ?show+notes , ?show+tasks o ?show+all para ver las notas y tareas.\nUsa ?help para mostrar información acerca de notes.`);
        }catch(e){
            console.error(e);
            return;
        }
    },
    __help: async (interaction) => {
        for(item of servernotes){
            await interaction.guild.channels.cache.get(interaction.channelId).send(`${item}`);
            await wait(3000);
        }
    },
    __delete: async (interaction,title) =>{
        try{
            if(title == "all"){
                for(i of notes_and_tasks){
                    notes_and_tasks.shift();
                }
                for(i of notes_and_tasks){
                    notes_and_tasks.shift();
                }
                const newElement = {
                    type: "note",
                    title: `No hay notas disponibles. ${loopcampEmojis.acostaodepaneko}`,
                    content: "",
                    completed: null
                }
                notes_and_tasks.push(newElement);
            }else{
                for(item of notes_and_tasks){
                    if(!item.title == title) continue;
                    if(item.title == title){
                        notes_and_tasks.splice(notes_and_tasks.indexOf(item),1);
                        await interaction.guild.channels.cache.get(interaction.channelId).send(`Se ha borrado la nota exitosamente. ${loopcampEmojis.acostaodepaneko}`);
                        break;
                    }
                }
            }
        }catch(e){
            console.error(e);
            return;
        }
    },
    __completed: async(interaction,task)=>{
        try{
            for(item of notes_and_tasks){
                if(!item.title == task) continue;
                if(item.title == task){
                    item.completed = true;
                    await interaction.guild.channels.cache.get(interaction.channelId).send(`Se ha marcado como completada la tarea. ¡Bien hecho! ${loopcampEmojis.eatpaneko}`);
                    break;
                }
            }

        }catch(e){
            console.error(e);
            return;
        }
    },
    __read: async (interaction, type) =>{
        try{
            switch(type){
                case 'notes':
                    for (note of notes_and_tasks){
                        if(note.type != 'note') continue;
                        await interaction.guild.channels.cache.get(interaction.channelId).send(`***- ${note.title}***\n${note.content}\n\n`);
                    }
                    await wait(3000);
                    break;
                case 'tasks':
                    for (task of notes_and_tasks){
                        if(task.type != 'task') continue;

                        if(task.completed === false){
                            await interaction.guild.channels.cache.get(interaction.channelId).send(`- ${task.title}\n\n`);
                        }else if(task.completed === true){
                            await interaction.guild.channels.cache.get(interaction.channelId).send(`~~- ${task.title}~~\n\n`);
                        }
                        await wait(3000);
                    }
                    break;
                case 'all':
                    for (item of notes_and_tasks){
                        if(item.type == 'note'){
                            await interaction.guild.channels.cache.get(interaction.channelId).send(`***- ${item.title}***\n${item.content}\n\n`);
                        }else if(item.type == 'task'){
                            if(item.completed === false){
                                await interaction.guild.channels.cache.get(interaction.channelId).send(`- ${item.title}\n\n`);
                            }else if(item.completed === true){
                                await interaction.guild.channels.cache.get(interaction.channelId).send(`~~- ${item.title}~~\n\n`);
                            }   
                        }
                        await wait(3000);
                    }
                    break;
            }
        }catch(e){
            console.error(e);
            return;
        }

    }
}