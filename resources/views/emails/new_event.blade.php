<?php
/**
 * Created by PhpStorm.
 * User: Ets Simon
 * Date: 08/04/2016
 * Time: 11:47
 */
?>
{{--
<body style="padding: 10px;background-color: beige;">

<img src="{{$message->embed(public_path().'/images/logo/64_1.png')}}"/>
<hr>
<div style="background:black;
    color: #B69E40;
    padding: 15px;">
    <span style="color:white;font-weight: bold;">Titre :</span>
    <span style="text-transform: capitalize"> {{$event->name}}</span>
    <br>
    <br>
    <span style="color:white;font-weight: bold;">Auteur :</span>
    <span style="text-transform: capitalize"> {{$email}}</span>
    <br>
    <br>
    <span style="color:white;font-weight: bold;">Status :</span> <span> {{$event->status}}</span>
    <br>
    <br>
    <span style="color:white;font-weight: bold;">Date :</span> <span> {{$event->start_date}}</span>
    <br>
    <br>
    <h3 style="color:white">Description</h3>
    <hr style="color: white;">
    <p style="margin: 15px 0 36px;">{{$event->description}}</p>

    <a style="padding: 10px;background: red;text-decoration: none;color: white;" href="{{url("/panel")}}">
        Admin Panel</a>

</div>
</body>
--}}


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<style type="text/css">
    table
</style>
<div style="background: #f7f7f7;width: 740px;height: 100%;text-align: center">

    <img src="{{$message->embed(public_path().'/images/logo/64_1.png')}}" alt="" style="width: 256px;height: 100px"/>

    <table style="width: 700px !important; background: #fff;margin: 20px">
        <body>
        <tr>
            <td style="padding: 10px; font-size: 24px;color: #f69524">
                <h3>Bravo votre événement : {{$event->name}}</h3>
            </td>
        </tr>
        <tr>
            <td style="padding: 0 10px 5px; line-height: 30px">
                <a href="{{env('APP_URL').'/#/details/'.$event->name.'/0000'.$event->id}}" style="    padding: 10px 15px;
    background: #00d656;
    color: #fff;
    font-size: 18px;
    border-color: #00d656;
    box-shadow: none;
    text-decoration: none;
    border-radius: 3px;">Consulter le</a>
            </td>
        </tr>

        </body>
    </table>
</div>
</body>
</html>
