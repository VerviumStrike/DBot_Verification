//Requirements Importer
const Discord = require("discord.js")
const Client = new Discord.Client()

//Variables
var VerificationWords = ["hello", "hi", "notbot", "term", "service", "hmm", "ok"] //Don't add whitespace inside the word. For example: HI HELLo, Ja AF, HA
var VerificationTable = [] //The VT resets whenever the bot stop and started, so I recommend to host it 24/7.

var ServerName = "" //Place your server name inside the ""
var VerifySuccess = "Your Account has been successfully verified." //Place your message when the user successfully verified.
var VerificationChannelId = "" //Place your server verification channel ID inside the ""

//Main
//*Bot Ready Section
Client.on("ready", ()=>{
console.log(`==========================
    Bot Status: Online
==========================`)
})

//*Verification Section
Client.on("guildMemberAdd", (member)=>{
    var RandomWord = VerificationWords[Math.floor(Math.random() * (7 - 0) + 0)]
    var VerifyChannel = member.guild.channels.cache.find(ch => ch.id === VerificationChannelId)
    if(VerifyChannel){
        VerificationTable.push({ "id": member.id, "vcode": RandomWord })
        VerifyChannel.send(`<@${member.id}>, Welcome to ${ServerName}. Discord Server! To verify your Account. Please type "!verify ${RandomWord}"`)
    }else{
        console.log("[LOG]: in {guildMemberAdd} verification channel doesn't exist.")
    }
})

Client.on("message", (message)=>{
    if(message.content.indexOf("!verify") != -1 && message.channel.id === VerificationChannelId){
        for( vt in VerificationTable ){
            var userid = VerificationTable[vt].id
            var vcode = VerificationTable[vt].vcode
            if(message.author.id === userid){
                try{
                    var resultargs = message.content.split(" ")
                    var verificationcode = resultargs[1]

                    if(verificationcode === vcode){
                        message.reply(`<@${message.author.id}>. ${VerifySuccess}`)
                        delete VerificationTable[vt]
                        //*On Verified
                        //Place Your code here if the user is successfully verified.
                    }else{
                        message.reply(`<@${message.author.id}>, invalid Verification Code! Please type "!verify ${vcode}" to verify your Account.`)
                    }
                }catch{ return }
            }
        }
    }
})

//*Bot Login Section
Client.login("") //Place your discord bot token inside the "" and make sure SERVER MEMBERS INTENT is enabled!