/**
 * Created by Thedward on 10/08/2016.
 */
controller
    .controller('AuthCtrl', ['$scope', '$auth', '$state', '$stateParams','$cookies','Restangular','$rootScope',
        function ($scope, $auth, $state, $stateParams,$cookies,Restangular,$rootScope) {
            $scope.message="";

            $scope.signup = function () {
                $auth.signup($scope.auth).then(function (response) {
                    // tu stocke xa dans le rootScope au cas ou !!!
                    console.log(response.data.user);
                    $auth.setToken(response.data.token);
                    console.info('Signup  successfully.');
                    Restangular.one('authenticated-user').get().then(function(data){
                        $cookies.putObject("user",data.user,{path: '/'});
                    });
                    $state.go('home');

                }, function (error) {
                    console.error(error);
                });
            };

            $scope.login = function () {
                $auth.login($scope.auth).then(function (response) {
                    // tu stocke xa dans le rootScope au cas ou !!!
                    var t = response.data.token;
                    $auth.setToken(t);
                    console.info('Logged in successfully.');
                    if ($rootScope.next != undefined) {
                        $state.go($rootScope.next.name,$rootScope.next.params);
                        //window.location.reload();
                    } else {
                        $state.go('home');
                    }
                    Restangular.one('authenticated-user').get().then(function(data){
                        $cookies.putObject("user",data.user,{path: '/'});
                    });
                }, function (error) {
                    console.error(error);
                    $scope.message = "Paramètres de connexion invalides";
                });
            }

        }])
;
