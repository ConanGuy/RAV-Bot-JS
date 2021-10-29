const utils = require("../utils.js");

const help = require("./help.js")
const pick_agents = require("./pick/pick_agents.js")
const pick_weapons = require("./pick/pick_weapons.js")
const pick_maps = require("./pick/pick_maps.js")
const pick_gamemodes = require("./pick/pick_gamemodes.js")

require('dotenv').config();
const command_prefix = process.env.PREFIX.split(", ");

const commands = {
    help: help, h: help,

    pick_agents: pick_agents, pa: pick_agents,

    pick_weapons: pick_weapons, pw: pick_weapons,

    pick_maps: pick_maps, pm: pick_maps,

    pick_gamemodes: pick_gamemodes, pg: pick_gamemodes
}

module.exports = async function (msg){
    let tokens = msg.content.split(" ");
    let command = tokens.shift();

    // Check for the prefix in the command
    for(var prefix of command_prefix){

        // If the prefix has been found at the very beginning of the message
        if(command.indexOf(prefix) == 0){
            command = command.replace(prefix, "");
            
            // Check if the command is exists
            if(!(command in commands)){
                return;
            }

            // Execute the command
            await commands[command](msg, tokens);

            break;
        } 
    }
}