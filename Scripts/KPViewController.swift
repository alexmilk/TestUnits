- (KPViewController *)player {
    if (!_player) {
        // Account Params
        KPPlayerConfig *config = [[KPPlayerConfig alloc] initWithServer:@"http://cdnapi.kaltura.com"
                                                               uiConfID:@"26698911"
                                                              partnerId:@"1831271"];
        
        // Video Entry
        config.entryId = @"1_o426d3i4";
        
        [config addConfigKey:@"doubleClick.adTagUrl" withValue:@"http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=%2F3510761%2FadRulesSampleTags&ciu_szs=160x600%2C300x250%2C728x90&cust_params=adrule%3Dpremidpostwithpod&impl=s&gdfp_req=1&env=vp&ad_rule=1&vid=12345&cmsid=3601&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]"];
        [config addConfigKey:@"doubleClick.plugin" withValue:@"true"];
        
        // Setting this property will cache the html pages in the limit size
        config.cacheSize = 0.8;
        _player = [[KPViewController alloc] initWithConfiguration:config];
    }
    return _player;
}