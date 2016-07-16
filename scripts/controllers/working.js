'use strict';



angular.module('workMapApp')
.controller('navCtrl', function($scope, arbetsData, $timeout, $q) {
   
    
    
    $scope.layout = "searchPane";
    
    $scope.setWindowTitle = function(title) {
        $scope.windowTitle = title;
    }; 
    
    $scope.showSearchPane = function() {
        $scope.layout = "searchPane";
        var search = document.getElementById('searchTab');
        var results = document.getElementById('resultsTab');
        var annons = document.getElementById('annonsTab');
        var analysis = document.getElementById('analyticsTab');
        var prof = document.getElementById('profTab');
        
        search.style.backgroundColor = "#fff";
        results.style.backgroundColor = "#c03d33";
        annons.style.backgroundColor = "#c03d33";
        analysis.style.backgroundColor = "#c03d33";
        prof.style.backgroundColor = "#c03d33";
    };
    
    $scope.showResultsPane = function() {
        
        $scope.layout = "resultsPane";
        var search = document.getElementById('searchTab');
        var results = document.getElementById('resultsTab');
        var annons = document.getElementById('annonsTab');
        var analysis = document.getElementById('analyticsTab');
        var prof = document.getElementById('profTab');
        
        search.style.backgroundColor = "#27933a";
        results.style.backgroundColor = "#fff";
        annons.style.backgroundColor = "#27933a";
        analysis.style.backgroundColor = "#27933a";
        prof.style.backgroundColor = "#27933a";
    };
    
    $scope.showAnnonsPane = function() {
        $scope.layout = "annonsPane"; 
        var search = document.getElementById('searchTab');
        var results = document.getElementById('resultsTab');
        var annons = document.getElementById('annonsTab');
        var analysis = document.getElementById('analyticsTab');
        var prof = document.getElementById('profTab');
        
        search.style.backgroundColor = "#27933a";
        results.style.backgroundColor = "#27933a";
        annons.style.backgroundColor = "#fff";
        analysis.style.backgroundColor = "#27933a";
        prof.style.backgroundColor = "#27933a";
        
        
    };
    
    $scope.showAnalysisPane = function() {
        $scope.layout = "analysisPane"; 
        var search = document.getElementById('searchTab');
        var results = document.getElementById('resultsTab');
        var annons = document.getElementById('annonsTab');
        var analysis = document.getElementById('analyticsTab');
        var prof = document.getElementById('profTab');
        
        search.style.backgroundColor = "#27557c";
        results.style.backgroundColor = "#27557c";
        annons.style.backgroundColor = "#27557c";
        analysis.style.backgroundColor = "#fff";
        prof.style.backgroundColor = "#27557c";
    };
    
    $scope.showProfPane = function() {
        $scope.layout = "profPane";  
        var search = document.getElementById('searchTab');
        var results = document.getElementById('resultsTab');
        var annons = document.getElementById('annonsTab');
        var analysis = document.getElementById('analyticsTab');
        var prof = document.getElementById('profTab');
        
        search.style.backgroundColor = "#c08433";
        results.style.backgroundColor = "#c08433";
        annons.style.backgroundColor = "#c08433";
        analysis.style.backgroundColor = "#c08433";
        prof.style.backgroundColor = "#fff";
    };
    
    $scope.showAnnonsData = function(listing) {
        //console.log(listing);
        arbetsData.getAnnons(listing, function(response) {
            $scope.getAnnons = response.data.platsannons;
            
        });
        
    };
    
    $scope.sokResults = function() {
                
        arbetsData.getListings(profession, location, function(response) {
            $scope.getListings = response.data.matchningslista.matchningdata;
            console.log(response.data);
        });
        
    };
    
    
    $scope.showActiveKommun = function() {
    var kommunId = document.getElementById('kommunInput').value;
    var kommun = kommunData.features;
    for (var i = 0; i < kommun.length; i ++ ) {
        if ( kommunId == kommun[i].properties.KOMMUNNAMN ) {
            highlightKommun(kommun[i].properties.KOMMUNNAMN);
            console.log(kommun[i].properties.KOMMUNNAMN);
        } else {
            //console.log('this is not working');
        }
    }    
    
    };
})

.controller('resultsPaneCtrl', function($scope, arbetsData) {
 
})
.controller('annonsPaneCtrl', function($scope, arbetsData) {
  
    
})
.controller('analysisPaneCtrl', function($scope) {
    //$scope.setWindowTitle('Show secondary');
})
.controller('profPaneCtrl', function($scope) {
    //$scope.setWindowTitle('Show secondary');
    
})

.controller('searchPaneCtrl', function($scope, $timeout, $q, $http, arbetsData) {
    
    var self = this;
    var yrkeId;
    var platsId;
    
    self.simulateQuery = false;
        
    self.platsRepos = loadPlats();
    self.yrkeRepos = loadYrke();
        
    self.platsSearchText = null;    
    self.yrkeSearchText = null;
   
    self.platsSelectedItemChange = selectedPlatsChange;
    self.yrkeSelectedItemChange = selectedYrkeChange;
    
    self.platsQuerySearch = platsQuerySearch;
    self.yrkeQuerySearch = yrkeQuerySearch;    
        
    /////////// PLATS /////////////    
    
    function platsQuerySearch (query) {
    
    //console.log(self.repos);    
      var results = query ? self.platsRepos.filter( createFilterFor(query) ) : self.platsRepos,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
          
        return function() { return results;};
      }
    }
        
    function loadPlats() {       
        
        var typeLan = "län";
        var typeKommun = "kommun";
        
        function filterByPlats(obj) {
            if (obj.typ === typeLan || obj.typ === typeKommun){
                return true;
            } 
        }
        var arrPlats = ortData.filter(filterByPlats);
        
        return arrPlats.map( function(repo) {
            repo.value = repo.label.toLowerCase();
            return repo;
        });
            
    }
    
    function selectedPlatsChange(item) {
        platsId = item.id;
    }     
    
        
    /////////// YRKE /////////////////
    
    function yrkeQuerySearch (query) {
    
    //console.log(self.repos);    
      var results = query ? self.yrkeRepos.filter( createFilterFor(query) ) : self.yrkeRepos,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
          
        return function() { return results;};
      }
    }
        
    function loadYrke() {       
        
        var typeYrke = "yrke";
        
        function filterByYrke(obj) {
            if (obj.typ === typeYrke){
                return true;
            } 
        }
        var arrYrke = yrkenData.filter(filterByYrke);
        
        return arrYrke.map( function(repo) {
            repo.value = repo.label.toLowerCase();
            return repo;
        });
        
    }
    
    function selectedYrkeChange(item) {
        yrkeId = item.id;
    }  
        
    
    /// check filtered results against data ////
    
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        
        return function filterFn(item) {
            return (item.value.indexOf(lowercaseQuery) === 0);
        }; 
    }
    
    $scope.sokJobb = function() {
        
        if( platsId == null && yrkeId != null ) {
            console.log("yrke");
            
        } else if( platsId != null && yrkeId == null ) {
            console.log("plats");
            
        } else if( platsId != null && yrkeId != null ) {
            console.log("both");
            
            if ( platsId.length > 2 ) {
                
                arbetsData.getListingsByKommun(yrkeId, platsId, function(response) {
                    $scope.getListingsByKommun = response.data.matchningslista.matchningdata;
                    $scope.resultRepos = response.data.matchningslista.matchningdata;
                    console.log(response.data);
                });
                
            } else {
                
                arbetsData.getListingsByLan(yrkeId, platsId, function(response) {
                    $scope.getListingsByLan = response.data.matchningslista.matchningdata;
                    console.log(response.data);
                });
                
            }
            
            
            
        }
        
    };
    
    
});



