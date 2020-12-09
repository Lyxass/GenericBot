const GameClass = require("../Game.js")

class Game{
    constructor(message,bot) {
        GameClass.CreateGame(message, bot);
    }
}
module.exports = Game;