// This function grabs GET variables (better known as query variables)
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }

    return(false);
}

// Set up twitch embed
function twitchStreamSetup(twitch_channel) {
    // Create parent object
    var flash_object = document.createElement("object");
    flash_object.type = "application/x-shockwave-flash";
    flash_object.id = "live_embed_player_flash";
    flash_object.bgcolor = "#000000";
    flash_object.data = "http://www.twitch.tv/widgets/live_embed_player.swf?channel=" + twitch_channel;

    // Create parameter objects
    var param1 = document.createElement("param");
    param1.name = "allowFullScreen";
    param1.value = "true";

    var param2 = document.createElement("param");
    param2.name = "allowScriptAccess";
    param2.value = "always";

    var param3 = document.createElement("param");
    param3.name = "movie";
    param3.value = "http://www.twitch.tv/widgets/live_embed_player.swf";

    var param4 = document.createElement("param");
    param4.name = "flashvars";
    param4.value = "hostname=www.twitch.tv&channel=" + twitch_channel + "&auto_play=true&start_volume=50";

    // Append parameters to object
    flash_object.appendChild(param1);
    flash_object.appendChild(param2);
    flash_object.appendChild(param3);
    flash_object.appendChild(param4);

    // Append object to body
    document.getElementById("video").appendChild(flash_object);
}

// Set up Hitbox stream
function hitboxStreamSetup(hitbox_channel) {
    var hitboxFrame = document.createElement("iframe");
    hitboxFrame.src = "http://hitbox.tv/#!/embed/" + hitbox_channel;
    hitboxFrame.setAttribute("allowfullscreen", "");

    document.getElementById("video").appendChild(hitboxFrame);
}

// Loads up everything with the right channel information
function load(twitch_channel, hitbox_channel, stream_source) {

    // Set up chats
    document.getElementById("chat_embed").src = "http://twitch.tv/chat/embed?channel=" + twitch_channel + "&popout_chat=true";
    document.getElementById("hitbox_chat").src = "http://www.hitbox.tv/embedchat/" + hitbox_channel;

    if (stream_source == "twitch") {
        // Set up Twitch stream
        twitchStreamSetup(twitch_channel);
        document.title = "TwitchBox | " + twitch_channel;
        document.getElementsByName("twitch_choice")[0].setAttribute("selected", "");
    } else if (stream_source == "hitbox") {
        // Set up Hitbox stream
        hitboxStreamSetup(hitbox_channel);
        document.title = "TwitchBox | " + hitbox_channel;
        document.getElementsByName("hitbox_choice")[0].setAttribute("selected", "");
    }

    // Set up menubar
    if (twitch_channel && hitbox_channel) {
        document.getElementsByName("twitch")[0].value = twitch_channel;
        document.getElementsByName("hitbox")[0].value = hitbox_channel;
    }

} 

// Grab the query variables and use those to set up everythng
load(getQueryVariable("twitch"), getQueryVariable("hitbox"), getQueryVariable("source"));
