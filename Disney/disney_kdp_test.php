<html>
<head>
    <title>KDP Objects Test</title>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
</head>
<body>
<script src="http://cdnapi.kaltura.com/p/1068292/sp/106829200/embedIframeJs/uiconf_id/27176231/partner_id/1068292"></script>
<div id="kaltura_player_1465458750" style="width: 560px; height: 395px;"></div>

<script>
    kWidget.embed({
        "targetId": "kaltura_player_1465458750",
        "wid": "_1068292",
        "uiconf_id": 27176231,
        "flashvars": {
            "streamerType": "auto",
            "comScoreStreamingTag": {
                "plugin": true,
                "debug": true,
                "asyncInit": true,
                "c2": 1234567,
                'labelMapping': 'c3={mediaProxy.entryMetadata.publisherName},c4=*null,c6=*null”,ns_st_st={mediaProxy.entryMetadata.ChannelName},ns_st_pu=Disney,ns_st_pr={mediaProxy.entryMetadata.PropertyName},ns_st_ep={mediaProxy.entry.name},ns_st_sn={mediaProxy.entryMetadata.SeasonNumber},ns_st_en={mediaProxy.entryMetadata.EpisodeNumber},ns_st_ge={mediaProxy.entryMetadata.Genre},ns_st_ti=*null,ns_st_ia=0,ns_st_ce=1,ns_st_ddt={mediaProxy.entry.startDate},ns_st_tdt={mediaProxy.entryMetadata.OriginalBroadcast}'
            }
        },
        "cache_st": 1465458750,
        "entry_id": "1_kqi9xx7c"
    });

    //1_kqi9xx7c
    //1_ve0qis0h

    //1_7p458gvy
//    function jsCallbackReady(objectId) {
//        window.kdp = document.getElementById(objectId);
//    }
    kWidget.addReadyCallback( function( playerId ){
        var kdp = document.getElementById( playerId );
    window.onload = function() {
        var entryMetadata = kdp.evaluate('{mediaProxy.entryMetadata}'),
                entry = kdp.evaluate('{mediaProxy.entry}'),
                metaString     = new Array();

        $.each(entryMetadata, function(key, value) {
            metaString += key + ' = ' + value + ' || \n';
        });

        $.each(entry, function(key, value) {
            metaString += key + ' = ' + value + ' || \n';
        });

        console.log(metaString);
        $('#vars_output').text(metaString);
        }
        })
</script>
<h3>mediaproxy.entryMetadata Params</h3>
<div id='vars_output'></div>
</body>
</html>
