angular.module('movieApp')
    .controller('ResultsController', function($scope, $location, $exceptionHandler, $log, omdbApi){
        var query = $location.search().q;
        
        $log.debug('Controller loaded with query: ', query);
        omdbApi.search(query)
            .then(function(data){ 
                $log.debug('Data returned for query: ', query, data);
                $scope.results = data.Search;
            })
            .catch(function(e){
                $exceptionHandler(e); 
            })

        $scope.expand = function expand(index, id) {
            omdbApi.find(id)
                .then(function(data){
                    $scope.results[index].data = data;
                    $scope.results[index].open = true;
                })
        }
    });