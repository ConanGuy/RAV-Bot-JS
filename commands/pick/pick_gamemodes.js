const utils = require("../../utils.js");
const fs = require("fs");
const { randomInt } = require("crypto");
const valoData= JSON.parse(fs.readFileSync("data.json"))

async function command(msg, args) {
    let argsDict = utils.manage_arguments(args)

    let nbGamemodes = isNaN(parseInt(args[0])) ? 1 : parseInt(args[0])
    let filters = argsDict["-f"] || ""
    let repeat = argsDict["--repeat"] || false

    let gamemodes = valoData["gamemodes"]

    let avaiGamemodes = []
    for (let gamemode of gamemodes){
        for (let filter of filters.split(",")){
            if (gamemode.toLowerCase().includes(filter.toLowerCase())){
                avaiGamemodes.push(gamemode)
            }
        }
    }

    let toShuffle = avaiGamemodes
    if (toShuffle.length == 0){
        return await utils.send(msg, {content: 'Error: no gamemode found with those filters'})
    }

    if (repeat){
        for (let i=0; i<nbGamemodes-1; i++){
            toShuffle = toShuffle.concat(avaiGamemodes)
        }
    }

    if (nbGamemodes > toShuffle.length){
        return await utils.send(msg, {content: "Error: not enough gamemodes available, please consider using the --repeat option"})
    }

    let shuffled = toShuffle.sort(() => 0.5 - Math.random());
    await utils.send(msg, {content: shuffled.slice(0, nbGamemodes).join(", ")})
}

module.exports = async function (msg, args){
    await command(msg, args)
}
