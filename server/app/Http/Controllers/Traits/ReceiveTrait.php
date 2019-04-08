<?php
/**
 * User: helingfeng
 */

namespace App\Http\Controllers\Receiver;


trait ReceiveTrait
{
    public function emptyGif()
    {
        return response()->stream(function () {
            $im = imagecreate(1, 1);
            imagegif($im);
            imagedestroy($im);
        }, 200, ["Content-type" => "image/jpeg"]);
    }
}