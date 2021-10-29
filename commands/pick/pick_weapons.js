const utils = require("../../utils.js");
const fs = require("fs");
const { randomInt } = require("crypto");
const valoData= JSON.parse(fs.readFileSync("data.json"))

async function command(msg, args) {
    let argsDict = utils.manage_arguments(args)

    let nbWeapons = isNaN(parseInt(args[0])) ? 1 : parseInt(args[0])
    let filters = argsDict["-f"] || ""
    let repeat = argsDict["--repeat"] || false

    let weaponsJson = valoData["weapons"]
    let weapons = Object.keys(weaponsJson)

    let avaiWeapons = []
    for (let weapon of weapons){
        for (let filter of filters.split(",")){
            if (weapon.toLowerCase().includes(filter.toLowerCase()) || weaponsJson[weapon].toLowerCase().includes(filter.toLowerCase())){
                avaiWeapons.push(weapon)
            }
        }
    }

    let toShuffle = avaiWeapons
    if (toShuffle.length == 0){
        return await utils.send(msg, {content: 'Error: no weapon found with those filters'})
    }

    if (repeat){
        for (let i=0; i<nbWeapons-1; i++){
            toShuffle = toShuffle.concat(avaiMaps)
        }
    }

    if (nbWeapons > toShuffle.length){
        return await utils.send(msg, {content: "Error: not enough weapons available, please consider using the --repeat option"})
    }

    let shuffled = toShuffle.sort(() => 0.5 - Math.random());
    await utils.send(msg, {content: shuffled.slice(0, nbWeapons).join(", ")})
}

module.exports = async function (msg, args){
    await command(msg, args)
}
