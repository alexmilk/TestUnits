private String buildFlavorDownloadUrl(KalturaFlavorAsset flavorAsset) {
    String urlPattern = "{0}/p/{1,number,#}/sp/{2,number,#}00/download/entry_id/{3}/flavor/{4}";
    CMSite cmSite = Context.getSite();
    int partnerId = getPartnerId();
    String hostName;
    checkSiteSetOnContext();
    hostName = StringUtils.stripEnd(cmSite.getKalturaHostname(), "/");
    return MessageFormat.format(urlPattern, hostName, partnerId, partnerId, flavorAsset.entryId, flavorAsset.id);
}

http://cfvod.kaltura.com/pd/p/1666321/sp/0/serveFlavor/entryId/1_teqkelwb/v/1/flavorId/1_gkix4yq8/fileName/Kaltura_Live_with_Cloud_Transcode_(SD_Small_-_WEB_MBL_(H264_900)).mp4/name/a.mp4


kWidget.addReadyCallback( function( playerId ){
	var kdp = document.getElementById( playerId );
	kdp.kBind( 'mediaReady', function(){
		// Seek to 30 seconds from the start of the video
		kdp.sendNotification("doPlay");
	})
});

Case 772885, time code to pixelation