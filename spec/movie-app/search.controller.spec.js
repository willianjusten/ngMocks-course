describe('Search controller', function() {
    var $scope;
    var $location;
    var $controller;

    beforeEach(module('movieApp'));

    beforeEach(inject(function(_$controller_, _$location_){
        $scope = {};
        $controller = _$controller_;
        $location = _$location_;

        _$controller_('SearchController', { 
            $scope: $scope, 
            $location: _$location_
        });
    }));
    
    it('should redirect to the query results page for non-empty query', function() {
        $scope.query = 'star wars';
        $scope.search();
        expect($location.url()).toBe('/results?q=star%20wars');
    });

    it('should not redirect to query results for empty query', function() {
        $scope.query = '';
        $scope.search();
        expect($location.url()).toBe('');
    });
});