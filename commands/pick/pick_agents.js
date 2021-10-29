const utils = require("../../utils.js");
const fs = require("fs");
const { randomInt } = require("crypto");
const valoData= JSON.parse(fs.readFileSync("data.json"))

async function command(msg, args) {
    let argsDict = utils.manage_arguments(args)

    let nbAgents = isNaN(parseInt(args[0])) ? 1 : parseInt(args[0])
    let filters = argsDict["-f"] || ""
    let repeat = argsDict["--repeat"] || false

    let agentsJson = valoData["agents"]
    let agents = Object.keys(agentsJson)

    let avaiAgents = []
    for (let agent of agents){
        for (let filter of filters.split(",")){
            if (agent.toLowerCase().includes(filter.toLowerCase()) || agentsJson[agent].toLowerCase().includes(filter.toLowerCase())){
                avaiAgents.push(agent)
            }
        }
    }

    let toShuffle = avaiAgents
    if (toShuffle.length == 0){
        return await utils.send(msg, {content: 'Error: no agent found with those filters'})
    }

    if (repeat){
        for (let i=0; i<nbAgents-1; i++){
            toShuffle = toShuffle.concat(avaiAgents)
        }
    }

    if (nbAgents > toShuffle.length){
        return await utils.send(msg, {content: "Error: not enough agents available, please consider using the --repeat option"})
    }

    let shuffled = toShuffle.sort(() => 0.5 - Math.random());
    await utils.send(msg, {content: shuffled.slice(0, nbAgents).join(", ")})
}

module.exports = async function (msg, args){
    await command(msg, args)
}
