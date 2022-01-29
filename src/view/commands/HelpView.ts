import { Message } from "discord.js";
import { iAudioCommand, iTextCommand } from "src/interfaces/iCommand";
import { Bot } from "../../controller/Bot";

export class HelpView {
    static sendHelp(message: Message, audioCommands: iAudioCommand[], textCommands: iTextCommand[]) {
        let audioHelp: string = ""
        for (const command of audioCommands) {
            audioHelp += command.command + " : " + command.comment + "\n"
        }
        let textHelp: string = ""
        for (const command of textCommands) {
            textHelp += command.command + " : " + command.comment + "\n"
        }
        message.channel.send({
            embed: {
                color: 3447003,
                author: {
                    name: process.env.BOT_NAME,
                    icon_url: process.env.ICON_PATH
                },
                title: "All commands",
                fields: [
                    {
                        name: "Management",
                        value: "!help : Display all commands \n !join : Makes the bot join your audio channel \n !stop : Makes the bot leave your audio channel"
                    },
                    {
                        name: "Text",
                        value: textHelp
                    },
                    {
                        name: "Audio",
                        value: audioHelp
                    },

                ],
                timestamp: new Date(),
                footer: {
                    text: "Bot Owner : " + process.env.BOT_OWNER
                }
            }
        }).then();
    }
}
module.exports = HelpView;