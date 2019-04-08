<?php
/**
 * User: helingfeng
 */

namespace App\Http\Controllers\Receiver;


use App\Logger\CarryLogger;

class EventReceiver
{
    public function receive()
    {
        $param = request()->all();
        CarryLogger::getLogger(CarryLogger::LOG_EVENT)->info(json_encode($param, JSON_UNESCAPED_UNICODE));
        return response('');
    }
}