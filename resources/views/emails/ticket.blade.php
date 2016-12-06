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
    <span style="text-transform: capitalize"> {{$event->user->email}}</span>
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

    <img src="../../images/logo/256_2.png" alt="" style="width: 256px;height: 100px"/>

    <table style="width: 700px !important; background: #fff;margin: 20px">
        <body>
        <tr>
            <td style="padding: 10px; font-size: 24px;color: #f69524">
                <h3>Titre evenement</h3>
            </td>
        </tr>
        <tr>
            <td style="padding: 0 10px 5px; line-height: 30px">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias atque, autem cumque error, est facilis
                ipsa iusto minus nihil nulla officiis quasi sit tenetur ullam, veritatis. Exercitationem illum unde vel.
            </td>
        </tr>
        <tr>
            <td style="text-align: center">
                <img src="../../images/509783.jpg" alt="" style="width: 80%;height: 400px;padding: 25px"/>
            </td>
        </tr>
        <tr>
            <td style="padding: 0 10px 5px; line-height: 30px">Date et heure :</td>
        </tr>
        {{-- <tr>
             <td style="padding: 0 10px 5px; line-height: 30px">Lieu : {{$event->address->first()->name}} (Ville :{{$event->address->first()->town->first()->name}}  )</td>
         </tr>--}}
        <tr>
            <td style="padding: 0 10px 5px; line-height: 30px">
                Télécharger vos billets (en piece jointe)</a>
            </td>
        </tr>
        </body>
    </table>
</div>
</body>
</html>