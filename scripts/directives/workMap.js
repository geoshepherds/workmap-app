angular.module('workMapApp')
.directive('workMap', function() {
    return {
        templateUrl: 'templates/frame.html'
    }; //template returning an object
})
.directive('searchPane', function() {
    return {
        controller: 'searchPaneCtrl',
        link: link,
        templateUrl: 'templates/annonsSok.html'
    };
    
    function link( scope, element, attributes ) {
        //console.log('Primary layout working');        
    }
})
.directive('resultsPane', function() {
    return {
        controller: 'resultsPaneCtrl',
        link: link,
        templateUrl: 'templates/annonsListing.html'
    };
    
    function link( scope, element, attributes ) {
        //console.log('Secondary layout working');        
    }
})
.directive('annonsPane', function() {
    return {
        controller: 'annonsPaneCtrl',
        link: link,
        templateUrl: 'templates/annonsPost.html'
    };
    
    function link( scope, element, attributes ) {
        //console.log('Secondary layout working');        
    }
})
.directive('analysisPane', function() {
    return {
        controller: 'analysisPaneCtrl',
        link: link,
        templateUrl: 'templates/analysis.html'
    };
    
    function link( scope, element, attributes ) {
        //console.log('Secondary layout working');        
    }
})
.directive('profPane', function() {
    return {
        controller: 'profPaneCtrl',
        link: link,
        templateUrl: 'templates/profProf.html'
    };
    
    function link( scope, element, attributes ) {
        //console.log('Secondary layout working');        
    }
})
.directive('kommuner', function() {
    return {
        templateUrl: 'templates/kommuner.html',
        controller: 'resultsPaneCtrl'
    };
})
.directive('lan', function() {
    return {
        templateUrl: 'templates/lan.html',
        controller: 'resultsPaneCtrl'
    };
})
.directive('professions', function() {
    return {
        templateUrl: 'templates/profResult.html',
        controller: 'resultsPaneCtrl'
    };
})
.directive('locations', function() {
    return {
        templateUrl: 'templates/locResult.html',
        controller: 'resultsPaneCtrl'
    };
})
;