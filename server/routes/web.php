<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/page_view.gif', "Receiver\PageViewReceiver@receive");

Route::get('/event.gif', "Receiver\EventReceiver@receive");

Route::get('/error.gif', "Receiver\ErrorReceiver@receive");