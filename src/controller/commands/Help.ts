import { Message } from "discord.js";
import { Bot } from "../Bot";
import { HelpView } from "../../view/commands/HelpView";

export class Help{
    static run(message : Message) {
        const bot : Bot = Bot.getInstance()
        HelpView.sendHelp(message, bot.audioCommands, bot.textCommands);
    }
}