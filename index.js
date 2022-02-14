var twit = require("twit");
var lastId = ''

require("dotenv").config();

const Bot = new twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
})

function BotInit() {
    var query = {
        q: "odeio java",
        result_type: "recent"
    };

    Bot.get("search/tweets", query, BotGotLatestTweet);

    function BotGotLatestTweet(error, data, response) {
        if (error) {
            console.log("deu erro F")
        } else {
            if (lastId != data.statuses[0].id_str) {
                data.statuses.forEach(tweet => {
                    var id = {
                        id: tweet.id_str,
                    };
                    
                     if (tweet.text.toLowerCase().indexOf("java") !== -1 && tweet.text.toLowerCase().indexOf("odeio") !== -1) {
                         let javas = tweet.text.toLowerCase().match(/java/g).length
                         let scripts = javas-1
                         if(tweet.text.toLowerCase().includes("script"))
                         scripts = tweet.text.toLowerCase().match(/script/g).length
                         var minecraftStuff = false

                         if(tweet.text.toLowerCase().includes("mojang") || tweet.text.toLowerCase().includes("edition") || tweet.text.toLowerCase().includes("mine")){
                            minecraftStuff = true
                         }
                    
                         if(scripts<javas && !minecraftStuff){
                            Bot.post("statuses/retweet/:id", id,(error, response) => {
                                if (error) {
                                    console.log(" ninguem esta passando raiva com java =) " + error)
                                } else {
                                    Bot.post("favorites/create", id)
                                    console.log("dei a curtida la ")
                                }
                            });
                         }else{
                            if(minecraftStuff)
                            console.log("Minecraft stuff")
                            else
                            console.log("js stuff")
                         }

                         }
                        
                });
                
                lastId = data.statuses[0].id_str
            }else{
                console.log('ja dei rt nesse tweet')
            }

            

        }

    }
}

setInterval(BotInit, 1 * 60 * 700);
BotInit();