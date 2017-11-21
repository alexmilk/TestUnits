mw.kalturaPluginWrapper(function(){
  try {
    mw.util.formaters().register({
      'escape': function( value ){
        return encodeURI( value );
      },
      'dfp-sanitized' : function (value) {
        // DFP will only support specific charaters for custom_params
        // this is to clean that up
        var goodCharacters = /[^a-zA-Z-._$,]+/g;
        value = value.replace(goodCharacters, "-").toLowerCase();
        return value;
      }
    });
  } catch (e) {
    console.warn("Formatter Error");
  };
});
