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
        arbetsData.getAnnons(listing, function(response) {
        $scope.getAnnons = response.data.platsannons;
            
        });
        
    };
    
    $scope.showMarkerAnnonsData = function(listing) {
        arbetsData.getMarkerAnnons(listing, function(response) {
            $scope.getAnnons = response.data.platsannons;
        })
    }
    
    
    $scope.showActiveTopTen = function(topTenArray) {
        //console.log(topTenArray);
        highlightTopKommuner(topTenArray);
    }
    
    ////Angie added @H4Swe
    
    $scope.findActiveKommun = function(platsNamn) {
        findTheActiveKommun(platsNamn);
    }

    
   
    $scope.showActivePlats = function(platsId) {
        console.log('now running' + platsId);
        
        if (platsId != null) {
    
            if (platsId.length > 2) {
                var kommun = kommunData.features;
                for ( var i = 0; i < kommun.length; i ++ ) {
                    if ( platsId == kommun[i].properties.KOMMUNKOD ) {
                        console.log(kommun[i].properties.KOMMUNKOD);
                        highlightKommun(kommun[i].properties.KOMMUNKOD);
                    }
                 }
             
            } else {
                var lan = lanData.features;
                for ( var i = 0; i < lan.length; i ++ ) {
                    if ( platsId == lan[i].properties.LANSKOD ) {
                        console.log(lan[i].properties.LANSKOD);
                        highlightLan(lan[i].properties.LANSKOD);

                    }
                }    
            }
        
        }
    };
    
    
    $scope.sokJobb = function(platsId, yrkeId) {
        $scope.findYrkeId = function(yrke) {
           
            var matchId;
            
            for(var i = 0; i < yrkenData.length; i++){
                
                if(yrke.toLowerCase() === yrkenData[i].label.toLowerCase()){
                    matchId = yrkenData[i].id;
                }
                
            }
            
            $scope.sokJobb(platsId, matchId);
        };
        
        $scope.findPlatsId = function(plats) {
           
            var matchId;
            
            for(var i = 0; i < ortData.length; i++){
                
                if(plats.toLowerCase() === ortData[i].label.toLowerCase()){
                    matchId = ortData[i].id;
                }
                
            }
            $scope.sokJobb(matchId, yrkeId);
        };
        
        if( platsId == null && yrkeId != null ) {
            
            arbetsData.getTopPlatser(yrkeId, function(response) {
               
                
                var location = response.data.matchningslista.matchningdata;
                console.log(response.data);
                    var profsInKommun = [];
                  
                  for (var i = 0; i < location.length; i ++) {
                      
                    profsInKommun.push(location[i].kommunnamn)

                  }
            
                                    
                  
             var locTopList = compressArray(profsInKommun, platsId);     
                 
                  
             function compressArray(original) {

                    var compressed = [];
                    // make a copy of the input array
                    var copy = original.slice(0);

                    // first loop goes over every element
                    for (var i = 0; i < original.length; i++) {

                        var myCount = 0;	
                        // loop over every element in the copy and see if it's the same
                        for (var w = 0; w < copy.length; w++) {
                            if (original[i] == copy[w]) {
                                // increase amount of times duplicate is found
                                myCount++;
                                // sets item to undefined
                                delete copy[w];
                            }
                        }

                        if (myCount > 0) {
                            var a = new Object();
                            a.value = original[i];
                            a.count = myCount;
                            compressed.push(a);
                        }
                    }

                    return compressed;
                }
                  
                  
              // use slice() to copy the array and not just make a reference
                var locSort = locTopList.slice(0);
                locSort.sort(function(a,b) {
                    return b.count - a.count;
                });
                
                var platsTopTen = [];
                
                for (var i = 0; i < 10; i ++ ) {
                    
                    platsTopTen.push(locSort[i]);
                }
                
                $scope.topPlatser = platsTopTen;
                $scope.view = 'professions';
                
                
                
                var topTenList = [];
                for (var i = 0; i < platsTopTen.length; i ++) {
                    
                    topTenList.push(platsTopTen[i].value);
                }
                   $scope.showActiveTopTen(topTenList);

                
            });
            
            
            
            
        } else if( platsId != null && yrkeId == null ) {
            
            arbetsData.getTopYrken(platsId, function(response){
                 
                var profession = response.data.matchningslista.matchningdata;
                var jobsInKommun = [];

                  for (var i = 0; i < profession.length; i ++) {

                    jobsInKommun.push(profession[i].yrkesbenamning);

                  }

                var profTopList = compressArray(jobsInKommun);     


                function compressArray(original) {

                    var compressed = [];
                    // make a copy of the input array
                    var copy = original.slice(0);

                    // first loop goes over every element
                    for (var i = 0; i < original.length; i++) {

                        var myCount = 0;	
                        // loop over every element in the copy and see if it's the same
                        for (var w = 0; w < copy.length; w++) {
                            if (original[i] == copy[w]) {
                                // increase amount of times duplicate is found
                                myCount++;
                                // sets item to undefined
                                delete copy[w];
                            }
                        }

                        if (myCount > 0) {
                            var a = new Object();
                            a.value = original[i];
                            a.count = myCount;
                            compressed.push(a);
                        }
                    }

                    return compressed;
                }


              // use slice() to copy the array and not just make a reference
                var profSort = profTopList.slice(0);
                profSort.sort(function(a,b) {
                    return b.count - a.count;
                });

                var yrkeTopTen = [];

                for (var i = 0; i < 10; i ++ ) {

                    yrkeTopTen.push(profSort[i]);

                }
                $scope.topYrken = yrkeTopTen;
                $scope.view = 'locations';

            });

            
            
            
            
        } else if( platsId != null && yrkeId != null ) {
            
            if ( platsId.length > 2 ) {
                
                arbetsData.getListingsByKommun(yrkeId, platsId, function(response) {
                    $scope.getListingsByKommun = response.data.matchningslista.matchningdata;
                    $scope.view = 'kommunPane';
                    
                    var responseMatch = response.data.matchningslista.matchningdata;
                    
                    var annonsIdForMap = [];
                    
                    var addressArr = [];
                    for(var i = 0; i < responseMatch.length; i++) {
                        annonsIdForMap.push(responseMatch[i]);
                        arbetsData.getAnnons(responseMatch[i], function(response) {
                            
                            var annonsResponse = response.data.platsannons;
                            var annonsRubrik = response.data.platsannons.annons.annonsrubrik;
                            var annonsId = response.data.platsannons.annons.annonsid;
                            
                            
                            addressArr += annonsResponse.arbetsplats.besoksadress.toLowerCase() + ' ' + annonsResponse.arbetsplats.postort.toLowerCase();
                            
                            $scope.geocodeMarker(addressArr, annonsRubrik, annonsId);
                            
                            addressArr = [];
                            
                        });
                        
                        
                    }
                    
                });
                
                $scope.geocodeMarker = function(addressArr, annonsRubrik, annonsId) {
                    
                    //console.log(addressArr);
                    geocoder(addressArr, annonsRubrik, annonsId);
                };
                    
                };
                
            } else {
                
                arbetsData.getListingsByLan(yrkeId, platsId, function(response) {
                    $scope.getListingsByLan = response.data.matchningslista.matchningdata;
                    $scope.view = 'lanPane';
                });
            }
        }
    })
    
  

.controller('resultsPaneCtrl', function($scope, arbetsData) {
 
})
.controller('annonsPaneCtrl', function($scope, arbetsData) {
  
    
})
.controller('analysisPaneCtrl', function($scope) {
})
.controller('profPaneCtrl', function($scope) {
    
})

.controller('searchPaneCtrl', function($scope, $timeout, $q, arbetsData) {
    
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
        
        $scope.mainSok = function() {
           
            $scope.sokJobb(platsId, yrkeId);
            $scope.showActivePlats(platsId);
        };
        
    
});



