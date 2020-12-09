const UserDAO = require("./model/UserDAO.js");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


class Game {
    constructor(question, answer, rightAnswer) {
        this.question = question;
        this.answer = answer;
        this.rightAnswer = rightAnswer;
        this.playerAnswer = new Map();
        this.isEnd = false;
        this.playerWinner = null;

    }

    toString = function () {
        return {
            embed: {
                color: 3447003,
                title: this.question,
                fields: [
                    {
                        name: "Reponses : ",
                        value: ":one: " + this.answer[0] + "\n" +
                            ":two: " + this.answer[1] + "\n" +
                            ":three: " + this.answer[2] + "\n" +
                            ":four: " + this.answer[3]
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: "© par Lucas Gazeau"
                }
            }
        }
    }

    setPlayerAnswer = function (player, answerNumber,db) {
        if(!this.playerAnswer.has(player)){
            this.playerAnswer.set(player,answerNumber);
            if(this.checkAnswer(answerNumber)){
                this.isEnd = true;
                UserDAO.getNumberKickById(db,player,(err,res) =>{
                    UserDAO.setNumberKickById(db,player,res+1,(e,r)=>{
                    })
                })
                this.playerWinner = player;
            }
        }
    }

    checkAnswer = function(answerNumber){
        return this.answer[answerNumber] === this.rightAnswer;
    }

    isEnd = function () {
        return this.isEnd;
    }

    getMessage = function () {
        return this.message;
    }

    setMessage = function(msg){
        this.message = msg;
    }

    getPlayerWinner = function(){
        return this.playerWinner;
    }

    getAnswer = function(){
        return this.rightAnswer;
    }

    static _shuffle = function(array) {
        array.sort(() => Math.random() - 0.5);
    }

    static CreateGame = function(message,bot){
        var request = new XMLHttpRequest()
        request.open('GET', 'https://www.openquizzdb.org/api.php?key=DD4C57PARY&choice=4&categ=sciences');
        request.responseType = "json";
        request.send()
        request.onload = function () {
            try {
                let responseString = request.responseText;
                let res = JSON.parse(responseString);
                Game._shuffle(res.results[0].autres_choix);

                bot.currentGame = new Game(res.results[0].question, res.results[0].autres_choix, res.results[0].reponse_correcte);
                //message.channel.send("@everyone");
                message.channel.send(bot.currentGame.toString())
                    .then(msg => {
                        msg.react('\u0031\u20E3');
                        msg.react('\u0032\u20E3');
                        msg.react('\u0033\u20E3');
                        msg.react('\u0034\u20E3');
                        bot.currentGame.setMessage(msg);
                    });

            } catch (e) {
                message.channel.send("An error occured with the api");
            }


        }
    }

    checkAnswer = function(message,bot,reaction){
        if (bot.currentGame === undefined || message !== bot.currentGame.getMessage() || emoji.reaction.me) {
            return;
        }
        for (let cacheElement of reaction.users.cache) {
            if (!cacheElement[1].bot === true) {

                let nb = undefined;
                switch (reaction.emoji.name) {
                    case '1⃣':
                        nb = 0;
                        break;
                    case '2⃣':
                        nb = 1;
                        break;
                    case '3⃣':
                        nb = 2;
                        break;
                    case '4⃣':
                        nb = 3;
                        break;
                    default:
                        console.log("ERROR");
                        return;
                }
                bot.currentGame.setPlayerAnswer(cacheElement[0], nb, db);
                if (bot.currentGame.isEnd) {
                    bot.users.fetch(bot.currentGame.getPlayerWinner()).then(user => {
                        bot.currentGame.getMessage().channel.send("Congratulation " + user.username + " The answer was : " + bot.currentGame.getAnswer() + ".");
                        bot.currentGame = undefined;
                    })
                    return;
                }
            }

        }
    }

}

module.exports = Game;