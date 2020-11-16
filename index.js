var twit = require("twit");

require("dotenv").config();

const Bot = new twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60*1000,
})

function BotInit(){
    var query = {
        q: "odeio java",
        result_type: "recent",
    };

    Bot.get("search/tweets",query,BotGotLatestTweet);

    function BotGotLatestTweet(error,data,response){
        if(error){
            console.log("deu merda java ganhou :,(");
        }else{
            var id = {
                id: data.statuses[0].id_str,
            };
        }

        Bot.post("statuses/retweet/:id",id, BotRetweet);

        function BotRetweet(error, response){
            if(error){
                console.log("ninguem esta passando raiva com java =) "+error)
            }else{
                console.log("bot deu rt "+id.id)
                Bot.post("favorites/create",id)
            }
        }

    }
}

setInterval(BotInit, 1* 60 * 900);
BotInit();