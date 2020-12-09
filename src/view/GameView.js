class GameView{
    static sendQuestion = function (message,bot,callback){
        message.channel.send( {
            embed: {
                color: 3447003,
                title: bot.currentGame.question,
                fields: [
                    {
                        name: "Reponses : ",
                        value: ":one: " + bot.currentGame.answer[0] + "\n" +
                            ":two: " + bot.currentGame.answer[1] + "\n" +
                            ":three: " + bot.currentGame.answer[2] + "\n" +
                            ":four: " + bot.currentGame.answer[3]
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: "© par Lucas Gazeau"
                }
            }
        }).then(msg => {
            callback(msg);
        });
    }

    static congratMessage = function (message,bot,user){
        bot.currentGame.getMessage().channel.send("Congratulation " + user.username + " The answer was : " + bot.currentGame.getAnswer() + ".");
    }
}
module.exports = GameView;