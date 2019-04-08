<?php
/**
 * User: helingfeng
 */

namespace App\Logger;

use Monolog\Logger;
use Illuminate\Log\Writer;

class CarryLogger
{
    const LOG_PAGE_VIEW = 'page_view';
    const LOG_EVENT = 'page_event';
    const LOG_ERROR = 'page_error';

    private static $loggers = array();

    public static function getLogger($type = self::LOG_ERROR, $day = 30)
    {
        if (empty(self::$loggers[$type])) {
            self::$loggers[$type] = new Writer(new Logger($type));
            self::$loggers[$type]->useDailyFiles(storage_path() . '/logs/' . $type . '.log', $day);
        }

        $log = self::$loggers[$type];
        return $log;
    }
}