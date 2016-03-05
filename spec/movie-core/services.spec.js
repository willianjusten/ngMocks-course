describe('MovieCore', function() {
    
    var PopularMovies;
    var $httpBackend;

    beforeEach(module('movieCore'));

    beforeEach(inject(function(_PopularMovies_, _$httpBackend_) {
        PopularMovies = _PopularMovies_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
    })

    it('should create popular movie', function() {
        var expectedData = {"movieId": "tt0076759", "description": "Great movie!"};

        $httpBackend.expectPOST(/./, expectedData)
            .respond(201)
        var popularMovie = new PopularMovies({
            movieId: 'tt0076759',
            description: 'Great movie!'
        })
        popularMovie.$save();

        expect($httpBackend.flush).not.toThrow();
    });

    it('should get popular movie by id', function() {
        $httpBackend.expectGET('popular/tt0076759')
            .respond(200)

        PopularMovies.get({movieId: 'tt0076759'});

        expect($httpBackend.flush).not.toThrow();
    });

    it('should update popular movie', function() {
        $httpBackend.expectPUT('popular')
            .respond(201)

        var popularMovie = new PopularMovies({
            movieId: 'tt0076759',
            description: 'Great movie!'
        })
        popularMovie.$update();

        expect($httpBackend.flush).not.toThrow();
    });

    it('should authenticate requests', function() {

        var headerData = function(headers) {
            return headers.authToken === 'teddybear';
        }

        var matchAny = /.*/;
        var popularMovie = { movieId: 'tt0076759', description: 'Great movie!'};

        // get methods
        $httpBackend.whenGET(matchAny, headerData).respond(200);
        PopularMovies.query();
        PopularMovies.get({ movieId: 'tt0076759'});

        // save/post methods
        $httpBackend.expectPOST(matchAny, matchAny, headerData).respond(200);
        new PopularMovies(popularMovie).$save();
            
        // put/update methods
        $httpBackend.expectPUT(matchAny, matchAny, headerData).respond(200);
        new PopularMovies(popularMovie).$update();

        // delete/remove methods
        $httpBackend.expectDELETE(matchAny, headerData ).respond(200);
        new PopularMovies(popularMovie).$remove();

        expect($httpBackend.flush).not.toThrow();
    });
});