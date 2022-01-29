import { Message } from "discord.js";
import { Bot } from "../Bot";
const HelpView = require("../../view/commands/HelpView.ts");

export class Help {
    static run(message : Message) {
        let bot : Bot = Bot.getInstance()
        HelpView.sendHelp(message, bot.audioCommands, bot.textCommands);
    }
}