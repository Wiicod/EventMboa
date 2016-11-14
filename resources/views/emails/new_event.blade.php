<?php
/**
 * Created by PhpStorm.
 * User: Ets Simon
 * Date: 08/04/2016
 * Time: 11:47
 */
?>
<body style="padding: 10px;background-color: beige;">

<img src="{{$message->embed(public_path().'/img/sc.png')}}" />
<hr>
<div style="background:black;
    color: #B69E40;
    padding: 15px;">
    <span style="color:white;font-weight: bold;">Titre :</span>
    <span style="text-transform: capitalize"> {{$comment->title}}</span>
    <br>
    <br>
    <span style="color:white;font-weight: bold;">Auteur :</span>
    <span style="text-transform: capitalize"> {{$comment->player->username}}</span>
    <br>
    <br>
    <span style="color:white;font-weight: bold;">Status :</span> <span> {{$comment->status}}</span>
    <br>
    <br>
    <span style="color:white;font-weight: bold;">Date :</span> <span> {{$comment->updated_at}}</span>
    <br>
    <br>
    <h3 style="color:white">Description</h3>
    <hr style="color: white;">
    <p style="margin: 15px 0 36px;">{{$comment->description}}</p>

    <a style="padding: 10px;background: red;text-decoration: none;color: white;" href="{{url("/panel")}}">
        Admin Panel</a>

</div>


</body>
