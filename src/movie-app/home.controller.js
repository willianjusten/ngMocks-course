angular.module('movieApp')
    .controller('HomeController', function($scope, $interval, $exceptionHandler, omdbApi, PopularMovies){
        
        var results = [];
        var i = 0;
        
        var findMovie = function(id) {
            omdbApi.find(id)
                .then(function(data){
                    $scope.result = data;
                })
                .catch(function(e){
                    $exceptionHandler(e);
                })
        };

        PopularMovies.query(function(data) {
            results = data;
            findMovie(results[0]);
            $interval(function() {
                ++i;
                findMovie(results[i % results.length]);
            }, 5000);
        });
    })