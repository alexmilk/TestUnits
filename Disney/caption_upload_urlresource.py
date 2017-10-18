from KalturaClient import *
from KalturaClient.Base import KalturaException
from KalturaClient.Plugins.Core import (KalturaMediaEntry, KalturaMediaType, KalturaAssetFilter,
                                        KalturaThumbAsset, KalturaUrlResource, KalturaEntryStatus,
                                        KalturaFlavorAssetStatus, KalturaEntryReplacementOptions,
                                        KalturaNullableBoolean, KalturaUploadedFileTokenResource)
from KalturaClient.Plugins.Metadata import KalturaMetadataObjectType, KalturaMetadataFilter
from KalturaClient.Plugins.Caption import KalturaCaptionAsset, KalturaCaptionType, KalturaLanguage, KalturaLanguageCode

partner_id = 1082342

client = <KalturaClient with valid session>

entry_id = "1_eknqekfk"

url = "https://storage.googleapis.com/f27eb581-4c62-46b1-abce-17caeea2dbc9-disney-int/L2FwcGhvc3RpbmdfcHJvZC9ibG9icy9BRW5CMlVwak5mRGNIcEthMjhjOTJJYnNYbDMxdy00ZnJZaUhhOVJxbUVybV8xQkdlYmg2YWlQb1owNkJYOUF4Y2JkNXQ4WUpuTXpaZXhLRkZwblJjOUt0cFA3R0JXSVZIQ3VTMG1Odk8tYmNvWXZYTjkxSjlrSS54Y3FyY1F2LVVTSkMwSHNX?Expires=1477973452&GoogleAccessId=di-lumiere-us-nonprod-2%40appspot.gserviceaccount.com&Signature=cUcF%2FpzhS%2BNhgLybZ1lHk3%2FNYHBLwhCglCOjLG9HR9V8Abc0IPtBsmqp%2FvL1IUHd6LkKBxk%2FqpeKceHCgPBP%2BNG8fE2G767qxcYNPtjq2CkCcIuP7uIHc5GgHCc9wWVs9onCDTw3Ay6Xzk9ZkbJV7o3ks1RCJBqoDkK47J7xoqelU1x7QWBS2x%2FQaXJ3cVTHhnluIHAXotW0ISbiokDPLyzek3C5X%2BngfoMq6%2BU09hAIQ7Uof8NtZ8vxTicNmMRLSmeqf3136ot2YSlHyDSKRcWR2mOXc4S8QiZqxWDy57Y4OpkQstaXp3ayGNNWI3KyMQs1lVESKTgipHuScCHE8w%3D%3D"

captionAsset = KalturaCaptionAsset(
    format=KalturaCaptionType.WEBVTT,
    language=KalturaLanguage.EN_US,
    label="English",
    isDefault=KalturaNullableBoolean.FALSE_VALUE
)

try:
  captionAsset = client.caption.captionAsset.add(entry_id, captionAsset)
  print("Added captionAsset:", captionAsset)

  contentResource = KalturaUrlResource(url=url)
  print("Created contentResource:", contentResource)

  #### The following line is where it bugs out ####
  captionAsset = client.caption.captionAsset.setContent(captionAsset.id, contentResource)
  print("Set content for captionAsset:", captionAsset)
except KalturaException as ex:
    message = ("Error adding KalturaCaptionAsset. KalturaException[code=" +
               ex.code + ",message=" + ex.message + "]")
    logging.warn(message)
    raise errors.ExternalIntegrationError(message)
    
'''
Console output while executing:

('Added captionAsset:', <KalturaClient.Plugins.Caption.KalturaCaptionAsset object at 0x10aa7d0d0>)
('Created contentResource:', <KalturaClient.Plugins.Core.KalturaUrlResource object at 0x10a634d10>)
Error adding KalturaCaptionAsset. KalturaException[code=INTERNAL_SERVERL_ERROR,message=Internal server error occurred]

'''
