describe('Results Controller', function() {
    
    var results = {
        "Search":[
            {
                "Title":"Star Wars: Episode IV - A New Hope",
                "Year":"1977",
                "imdbID":"tt0076759",
                "Type":"movie"
            },
            {
                "Title":"Star Wars: Episode V - The Empire Strikes Back",
                "Year":"1980",
                "imdbID":"tt0080684",
                "Type":"movie",
            },
            {
                "Title":"Star Wars: Episode VI - Return of the Jedi",
                "Year":"1983",
                "imdbID":"tt0086190",
                "Type":"movie",
            }
        ]
    };

    var $controller;
    var $location;
    var $q;
    var $rootScope;
    var $scope;
    var omdbApi;

    beforeEach(module('omdb'));
    beforeEach(module('movieApp'));

    beforeEach(inject(function(_$controller_, _$location_, _$q_, _$rootScope_, _omdbApi_){
        $controller = _$controller_;
        $location = _$location_;
        $scope = {};
        $q = _$q_;
        $rootScope = _$rootScope_;
        omdbApi = _omdbApi_;
    }));

    it('should load search results', function() {
        spyOn(omdbApi, 'search').and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve(results);
            return deferred.promise;
        });
        $location.search('q', 'star wars');
        $controller('ResultsController', { $scope: $scope });
        $rootScope.$apply();

        expect($scope.results[0].Title).toBe(results.Search[0].Title);
        expect($scope.results[1].Title).toBe(results.Search[1].Title);
        expect($scope.results[2].Title).toBe(results.Search[2].Title);
        expect(omdbApi.search).toHaveBeenCalledWith('star wars');
    });

    it('should handle an error', function() {
        spyOn(omdbApi, 'search').and.callFake(function(){
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        });
        $location.search('q', 'star wars');
        $controller('ResultsController', { $scope: $scope });
        $rootScope.$apply();
        expect($scope.errorMessage).toBe('Something went wrong!');
    });
});