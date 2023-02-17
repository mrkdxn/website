<?php


Route::get('/', function()
{
   return View::make('pages.home');
});

Route::get('/about', function()
{
   return '<h1>Return this</h1>';
});