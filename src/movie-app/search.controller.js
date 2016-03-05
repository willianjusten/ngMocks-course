angular.module('movieApp')
    .controller('SearchController', function($scope, $location, $timeout){
        var timeout;

        $scope.keyup = function(){
            timeout = $timeout($scope.search(), 1000);
        }

        $scope.keydown = function(){
            $timeout.cancel(timeout);
        }

        $scope.search = function() {
            $timeout.cancel(timeout);
            if($scope.query){
                $location.path('/results').search('q', $scope.query);
            }
        }
    });