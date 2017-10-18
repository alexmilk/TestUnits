/**
 * Created by alex on 05/07/2016.
 */

var plugins = [
    {
        "displayName" : "vast",
        "json" : {
            "vast":{
                "prerollUrl":"http://projects.kaltura.com/vast.xml",
                "preSequence":1,
                "numPreroll":1,
                "skipOffset":5,
                "storeSession":false,
                "timeout":4,
                "plugin":true
            }
        }
    } ,
    {
        "displayName" : "loadingSpinner",
        "json" : {
            "loadingSpinner": {
                "imageUrl": "",
                "lines": 10,
                "lineLength": 10,
                "width": 6,
                "radius": 12,
                "corners": 1,
                "rotate": 0,
                "direction": 1,
                "color": "#ff00ff",
                "speed": 1.6,
                "trail": 100,
                "shadow": false,
                "className": "spinner",
                "zIndex": 2000000000,
                "top": "auto",
                "left": "auto",
                "plugin": true
            }
        }
    } ,
    {
        "displayName" : "volumeControl",
        "json" : {
            "volumeControl":{
                "showSlider": true,
                "accessibleControls": false,
                "accessibleVolumeChange": 0.1,
                "plugin": true
            }
        }
    } ,
    {
        "displayName" : "logo",
        "json" : {
            "logo": {
                "plugin" : true,
                "width" : "0%",
                "height" : "0%",
                "includeInLayout" : false,
                "img" : "http://cdnbakmi.kaltura.com/content/uiconf/ps/demos/kdp3/assets/coffee.png",
                "href" : "http://kaltura.com",
                "title" : "my logo"
            }
        }
    },
    {
        "displayName" : "playlistAPI",
        "json" : {
            "playlistAPI": {
                "plugin" : true,
                "autoContinue" : true,
                "autoPlay" : true,
                "autoInsert" : true
            }
        }
    },
    {
        "displayName" : "playlist",
        "json" : {
            "playlist": {
                "plugin" : true,
                "includeInLayout" : true
            }
        }
    }
]
var pluginsCombo=$('<div class="dropdown btn-group"><a class="btn dropdown-toggle" data-toggle="dropdown" href="#">Add plugin<span class="caret"></span></a><ul id="dropDownContent" class="dropdown-menu"></ul></div>');
$("#pluginsContainer").append(pluginsCombo);

$(plugins).each(function(){
    var liItem = $('<li><a href="#">'+this.displayName+'</a></li>').data(this.json).attr("pname",this.displayName);
    $("#dropDownContent").append(liItem);
})

function insertAt(src, index, str) {
    return src.substr(0, index) + str + src.substr(index)
}

$("#dropDownContent").delegate("li", "click", function (e) {
    //alert( JSON.stringify($(this).data(), null, 2)  );
    if($("#jsonTextArea").val().indexOf("{") == 0){
        // check if the current JSON has this specific plugin
        if($("#jsonTextArea").val().indexOf( $(this).attr("pname") ) > -1 ){
            //This plugin exists in the JSON. Alert the user
            alert("Error. It looks like this plugin already exists in the your JSON config ");
        } else {
            //add the plugin into the JSON
            var shortJSON = JSON.stringify($(this).data(), null, 2);
            shortJSON = shortJSON.slice( 1 ); // remove first {
            shortJSON = shortJSON.slice(0, -1); //remove last }
            shortJSON = shortJSON.slice(0, -1); //remove lin break
            shortJSON = shortJSON + ","; // add comma, this will not be the 1st plugin
            $("#jsonTextArea").val( insertAt($("#jsonTextArea").val() , 1 , shortJSON));
        }
    }else{
        //this is the 1st plugin that we are adding
        $("#jsonTextArea").val(JSON.stringify($(this).data(), null, 2)) ;
    }
});





