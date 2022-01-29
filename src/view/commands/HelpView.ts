import { Message } from "discord.js";
import { iAudioCommand, iTextCommand } from "src/interfaces/iCommand";

export class HelpView {
    static sendHelp(message: Message, audioCommands: iAudioCommand[], textCommands: iTextCommand[]) {
        let audioHelp = ""
        for (const command of audioCommands) {
            const character =  command.useSpecialChar ? process.env.CHARACTER_FOR_COMMAND : ""
            audioHelp += character + command.command + " : " + command.comment + "\n"
        }
        let textHelp = ""
        for (const command of textCommands) {
            const character =  command.useSpecialChar ? process.env.CHARACTER_FOR_COMMAND : ""
            textHelp += character + command.command + " : " + command.comment + "\n"
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
                        value: process.env.CHARACTER_FOR_COMMAND+"help : Display all commands \n "+process.env.CHARACTER_FOR_COMMAND+"join : Makes the bot join your audio channel \n "+process.env.CHARACTER_FOR_COMMAND+"stop : Makes the bot leave your audio channel"
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
