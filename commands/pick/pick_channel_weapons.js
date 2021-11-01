const utils = require("../../utils.js");
const fs = require("fs");
const { randomInt } = require("crypto");
const valoData= JSON.parse(fs.readFileSync("data.json"))

async function command(msg, args) {
    let argsDict = utils.manage_arguments(args)

    let author = msg.member
    let vchannelId = author.voice.channelId
    if(!vchannelId){
        return await utils.send(msg, {content: "You are not in a voice channel"})
    }

    let channel = msg.guild.channels.cache.get(vchannelId)
    let nbMembers = channel.members.size.toString()

    let nbWeapons = isNaN(parseInt(args[0])) ? 1 : parseInt(args[0])
    let filters = argsDict["-f"] || ""
    let repeat = argsDict["--repeat"] || false

    let weaponsJson = valoData["weapons"]
    let weapons = Object.keys(weaponsJson)

    let avaiWeapons = []
    for (let agent of weapons){
        for (let filter of filters.split(",")){
            if (agent.toLowerCase().includes(filter.toLowerCase()) || weaponsJson[agent].toLowerCase().includes(filter.toLowerCase())){
                avaiWeapons.push(agent)
            }
        }
    }

    let toShuffle = avaiWeapons
    if (toShuffle.length == 0){
        return await utils.send(msg, {content: 'Error: no agent found with those filters'})
    }

    if (repeat){
        for (let i=0; i<(nbWeapons*nbMembers)-1; i++){
            toShuffle = toShuffle.concat(avaiWeapons)
        }
    }

    if (nbWeapons*nbMembers > toShuffle.length){
        return await utils.send(msg, {content: "Error: not enough weapons available, please consider using the --repeat option"})
    }

    let shuffled = toShuffle.sort(() => 0.5 - Math.random());
    let retWeapons = shuffled.slice(0, (nbWeapons*nbMembers))

    let s = []
    let i = 0
    for (let memberArr of channel.members){
        let member = memberArr[1]
        s.push(`<@${member.id}>: ${retWeapons.slice(i*nbWeapons, (i+1)*nbWeapons).join(', ')}`)
        i++
    }

    await utils.send(msg, {content: s.join("\n")})
}

module.exports = async function (msg, args){
    await command(msg, args)
}
