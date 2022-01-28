import { Message } from "discord.js";
import { Bot } from "../Bot";

export class Stop {
    static run(message : Message) {
        let bot = Bot.getInstance().leaveAudio()        
    }
}