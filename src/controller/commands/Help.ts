import { Message } from "discord.js";
const HelpView = require("../../view/commands/HelpView.ts");

export class Help {
    static run(message : Message) {
        HelpView.sendHelp(message);
    }

}