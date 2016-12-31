<?php
/**
 * Created by PhpStorm.
 * User: Ets Simon
 * Date: 14/11/2016
 * Time: 01:43
 */
?>
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<style type="text/css">
    table tr {
        margin-top: 5px;
        margin-bottom: 5px;
    }

    table tr td {
        position: relative;
        /*border: 3px solid #eee;*/
    }

    span.fixe {
        position: absolute;
        top: 0;
        left: 0;
        color: #8c8c8c;
        text-transform: uppercase;
        font-size: 12px;
    }

    span.detail {
        position: absolute;
        left: 20px;
        top: 25px;
    }
</style>
<div style="background: #f7f7f7;width: 740px;height: 100%;">

    <table style="width: 700px !important; background: #fff;margin: 0 20px">
        <tbody>
        <tr>
            <td style="width: 20%;text-align: center">
                <img src="../../images/logo/256_2.png" alt="" style="width: 256px;height: 100px"/>
            </td>
            <td style="padding: 10px; font-size: 24px;color: #f69524;text-align: center">
                <span class="fixe">Titre</span>
                <h3>{{$e->name}}</h3>
            </td>
        </tr>
        <tr>
            <td style="padding: 0 10px 5px; line-height: 30px">
                <span class="fixe">Date et heure</span>
                <span class="detail">{{$e->start_date}} au {{$e->end_date}}1</span>
            </td>
            <td style="padding: 0 10px 5px; line-height: 30px">
                <table>
                    <tbody>
                    <tr>
                        <td style="width: 200px">
                            <span class="fixe">Adresse</span>
                            <span class="detail">
Boite postale,Rue <br/>
                                    Ville,Pays <br/>
                                </span>
                        </td>
                        <td style="width: 50%;text-align: center">
                            {{--<img src="" alt="Qr code ici" style="width: 50%;height:100px"/>--}}
                            {{$participant->qrcodes[$i]}}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>


        </tbody>
    </table>
    <table style="width: 700px !important; background: #fff;margin: 0 20px">
        <tbody>
        <tr>
            <td>
                <span class="fixe">Detail commande</span>
                <span class="detail">
Commande n°:1455 commandé par Nsc-Edward le Mercredi 4 Janvier 2011
</span>
            </td>
        </tr>
        </tbody>
    </table>
</div>
</body>
</html>