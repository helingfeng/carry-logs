<?php
/**
 * User: helingfeng
 */

namespace App\Http\Controllers\Receiver;


use App\Logger\CarryLogger;

class EventReceiver
{
    use ReceiveTrait;

    public function receive()
    {
        $param = request()->all();
        CarryLogger::getLogger(CarryLogger::LOG_EVENT)->info(json_encode($param, JSON_UNESCAPED_UNICODE));
        return $this->emptyGif();
    }
}