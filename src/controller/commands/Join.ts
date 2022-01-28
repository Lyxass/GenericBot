import { Message } from "discord.js";
import { Bot } from "../Bot";

export class Join {
    static run(message : Message) {
        Bot.getInstance().joinAudio(message);
    }
}