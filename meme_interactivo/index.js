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
            // console.log( user + " redeemed " + reward + " for " + cost );
            switch (reward) {
                case "MEME cambiar titulo":
                    localStorage.setItem('titulo', message.substring(0, 24));
                    document.getElementById('titulo').innerHTML= localStorage.getItem('titulo');
                    break;
                case "MEME cambiar subtitulo":
                    localStorage.setItem('subtitulo', message.substring(0, 49));
                    document.getElementById('subtitulo').innerHTML= localStorage.getItem('subtitulo');
                    break;
                case "MEME cambiar imagen":
                    localStorage.setItem('inside_img', message);
                    document.getElementById("inside_img").src= localStorage.getItem('inside_img');
                    break;
                default:
                    break;
            }
        }