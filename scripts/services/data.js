'use strict';

angular.module('workMapApp')
    .service('arbetsData', function($http) {
    
     
    this.getListingsByLan = function(yrke, lan, callback) {
        $http.get("http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=" + lan + "&yrkesid=" + yrke, {
                  headers: {
                      "Allow-Control-Allow-Origin" : "*",
                      "Accept-Language" : "sv"
                  }
              })
              .then(callback);

              }; 
    
    this.getListingsByKommun = function(yrke, kommun, callback) {
        $http.get("http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?kommunid=" + kommun + "&yrkesid=" + yrke, {
                  headers: {
                      "Allow-Control-Allow-Origin" : "*"
                  }
              })
              .then(callback); 
    };
    
    this.getAnnons = function(listing, callback) {
        
        var annonsId = listing.annonsid;
        
        $http.get("http://api.arbetsformedlingen.se/af/v0/platsannonser/" + annonsId, {
            headers: {
                      "Allow-Control-Allow-Origin" : "*"
                }
            })
            .then(callback);
    };
    
    this.getMarkerAnnons = function(listing, callback) {
        
        $http.get("http://api.arbetsformedlingen.se/af/v0/platsannonser/" + listing, {
            headers: {
                        "Allow-Control-Allow-Origin" : "*",
                        "Accept-Language" : "sv",
                        "Accept" : "application/json"
                }
            })
            .then(callback);
    };
    
    this.getTopYrken = function(plats, callback) {
        
        if(plats.length > 2) {
            $http.get('http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?kommunid=' + plats + '&antalrader=10000', {
                  headers: {
                      "Allow-Control-Allow-Origin" : "*"
                  }
              })
              .then(callback); 
        } else {
            $http.get('http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=' + plats + '&antalrader=10000', {
                  headers: {
                      "Allow-Control-Allow-Origin" : "*"
                  }
              })
              .then(callback); 
        }
           
    };
    
    this.getTopPlatser = function(yrke, callback) {

        $http.get('http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?yrkesid=' + yrke + '&antalrader=10000', {
            headers: {
                "Allow-Control-Allow-Origin" : "*"
            }
        })
        .then(callback);            
    };
    
    
        
});
