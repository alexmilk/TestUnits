var CtvKaltura = {    
    sendKalturaPlayEvent: function(sessionId, video, playbackPosition) {
        var eventType = "PLAY";
        var url = CtvKaltura.buildKalturaStatsUrl(eventType, sessionId, video, playbackPosition);
        var options = {
            type: 'GET',
            context: this,
            url: url,
            cache: false,
            timeout: 3000,
            success: function() {
            }
        };
        
        console.log("PLAY Stats URL: " + url);
        
        // $.ajax(options);
    },
    
    sendKalturaPlayQuartileEvent: function(sessionId, video, playbackPosition, previousPosition) {
        var eventType = null;
    
        if(playbackPosition >= 0.25 && playbackPosition < 0.5) {
            if(previousPosition < 0.25) { 
                eventType = "PLAY_REACHED_25";
            }
        } else if(playbackPosition >= 0.5 && playbackPosition < 0.75) {
            if(previousPosition < 0.5) { 
                eventType = "PLAY_REACHED_50"; 
            }
        } else if(playbackPosition >= 0.75 && playbackPosition < 1.00) {
            if(previousPosition < 0.75) {
                eventType = "PLAY_REACHED_75";
            }
        } else if(playbackPosition >= 1.00) {
            if(previousPosition < 1.00) {
                eventType = "PLAY_REACHED_100";
            }
        }
        
        if(eventType) {
            var url = CtvKaltura.buildKalturaStatsUrl(eventType, sessionId, video, playbackPosition);            
            var options = {
                type: 'GET',
                context: this,
                url: url,
                cache: false,
                timeout: 3000,
                success: function() {
                }
            };
            
            console.log("QUARTILE Stats URL: " + url);
            
            // $.ajax(options);
        }
    },
    
    buildKalturaStatsUrl: function(eventType, sessionId, video, playbackPosition) {
        var statsDomain = "stats.kaltura.com";
        var statsPath = "/api_v3/index.php";
        var    parameters = {
            "event:eventType" : CtvKaltura.getEventValue(eventType),
            "event:duration" : video.duration,
            "event:entryId" : video.embedCode,
            "event:currentPoint" : Math.round(video.duration * playbackPosition),
            "action" : "collect",
            "apiVersion" : "3.1",
            "event:eventTimestamp" : Date.now(),
            "event:objectType" : "KalturaStatsEvent",
            "event:partnerId" : "1897241",
            "event:referrer" : "http%3A%2F%2Fsamsung.carbontv.com%2Fvideos%2F" + video.embedCode,
            "event:sessionId" : sessionId,
            "event:widgetId" : "_1897241",
            "expiry" : "86400",
            "service" : "stats"
        };
        
        if(video.contextId) {
            parameters.contextId = video.contextId;
        }
        
        var url = "http://" + statsDomain + statsPath;
        var delimiter = "?";
        
        for(var key in parameters) {
            url += delimiter + key + "=" + parameters[key];
            delimiter = "&";
        }
        
        return url;
    },
    
    getEventValue: function(eventName) {
        var events = {
            "WIDGET_LOADED" : 1,
            "MEDIA_LOADED" : 2,
            "PLAY" : 3,
            "PLAY_REACHED_25" : 4,
            "PLAY_REACHED_50" : 5,
            "PLAY_REACHED_75" : 6,
            "PLAY_REACHED_100" : 7,
            "OPEN_EDIT" : 8,
            "OPEN_VIRAL" : 9,
            "OPEN_DOWNLOAD" : 10,
            "OPEN_REPORT" : 11,
            "BUFFER_START" : 12,
            "BUFFER_END" : 13,
            "OPEN_FULL_SCREEN" : 14,
            "CLOSE_FULL_SCREEN" : 15,
            "REPLAY" : 16,
            "SEEK" : 17,
            "OPEN_UPLOAD" : 18,
            "SAVE_PUBLISH" : 19,
            "CLOSE_EDITOR" : 20,
            "PRE_BUMPER_PLAYED" : 21,
            "POST_BUMPER_PLAYED" : 22,
            "BUMPER_CLICKED" : 23,
            "PREROLL_STARTED" : 24,
            "MIDROLL_STARTED" : 25,
            "POSTROLL_STARTED" : 26,
            "OVERLAY_STARTED" : 27,
            "PREROLL_CLICKED" : 28,
            "MIDROLL_CLICKED" : 29,
            "POSTROLL_CLICKED" : 30,
            "OVERLAY_CLICKED" : 31,
            "PREROLL_25" : 32,
            "PREROLL_50" : 33,
            "PREROLL_75" : 34,
            "MIDROLL_25" : 35,
            "MIDROLL_50" : 36,
            "MIDROLL_75" : 37,
            "POSTROLL_25" : 38,
            "POSTROLL_50" : 39,
            "POSTROLL_75" : 40
        };
        
        return events[eventName];
    },
    
    generateKalturaSessionId: function() {
        // Session ID is of the form:
        // XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
        // Each character is a hexidecimal value
    
        // Generate the array used for randomly picking hex values
        var hexValues = CtvKaltura.generateHexArray();    
        var template = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX";
        var index;
        
        while(true) {
            index = template.indexOf('X');
            
            if(index == -1) {
                break;
            } else {
                template = template.replace('X', CtvKaltura.getRandomHexValue(hexValues));
            }
        }
        
        return template;
    },
    
    getRandomHexValue: function(hexValues) {
        var index = Math.round((hexValues.length - 1) * Math.random());
        
        return hexValues[index];
    },

    generateHexArray: function() {
        var hexValues = [];
    
        for(var i = 0; i < 10; i++) {
            hexValues.push(i);
        }
    
        hexValues.push("a");
        hexValues.push("b");
        hexValues.push("c");
        hexValues.push("d");
        hexValues.push("e");
        hexValues.push("f");
    
        return hexValues;
    }
};

var sessionId = CtvKaltura.generateKalturaSessionId();
var video = {
    embedCode: '0_fmnempdg',
    duration: 150000,
    contextId: false,
            
};

console.log("SessionID: " + sessionId);

CtvKaltura.sendKalturaPlayEvent(sessionId, video, 0);
CtvKaltura.sendKalturaPlayQuartileEvent(sessionId, video, 0.5, 0.4);