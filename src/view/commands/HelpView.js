class HelpView{
    static sendHelp(message,bot){
        message.channel.send({
            embed: {
                color: 3447003,
                author: {
                    name: "Lucas",
                    icon_url: "https://media.discordapp.net/attachments/675318777113608199/780429706755178516/cozeau.png"
                },
                title: "Commandes memebot",
                fields: [{
                    name: "Texte",
                    value: "" + bot.textMSG
                },
                    {
                        name: "Audio",
                        value: "" + bot.audioMSG
                    },
                    {
                        name: "Autres",
                        value: "!help : Affiche l'aide \n !join : Fait rejoindre le bot dans ton channel audio \n !stop : Déconnecte le bot de son channel audio  \n !kick nomJoueur : Kick le joueur du channel vocal si bous avez gagné un jeu."
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: "© par Lucas Gazeau"
                }
            }
        }).then();
    }
}
module.exports = HelpView;