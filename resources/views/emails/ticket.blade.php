<?php
/**
 * Created by PhpStorm.
 * User: Ets Simon
 * Date: 08/04/2016
 * Time: 11:47
 */
?>
<body style="padding: 10px;background-color: beige;">

<img src="{{$message->embed(public_path().'/images/logo/64_1.png')}}" />
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
