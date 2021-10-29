require('dotenv').config()
const Discord = require("discord.js")
const commandHandler = require("./commands/commands")

///////////////////////////////////////////////////////////////////////////////////////////////////
// 
// BOT LINK
// 
// https://discord.com/api/oauth2/authorize?client_id=898450001385127946&permissions=3072&scope=bot
//
///////////////////////////////////////////////////////////////////////////////////////////////////

const TOKEN = process.env.TOKEN

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] })
client.login(TOKEN)

client.on("ready", botReady)
client.on("messageCreate", getMessage)

async function botReady(){
    const date = new Date();
    console.log(`[Logs @${date.toUTCString()}] ${client.user.username} has connected to Discord\n`);
}

async function getMessage(message){
    if(message.author.bot) return
    else{
        commandHandler(message);
    }
}