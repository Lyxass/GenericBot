class KickView{
    static noKickLeft = function (message,bot){
        message.channel.send("Bas alors " + message.author.username + " !? Faut gagner pour kick des gens ! Loser !")
    }

    static kickLeft = function (message,user,res){
        message.channel.send("<@!"+user.id + ">, tu peux encore kick " + res + " personne(s).");
    }
}
module.exports = KickView;