describe('Movie Result Directive', function() {

    var result = {
        Poster: "http://ia.media-imdb.com/images/M/MV5BMTU4NTczODkwM15BMl5BanBnXkFtZTcwMzEyMTIyMw@@._V1_SX300.jpg",
        Title: "Star Wars: Episode IV - A New Hope",
        Plot: "Hey! It is Star Wars you should know the history!",
        Director: "George Lucas",
        Actors: "Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing",
        Released: "25 May 1977",
        Genre: "Action, Adventure, Fantasy"
    }

    var expectedHtml = [
            '<div class="col-sm-4">',
                '<img ng-src="http://ia.media-imdb.com/images/M/MV5BMTU4NTczODkwM15BMl5BanBnXkFtZTcwMzEyMTIyMw@@._V1_SX300.jpg" alt="Star Wars: Episode IV - A New Hope" width="220" src="http://ia.media-imdb.com/images/M/MV5BMTU4NTczODkwM15BMl5BanBnXkFtZTcwMzEyMTIyMw@@._V1_SX300.jpg">',
            '</div>',
            '<div class="col-sm-8">',
                '<h3 class="ng-binding">Star Wars: Episode IV - A New Hope</h3>',
                '<p class="ng-binding">Hey! It is Star Wars you should know the history!</p>',
                '<p class="ng-binding"><strong>Director:</strong> George Lucas</p>',
                '<p class="ng-binding"><strong>Actors:</strong> Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing</p>',
                '<p class="ng-binding"><strong>Released:</strong> 25 May 1977</p>',
                '<p class="ng-binding"><strong>Genre:</strong> Action, Adventure, Fantasy</p>',
            '</div>'
    ].join('');

    var $compile;
    var $rootScope;

    beforeEach(module('movieApp'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));
    
    it('should output movie result to expected HTML format', function() {
        $rootScope.result = result;
        var element;
        element = $compile('<movie-result result="result"></movie-result>')($rootScope);
        $rootScope.$digest();
        expect(element.html()).toBe(expectedHtml);
    });
});