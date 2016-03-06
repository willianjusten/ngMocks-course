describe('Results Controller', function() {
    
    var results = [
        {
            "Title":"Star Wars: Episode IV - A New Hope",
            "imdbID":"tt0076759"
        },
        {
            "Title":"Star Wars: Episode V - The Empire Strikes Back",
            "imdbID":"tt0080684"
        },
        {
            "Title":"Star Wars: Episode VI - Return of the Jedi",
            "imdbID":"tt0086190"
        }
    ];

    var $scope;
    var $interval;
    var $controller;
    var omdbApi;
    var PopularMovies;
    var $exceptionHandler;

    beforeEach(module('movieApp'));

    beforeEach(module(function($exceptionHandlerProvider) {
        $exceptionHandlerProvider.mode('log');
    }))

    beforeEach(inject(function(_$q_, _omdbApi_) {
        spyOn(_omdbApi_, 'find').and.callFake(function() {
            var deferred = _$q_.defer();
            var args = _omdbApi_.find.calls.mostRecent().args[0];

            if(args === 'tt0076759') {
                deferred.resolve(results[0]);
            }
            else if (args === 'tt0080684') {
                deferred.resolve(results[1]);
            }
            else if (args === 'tt0086190'){
                deferred.resolve(results[2]);
            }
            else if (args === 'ttError'){
                deferred.reject('error finding movie');
            }
            else {
                deferred.reject();
            }
            return deferred.promise;
        });
    }));

    beforeEach(inject(function(_$controller_, _$q_, _$interval_, _$exceptionHandler_, _$rootScope_, _omdbApi_, _PopularMovies_) {
        $scope = {};
        $controller = _$controller_;
        $interval = _$interval_;
        $rootScope = _$rootScope_;
        $q = _$q_;
        $exceptionHandler = _$exceptionHandler_;
        omdbApi = _omdbApi_;
        PopularMovies = _PopularMovies_;
    }));


    it('should rotate movies every 5 seconds', function() {

        spyOn(PopularMovies, 'get').and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve(['tt0076759', 'tt0080684', 'tt0086190']);
            return deferred.promise;
        });

        $controller('HomeController', {
            $scope: $scope,
            $interval: $interval,
            omdbApi: omdbApi,
            PopularMovies: PopularMovies
        });
        $rootScope.$apply();

        // should have a default movie
        expect($scope.result.Title).toBe(results[0].Title);

        // should update after 5 seconds
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[1].Title);
        
        // should update after 5 seconds
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[2].Title);
        
        // should return to default
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[0].Title);
    });

    it('should handle error', function() {

        spyOn(PopularMovies, 'get').and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve(['tt0076759', 'tt0080684', 'tt0086190', 'ttError']);
            return deferred.promise;
        });

        $controller('HomeController', {
            $scope: $scope,
            $interval: $interval,
            omdbApi: omdbApi,
            PopularMovies: PopularMovies
        });
        $rootScope.$apply();

        // should have a default movie
        expect($scope.result.Title).toBe(results[0].Title);

        // should update after 5 seconds
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[1].Title);
        
        // should update after 5 seconds
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[2].Title);
        
        // should return to default
        $interval.flush(5000);
        
        expect($exceptionHandler.errors).toEqual(['error finding movie']);
    });

});