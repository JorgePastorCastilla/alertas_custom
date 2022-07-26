        env = JSON.parse(data)[0]
        twitchAuth = env.twitchAuth;
        clientId = env.clientId;
        username = env.TWITCHUSER;



        ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
            if( flags.broadcaster && command === "test" ) {
                console.log( "!test was typed in chat" );
            }
        }
        console.log("username: "+username);
        console.log("clientId: "+clientId);
        console.log("twitchAuth: "+twitchAuth);
        ComfyJS.Init( username );

        ComfyJS.Init( username, twitchAuth );
        (async () => {
            let channelRewards = await ComfyJS.GetChannelRewards( clientId, false);
            console.log( channelRewards );
        })();
        
        ComfyJS.onReward = ( user, reward, cost, message, extra ) => {
            console.log( user + " redeemed " + reward + " for " + cost );
            switch (reward) {
                case "Lurk":
                    // document.getElementById('mireproductor').play();
                    console.log("funca");
                    break;
            
                default:
                    break;
            }
        }