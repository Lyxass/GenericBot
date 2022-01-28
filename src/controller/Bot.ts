
const BotView = require("../view/BotView.ts");
let audioCommand = require("../../audio.json");
let textCommand = require("../../audio.json");
const path = require('path')

import { Client, Message, VoiceChannel } from "discord.js";
const stringToCommand = require("./commands/Commands.ts").stringToCommand;

export class Bot {

    static instance: Bot | undefined = undefined

    static getInstance(): Bot {
        if (Bot.instance === undefined) {
            let client: Client = new Client();
            Bot.instance = new Bot(client)
        }
        return Bot.instance
    }

    private currentVoiceChannel: VoiceChannel | null | undefined;
    private currentGame: undefined;

    private audioCommand: [string,string,number,Boolean][]
    private textCommand: [string,string,number,Boolean][]
    private audioURL : string

    private constructor(public client: Client) {

        this.currentVoiceChannel = null;
        this.currentGame = undefined;

        this.audioCommand  = audioCommand;
        this.textCommand = textCommand;

        this.audioURL = process.env.AUDIO_PATH || path.resolve(__dirname, "../../audio");

        this.client.on("ready", () => {
            //Bot.init(bot);
            if (this.client.user !== null) {
                this.client.user.setActivity(process.env.CHARACTER_FOR_COMMAND + 'help', { type: 'WATCHING' }).then()
            }
            else {
                console.error("Can't set activity, client.user is null")
            }
        });

        this.client.on("message", (message: Message) => {
            this.processMessage(message)
        });

        this.client.login(process.env.TOKEN).then(() => {
            console.log("Started")
        });
    }

    public async joinAudio(message: Message) {
        this.currentVoiceChannel = message?.member?.voice?.channel;
        if (!this.currentVoiceChannel) {
            return BotView.notInChannelError(message);
        }
        return this.currentVoiceChannel.join();
    }

    public leaveAudio() {
        if (!(this.currentVoiceChannel === undefined || this.currentVoiceChannel === null)) {
            this.currentVoiceChannel.leave();
            this.currentVoiceChannel = undefined;
        }
    }



    private processMessage(message: Message) {
        if (message.author.bot) {
            return;
        }
        let msg: string = message.content.toLowerCase();
        console.log(stringToCommand);
        
        for (let commandString in stringToCommand) {
            console.log(commandString)
            console.log(process.env.CHARACTER_FOR_COMMAND + commandString)
            console.log(msg.startsWith(process.env.CHARACTER_FOR_COMMAND + commandString))

            if (msg.startsWith(process.env.CHARACTER_FOR_COMMAND + commandString)) {
                stringToCommand[commandString](message);
                return;
            }
        }

        /*Treat audio or text*/
        let allCommand : [string,string,number,Boolean][][]= [this.audioCommand, this.textCommand]
        for (let i = 0; i < allCommand.length; i++) {
            for (let command of allCommand[i]) {
                let commandString : string = command[0].trim().toLowerCase()
                let functionToCheck : number = command[2]
                let useSpecialCharacter = command[3]
                if(useSpecialCharacter){
                    commandString = process.env.CHARACTER_FOR_COMMAND + commandString
                }
                let isMusic : Boolean = i == 0
                if (functionToCheck === 0) {
                    if (msg.startsWith(commandString)) {
                        this.response(command[1], message, isMusic)
                        return;
                    }
                } else if (functionToCheck === 1) {
                    if (msg.indexOf(commandString) >= 0) {
                        this.response(command[1], message, isMusic)
                        return;

                    }
                } else if (functionToCheck === 2) {
                    if (msg.endsWith(commandString)) {
                        this.response(command[1], message, isMusic)
                        return;
                    }
                }
            }
        } 
    }


    public playMusic(music : string, message : Message){
        this.joinAudio(message).then((connection)=>{
            console.log(this.audioURL +"/"+ music)
            const dispatcher = connection.play(this.audioURL +"/"+ music, { volume: 0.5 });
            dispatcher.on("speaking",()=>{});
        }).catch((err)=>{
            console.error("Can't join audio channel",err);
        })
    }

    public response(pathOrMessage : string,message : Message, isMusic : Boolean){
        if(isMusic){
            this.playMusic(pathOrMessage, message)
        }else{
            message.channel.send(pathOrMessage);

        }

    }
}
