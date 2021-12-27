//imports dotenv to load api tokens etc.
require('dotenv').config()

//imports fs to run commands in other files
const fs = require('fs');

//imports and inits mojang api
const MojangAPI = require('mojang-promise-api');
const api = new MojangAPI();

//loads discord.js
const Discord = require('discord.js');

//creates a client instance
const client = new Discord.Client({ 
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

//make a collection (extention of js map) in client.commands
client.commands = new Discord.Collection;

//loads command files
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

//gets prefix so it doesn't have to be contantly loaded
const prefix = process.env.PREFIX;

client.once('ready', () => {
    console.log(`Bot is online @ ${client.user.tag}`)
});

client.on('messageCreate', (msg) => {
    //ignores if message doesn't start with the prefix, or if it is by a bot
    if(!msg.content.startsWith(prefix) || msg.author.bot ) return;

    //gets command arguements
    const args = msg.content.substring(prefix.length).split(' ');

    //removes command from args, and sets it to lowercase
    const command = args.shift().toLowerCase();

    if (command === 'uuid') {
        client.commands.get('uuid').execute(args, msg, Discord, api, process.env.COLOR);
    }

    if (command === 'history') {
        client.commands.get('history').execute(args, msg, Discord, api, process.env.COLOR);
    }
});

client.login(process.env.TOKEN);