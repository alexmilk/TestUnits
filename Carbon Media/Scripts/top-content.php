<?php
require_once __DIR__ . "/vendor/autoload.php";

define("PARTNER_ID", 123456789);
define("ADMIN_SECRET", "abcdefghijk");

$config = new Kaltura\Client\Configuration(PARTNER_ID);

$config->setServiceUrl("http://www.kaltura.com");

$client = new Kaltura\Client\Client($config);

$sessionType = Kaltura\Client\Enum\SessionType::ADMIN;  
$userId = null;
$ks = $client->generateSession(ADMIN_SECRET, $userId, $sessionType, PARTNER_ID);
$client->setKs($ks);

$reportType = Kaltura\Client\Enum\ReportType::TOP_CONTENT;

$filter = new Kaltura\Client\Type\ReportInputFilter();

$filter->interval = Kaltura\Client\Enum\ReportInterval::MONTHS;
$filter->fromDay = "20180317";
$filter->toDay = "20180318";
$filter->categories = "Ads";
$filter->timeZoneOffset = 308;

$pager = new Kaltura\Client\Type\FilterPager();

$pager->pageSize = 1;
$pager->pageIndex = 1;

$result = $client->report->getTable($reportType, $filter, $pager);
?>
<html>
    <head><title>Kaltura Top Content Test</title></head>
    <body>
        <pre>
<?php echo var_export($result, true); ?>
        </pre>
    </body>
</html>