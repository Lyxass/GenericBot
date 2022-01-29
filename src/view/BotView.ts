import { Message } from "discord.js";

export class BotView {
    static notInChannelError(message : Message) {
        message.reply('Please join a voice channel before using this command.');
    }

}
