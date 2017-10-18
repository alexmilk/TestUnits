(function (mw) {
mw.kalturaPluginWrapper(function(){

    mw.PluginManager.add( 'CustomPlugin', mw.KBaseComponent.extend({

        setup: function(){
            this.addBindings();
        },

        addBindings: function() {
            this.bind('playerReady', function(){
                alert("player is ready");
            });
        }

    }));

})});
