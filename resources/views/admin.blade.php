<!DOCTYPE >
<html>
<head>
    <meta charset="utf-8">
    <title>Saficab Admin</title>

    <link rel="stylesheet" href="{{url('ng-admin.min.css')}}">


</head>
<body ng-app="saficab">

<div ui-view></div>

{{--<script src="{{url('angular.js')}}" type="text/javascript"></script>--}}
@if (env('APP_ENV') == 'production')
    <script src="{{secure_url('ng-admin.min.js')}}" type="text/javascript"></script>
    <script src="{{secure_url('auth.js')}}" type="text/javascript"></script>
    <script src="{{secure_url('app.js')}}"></script>
@else
    <script src="{{url('ng-admin.min.js')}}" type="text/javascript"></script>
    <script src="{{url('auth.js')}}" type="text/javascript"></script>
    <script src="{{url('app.js')}}"></script>
@endif

</body>


</html>