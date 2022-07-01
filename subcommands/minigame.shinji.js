/*
*****
***** ShinjiMessageInteractions
*****
***** prefix { . }
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
const { balance, work, jobs, players } = require('../JSON/minigame.json');
const { loopcampEmojis } = require('../JSON/loopcamp.json');

module.exports.minigame = {
    __catto : (user, money) =>{
      try{
        if(!isNaN(money) && money >= 0){
          for (player of players){
            if(!player.id == user.id){
                continue;
            }else if(player.id == user.id){
                player.balance += money;
                break;
            }
          }
        }
      }catch(e){
        console.error(e);
        return;
      }

    },
    __verifyAndCreate : user =>{
      try{
        let createPlayer = true;
        for (player of players){
            if(player.id == user.id) createPlayer = false;
        }
        if(createPlayer){
            const newPlayer = {
                name: user.username,
                balance: balance,
                protection: false,
                role: "player",
                id: user.id
            }
    
            players.push(newPlayer);
        }
      }catch(e){
        console.error(e);
        return;
      }

    },
    __protectPlayer : user =>{
        try{
            for (player of players){
                if(!player.id == user.id){
                    continue;
                }else if(player.id == user.id){
                    player.protection = true;
                    break;
                }
            }
        }catch(e){
            console.error(e);
            return;
        }
    },
    __work : interaction =>{
        try{
            const index = Math.floor(Math.random()*jobs.length);
            for (player of players){
                if(!player.id == interaction.author.id){
                    continue;
                }else if(player.id == interaction.author.id){
                    interaction.guild.channels.cache.get(interaction.channelId).send(`${interaction.author}: ${jobs[index]} Ganaste ${work} monedas. ${loopcampEmojis.drinkpaneko}`);       
                    player.balance += work;
                    player.protection = false;
                    break;
                }
          }
        }catch(e){ 
          console.error(e);
          return;
        }
    },
    __buy : async (interaction, role) =>{
        try{
            const programador = interaction.guild.roles.cache.find(role => role.name === "informático"); 
            const obrero = interaction.guild.roles.cache.find(role => role.name === "obrero");
            const granjero = interaction.guild.roles.cache.find(role => role.name === "granjero");
            const player = players.find(user => user.id === interaction.author.id);
            const user = interaction.guild.members.cache.find(member => member.id === player.id);
            console.log(player);
            if (!programador && !obrero && !granjero) {
              await interaction.guild.channels.cache.get(interaction.channelId).send(`${interaction.author}, solicita a uno de tus administradores crear los roles informático, obrero y granjero para poder habilitar esta opción. ${loopcampEmojis.idkpaneko}`); 
              return;
            }
            await interaction.guild.channels.cache.get(interaction.channelId).send(`${interaction.author}, recuerda que cualquiera de los roles tiene un costo de $1000 monedas.\nSi no tiene esa cantidad, su compra será automáticamente cancelada. ${loopcampEmojis.idkpaneko}`); 
            await wait(2000);
    
            if(player.balance >= 1000){
                if(role == "programador"){
                    user.roles.add(programador);
                    await interaction.guild.channels.cache.get(interaction.channelId).send(`${interaction.author}, acabas de adquirir el rol: informático. ${loopcampEmojis.fuckcat}`);
                    player.balance -= 1000;
                    player.role = 'informatico';
                }else if(role == "obrero"){
                    user.roles.add(obrero);
                    interaction.guild.channels.cache.get(interaction.channelId).send(`${interaction.author}, acabas de adquirir el rol: obrero. ${loopcampEmojis.fuckcat}`);
                    player.balance -= 1000;
                    player.role = 'obrero';
                }else if(role == "granjero"){
                    user.roles.add(granjero);
                    interaction.guild.channels.cache.get(interaction.channelId).send(`${interaction.author}, acabas de adquirir el rol: granjero. ${loopcampEmojis.fuckcat}`);
                    player.balance -= 1000;
                    player.role = 'granjero';
                }
            }
        }catch(e){
          console.error(e);
          return;
        }
    },
    __admin : interaction =>{
        try{
            for (player of players){
              if(!player.id == interaction.author.id){
                continue;
              }else if(player.id == interaction.author.id){
                interaction.guild.channels.cache.get(interaction.channelId).send(`Qué tal, admin. Toma 9999 monedas. ${loopcampEmojis.hellopaneko}`);       
                player.balance += 9999;
                player.protection = false;
                (player.role ==='superadmin') ? player.role = 'superadmin' : player.role = 'admin';
                break;
              }
            }
          }catch(e){ 
            console.error(e);
            return;
          }
    },
    __superadmin : interaction =>{
      try{
          for (player of players){
            if(!player.id == interaction.author.id){
              continue;
            }else if(player.id == interaction.author.id){
              interaction.guild.channels.cache.get(interaction.channelId).send(`Qué tal, admin. Toma 1000000000 monedas. ${loopcampEmojis.lovepaneko}`);       
              player.balance += 1000000000;
              player.protection = false;
              player.role = 'superadmin';
              break;
            }
          }
      }catch(e){ 
        console.error(e);
        return;
      }
    },
    __poker : async (interaction, game, money) =>{
      try{
        console.log(game, money);
        if(!isNaN(money) || !isNaN(game)){
          if(game <= 0 || money <= 0) return;
          
          const playergame = players.find(user => user.id === interaction.author.id);
          const cardHand = Math.floor(Math.random()*(game+1));
          const playerHand = Math.floor(Math.random()*(game+1));

          if(playergame.balance < money) return;

          await interaction.guild.channels.cache.get(interaction.channelId).send(`Bienvenido al casino, ${interaction.author}. Seleccionaste jugar póker ${game}. ${loopcampEmojis.idkpaneko}`);
          await wait(2000);

          await interaction.guild.channels.cache.get(interaction.channelId).send(`Tu mano suma ${playerHand}. Mucha suerte.`);
          await wait(5000);

          if(playerHand > cardHand){
            await interaction.guild.channels.cache.get(interaction.channelId).send(`Felicidades ${interaction.author}, ganaste ${money*2}. ${loopcampEmojis.fuckcat}`);
            for (player of players){
                if(!player.id == interaction.author.id){
                  continue;
                }else if(player.id == interaction.author.id){       
                  player.balance += (money);
                  player.protection = false;
                  break;
                }
            }
          }else{
            await interaction.guild.channels.cache.get(interaction.channelId).send(`${interaction.author}, perdiste. Inténtalo nuevamente. ${loopcampEmojis.fpaneko}`);
            for (player of players){
                if(!player.id == interaction.author.id){
                  continue;
                }else if(player.id == interaction.author.id){       
                  player.balance -= (money);
                  player.protection = false;
                  break;
                }
            }
          }
          console.log(players);
        }
      }catch(e){
        console.error(e);
        return;
      }
    },
    __roller : async (interaction, number, count, money) =>{
      try{
        if(!isNaN(money) || !isNaN(count)  || !isNaN(number)){
          if(number <= 0 || money <= 0 || count <= 0) return;

          const numberSelected = Math.floor(Math.random()*(5*count))+count;
          const playergame = players.find(user => user.id === interaction.author.id);
          if(playergame.balance < money) return;

          await interaction.guild.channels.cache.get(interaction.channelId).send(`Bienvenido al casino, ${interaction.author}. Seleccionaste jugar a los dados. ${loopcampEmojis.idkpaneko}`);
          await wait(2000);

          await interaction.guild.channels.cache.get(interaction.channelId).send(`Escogiste ${number}, entre ${count} dados. Mucha suerte.`);
          await wait(5000);

          if(numberSelected === number){
              await interaction.guild.channels.cache.get(interaction.channelId).send(`Felicidades ${interaction.author}, ganaste ${money*count}. ${loopcampEmojis.fuckcat}`);
              for (player of players){
                  if(!player.id == interaction.author.id){
                    continue;
                  }else if(player.id == interaction.author.id){       
                    player.balance += (money*count);
                    player.protection = false;
                    break;
                  }
              }
          }else{
              await interaction.guild.channels.cache.get(interaction.channelId).send(`${interaction.author}, perdiste. Inténtalo nuevamente. ${loopcampEmojis.fpaneko}`);
              await interaction.guild.channels.cache.get(interaction.channelId).send(`El número ganador era ${numberSelected}, tu número era ${number}.`)
              for (player of players){
                  if(!player.id == interaction.author.id){
                    continue;
                  }else if(player.id == interaction.author.id){       
                    player.balance -= (money);
                    player.protection = false;
                    break;
                  }
              }
          }
          console.log(players);
        }
      }catch(e){
        console.error(e);
        return;
      }
    },
    __coinflip : async (interaction, coin, money) =>{
      try{
        if(!isNaN(money) && money >= 0){
          const playergame = players.find(user => user.id === interaction.author.id);
          if(playergame.balance < money) return;

          const coinf = Math.floor(Math.random()*2);
          await interaction.guild.channels.cache.get(interaction.channelId).send(`Bienvenido al casino, ${interaction.author}. Seleccionaste jugar a cara o sello. ${loopcampEmojis.idkpaneko}`);
          await wait(2000);
          await interaction.guild.channels.cache.get(interaction.channelId).send(`Escogiste ${coin}. Mucha suerte.`);
          await wait(5000);
          if(coinf == 0 && coin == 'cara'){
              await interaction.guild.channels.cache.get(interaction.channelId).send(`Felicidades ${interaction.author}, ganaste ${money}. ${loopcampEmojis.fuckcat}`);
              for (player of players){
                  if(!player.id == interaction.author.id){
                    continue;
                  }else if(player.id == interaction.author.id){       
                    player.balance += (money);
                    player.protection = false;
                    break;
                  }
              }
          }else if(coinf == 1 && coin == 'sello'){
            await interaction.guild.channels.cache.get(interaction.channelId).send(`Felicidades ${interaction.author}, ganaste ${money}. ${loopcampEmojis.fuckcat}`);
              for (player of players){
                  if(!player.id == interaction.author.id){
                    continue;
                  }else if(player.id == interaction.author.id){       
                    player.balance += (money);
                    player.protection = false;
                    break;
                  }
              }
          }else{
              await interaction.guild.channels.cache.get(interaction.channelId).send(`${interaction.author}, perdiste. Inténtalo nuevamente. ${loopcampEmojis.fpaneko}`);
              for (player of players){
                  if(!player.id == interaction.author.id){
                    continue;
                  }else if(player.id == interaction.author.id){       
                    player.balance -= (money);
                    player.protection = false;
                    break;
                  }
              }
          }
          console.log(players);
        }
      }catch(e){
        console.error(e);
        return;
      }
    }

}
