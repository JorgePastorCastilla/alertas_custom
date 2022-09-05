        // Recogemos las variables de entorno y las asignamos
        env = JSON.parse(data)[0]
        twitchAuth = env.twitchAuth;
        clientId = env.clientId;
        username = env.TWITCHUSER;

        // Esta funcion sirve para borrar el video del DOM
        function borrar_video(video) {
            // TODO: Añadir animacion fadeout
            video.remove();
          }

        //   Esta funcion lo que hace es crear un nuevo elemento video en el DOM
        function mostrar_video(url_video){
            // Creamos el elemento video
            video = document.createElement('video');
            
            // Incrementamos el counter y lo añadimos al ID para que todos los videos tengan un identificador distinto
            counter++;
            video.setAttribute("id","minireproductor-"+counter);
            
            // Le asignamos que 
            video.src = url_video;
            
            // Ocultamos los controles del video(botones, barra de progreso, ...)
            video.controls = false;
            
            // Asignamos false a muted, ya que queremos que se escuche el video y le asignamos un volumen
            video.muted = false;
            video.volume = 0.1; //En mi caso 0.1 porque se escuchan muy fuerte

            // metemos el elemento dentro del contenedor
            container.appendChild(video);
            // Añadimos evento para que cuando acabe de reproducirse el video se elimine
            video.onended = function(e){
                borrar_video(this);
            };
            // Reproducimos el video
            video.play();
        }

        // ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
        //     if( flags.broadcaster && command === "test" ) {
        //         console.log( "!test was typed in chat" );
        //     }
        // }
        // ComfyJS.Init( username );

        // Abrimos la conexion con twitch
        ComfyJS.Init( username, twitchAuth );
        (async () => {
            let channelRewards = await ComfyJS.GetChannelRewards( clientId, false);
            console.log( channelRewards );
        })();
        
        // Escuchamos los canjeos de recompensas del canal
        ComfyJS.onReward = ( user, reward, cost, message, extra ) => {
            // TODO: Actualmente solo funciona con videos en local, no funciona con videos de youtube
            /*
            Hacemos todos los casos llamando a la funcion que queramos dependiendo de la recompensa,
            en este caso la recompensa "EXAMPLE" llama a la funcion mostrar_video,
            la recompensa "Lurk" llama a la funcion mostrar_video indicandole una ruta de un archivo local,
            y el resto muestran por consola el texto "Default case"
            */
            switch (reward) {
                case "Lurk":
                    mostrar_video("./memes/Yeeha.mp4");
                    break;
                case "EXAMPLE":
                    mostrar_video("URL");
                    break;
                default:
                    console.log("Default case");
                    break;
            }
        }