
const BotView = require("../view/BotView.ts");
let _audioCommands = require("../../audio.json");
let _textCommands = require("../../text.json");
const path = require('path')
import { iCommand, iAudioCommand, iTextCommand } from "src/interfaces/iCommand";
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

    private _currentVoiceChannel: VoiceChannel | null | undefined;
    private _currentGame: undefined;

    private _audioCommands: iAudioCommand[]
    private _textCommands: iTextCommand[]
    private _audioURL: string

    private _playerVolume : number = 1

    private constructor(public client: Client) {

        this._currentVoiceChannel = null;
        this._currentGame = undefined;

        this._audioCommands = _audioCommands;
        this._textCommands = _textCommands;

        this._audioURL = process.env.AUDIO_PATH || path.resolve(__dirname, "../../audio");

        if(process.env.VOLUME !== undefined){
            this._playerVolume = parseFloat(process.env.VOLUME)
        }

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
        this._currentVoiceChannel = message?.member?.voice?.channel;
        if (!this._currentVoiceChannel) {
            return BotView.notInChannelError(message);
        }
        return this._currentVoiceChannel.join();
    }

    public leaveAudio() {
        if (!(this._currentVoiceChannel === undefined || this._currentVoiceChannel === null)) {
            this._currentVoiceChannel.leave();
            this._currentVoiceChannel = undefined;
        }
    }

    private processMessage(message: Message) {
        if (message.author.bot) {
            return;
        }
        let msg: string = message.content.toLowerCase();
        console.log(stringToCommand);

        for (let commandString in stringToCommand) {
            if (msg.startsWith(process.env.CHARACTER_FOR_COMMAND + commandString)) {
                stringToCommand[commandString](message);
                return;
            }
        }

        /*Treat audio or text*/
        this.processMusicAndText(msg, this._audioCommands, true, message)
        this.processMusicAndText(msg, this._textCommands, false, message)
    }

    private processMusicAndText(msgStr: string, commands: iCommand[], isMusic: boolean, message: Message) {
        for (let command of commands) {
            let commandString: string = command.command.trim().toLowerCase()
            if (command.useSpecialChar) {
                commandString = process.env.CHARACTER_FOR_COMMAND + commandString
            }
            if (command.triggerInt === 0) {
                if (msgStr.startsWith(commandString)) {
                    this.response(command,message,isMusic);
                }
            } else if (command.triggerInt === 1) {
                if (msgStr.indexOf(commandString) >= 0) {
                    this.response(command,message,isMusic);
                }
            } else if (command.triggerInt === 2) {
                if (msgStr.endsWith(commandString)) {
                    this.response(command,message,isMusic);
                }
            }
        }
        return false
    }


    public playMusic(music: string, message: Message) {
        this.joinAudio(message).then((connection) => {
            console.log(this._audioURL + "/" + music)
            const dispatcher = connection.play(this._audioURL + "/" + music, { volume: this._playerVolume });
            dispatcher.on("speaking", () => { });
        }).catch((err) => {
            console.error("Can't join audio channel", err);
        })
    }

    public response(command: iCommand, message: Message, isMusic: Boolean) {
        console.log(command, isMusic)
        if (isMusic) {
            this.playMusic((command as iAudioCommand).path, message)
            return true;
        }
        else {
            message.channel.send((command as iTextCommand).message);
            return true;
        }
    }

    public get audioCommands() : iAudioCommand[]{
        return this._audioCommands
    }

    public get textCommands() : iTextCommand[]{
        return this._textCommands
    }

}
