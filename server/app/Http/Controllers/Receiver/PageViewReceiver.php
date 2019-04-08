<?php
/**
 * User: helingfeng
 */

namespace App\Http\Controllers\Receiver;


use App\Logger\CarryLogger;

class PageViewReceiver
{
    use ReceiveTrait;

    public function receive()
    {
        $param = request()->all();
        CarryLogger::getLogger(CarryLogger::LOG_PAGE_VIEW)->info(json_encode($param, JSON_UNESCAPED_UNICODE));
        return $this->emptyGif();
    }
}