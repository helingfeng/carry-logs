<?php
/**
 * User: helingfeng
 */

namespace App\Http\Controllers\Receiver;


use App\Logger\CarryLogger;

class ErrorReceiver
{
    public function receive()
    {
        $param = request()->all();
        CarryLogger::getLogger(CarryLogger::LOG_ERROR)->info(json_encode($param, JSON_UNESCAPED_UNICODE));
        return response('');
    }
}