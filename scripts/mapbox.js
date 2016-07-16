L.mapbox.accessToken = "pk.eyJ1IjoiYW5nZWxpY2E4OCIsImEiOiJjaWkwbHg3bzQwMGZodzFrcDNzbDEzdDg2In0.dFEwN7LlvC-Ud1GTzcTT4w";
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([62.71446210149774, 14.1064453125], 5);



var activePlats;

function highlightKommun(kommunId) {
    
     
    var overlayPane = document.getElementsByClassName('leaflet-overlay-pane')[0];
    
    if( overlayPane.children.length > 0 ) {
        activePlats.clearLayers();
    }
    
//load map polygons
    activePlats = L.geoJson(kommunData, {
        style: getStyle,
        filter: function(feature, layer) {
            return feature.properties.KOMMUNKOD == kommunId;
        }
    }).addTo(map);


    function getStyle(feature) {
        return {
            weight: '4px',
            opacity: 0.5,
            color: '#09691a',
            fillOpacity: 0,
            fillColor: '#fff'
            
        }
    }
    
    var bounds = activePlats.getBounds();
    
    map.fitBounds(bounds, {
        maxZoom: 11,
        pan: {
            animate: true
        }
        
    });
    
    
}
//////////Angie change during H4S
function findTheActiveKommun(kommunNamn) {
   
    console.log(kommunNamn);
     
    var overlayPane = document.getElementsByClassName('leaflet-overlay-pane')[0];
    
    if( overlayPane.children.length > 0 ) {
        activePlats.clearLayers();
    }
    
//load map polygons
    activePlats = L.geoJson(kommunData, {
        style: getStyle,
        filter: function(feature, layer) {
            
                 return feature.properties.KOMMUNNAMN == kommunNamn
                
            }
        
    }).addTo(map);


    function getStyle(feature) {
        return {
            weight: 1,
            opacity: 0,
            color: '#fff',
            fillOpacity: 0.7,
            fillColor: '#09691a'
        }
    }
    
    var bounds = activePlats.getBounds();
    
    map.fitBounds(bounds, {
        maxZoom: 11,
        pan: {
            animate: true
        }
        
    });
    
    
}




function highlightTopKommuner(kommunArray) {
   
    
     
    var overlayPane = document.getElementsByClassName('leaflet-overlay-pane')[0];
    
    if( overlayPane.children.length > 0 ) {
        activePlats.clearLayers();
    }
    
//load map polygons
    activePlats = L.geoJson(kommunData, {
        style: getStyle,
        filter: function(feature, layer) {
            
                 return feature.properties.KOMMUNNAMN == kommunArray[0] || feature.properties.KOMMUNNAMN == kommunArray[1] || feature.properties.KOMMUNNAMN == kommunArray[2] || feature.properties.KOMMUNNAMN == kommunArray[3] || feature.properties.KOMMUNNAMN == kommunArray[4] || feature.properties.KOMMUNNAMN == kommunArray[5] || feature.properties.KOMMUNNAMN == kommunArray[6] || feature.properties.KOMMUNNAMN == kommunArray[7] || feature.properties.KOMMUNNAMN == kommunArray[8] || feature.properties.KOMMUNNAMN == kommunArray[9];
                
            }
        
    }).addTo(map);


    function getStyle(feature) {
        return {
            weigth: 1,
            opacity: 0.5,
            color: '#09691a',
            fillOpacity: 0,
            fillColor: '#fff'
        }
    }
    
    var bounds = activePlats.getBounds();
    
    map.fitBounds(bounds, {
        maxZoom: 5,
        pan: {
            animate: true
        }
        
    });
    
    
}//////////////



function highlightLan(lanId) {
     
    var overlayPane = document.getElementsByClassName('leaflet-overlay-pane')[0];
    var markerPane = document.getElementsByClassName('leaflet-marker-pane')[0];
    
    if( overlayPane.children.length > 0 ) {
        activePlats.clearLayers();
    }
    
    
    
//load map polygons
    activePlats = L.geoJson(lanData, {
        style: getStyle,
        filter: function(feature, layer) {
            return feature.properties.LANSKOD == lanId;
        }
    }).addTo(map);


    function getStyle(feature) {
        return {
            weigth: 1,
            opacity: 0.5,
            color: '#09691a',
            fillOpacity: 0,
            fillColor: '#fff'
        }
    }
    
    var bounds = activePlats.getBounds();
    
    map.fitBounds(bounds, {
        maxZoom: 11,
        pan: {
            animate: true
        }
        
    });
    
    
}


//////geocoder

function geocoder(addressArr, annonsRubrik, annonsId) {
    
    MQ.geocode().search(addressArr).on('success', function(e) {
    var best = e.result.best,
    latlng = best.latlng;
        
    var myIcon = L.icon({
        iconUrl: '/workMapApp/data/jobicon.png',
        iconSize: [25, 36],
        iconAnchor: [12.5, 17],
        popupAnchor: [0, -15],
        shadowUrl: '/workMapApp/data/shadow_jobicon.png',
        shadowSize: [30, 17],
        shadowAnchor: [15, -10]
    });    

    L.marker([ latlng.lat, latlng.lng ], {
        icon: myIcon
    })
    .addTo(map)
    .bindPopup()
    .on('mouseover', function(e){
        this.openPopup();
        document.get
    })
    .on('mouseout', function(e){
        this.closePopup();
    })
    .on('click', function(e){
       
        angular.element(document.getElementById('container')).scope().showAnnonsPane(); 
        angular.element(document.getElementById('container')).scope().showMarkerAnnonsData(annonsId);
        map.setView(e.latlng, 12);
    })
    .setPopupContent(annonsRubrik)
});
}

