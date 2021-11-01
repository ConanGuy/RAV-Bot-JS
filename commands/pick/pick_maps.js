const utils = require("../../utils.js");
const fs = require("fs");
const { randomInt } = require("crypto");
const valoData= JSON.parse(fs.readFileSync("data.json"))

async function command(msg, args) {
    let argsDict = utils.manage_arguments(args)

    let nbMaps = isNaN(parseInt(args[0])) ? 1 : parseInt(args[0])
    let filters = argsDict["-f"] || ""
    let repeat = argsDict["--repeat"] || false

    let maps = valoData["maps"]

    let avaiMaps = []
    for (let map of maps){
        for (let filter of filters.split(",")){
            if (map.toLowerCase().includes(filter.toLowerCase())){
                avaiMaps.push(map)
            }
        }
    }

    let toShuffle = avaiMaps
    if (toShuffle.length == 0){
        return await utils.send(msg, {content: 'Error: no map found with those filters'})
    }

    if (repeat){
        for (let i=0; i<nbMaps-1; i++){
            toShuffle = toShuffle.concat(avaiWeapons)
        }
    }

    if (nbMaps > toShuffle.length){
        return await utils.send(msg, {content: "Error: not enough maps available, please consider using the --repeat option"})
    }

    let shuffled = toShuffle.sort(() => 0.5 - Math.random());
    await utils.send(msg, {content: shuffled.slice(0, nbMaps).join(", ")})
}

module.exports = async function (msg, args){
    await command(msg, args)
}
