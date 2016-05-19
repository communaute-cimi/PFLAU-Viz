/*
 * Gestion des évennements dans la page index
*/
    // Variable globale pour la carte
var mymap,
    // Calque de données (globale)
    pflauLayer;

function initCarto() {
    /*
    * Initialisation
    */
    
    // console.log(new Date() + 'initCarto');

    // Activer le premier onglet
    $('#tabs a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });

    pflauLayer = new L.LayerGroup();
    
    mymap = L.map('mapid').setView([47.9178, 1.8935], 13);
        
    var osmFr = L.tileLayer('https://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        maxZoom : 18,
        attribution : 'Données : contributeurs <a href="http://openstreetmap.org">OpenStreetMap</a>'
    }).addTo(mymap);
    
    var osmOrg = L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom : 18,
        attribution : 'Données : contributeurs <a href="http://openstreetmap.org">OpenStreetMap</a>'
    }).addTo(mymap);
    
    // IGN
    var ignKey = "mu2al5oy08r9e9xzamilui2e";
    var layerIGNScanStd = "GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD";
    var url = "http://wxs.ign.fr/" + ignKey + "/geoportail/wmts";
   
    var ign = new L.TileLayer.WMTS(url, {
        layer : layerIGNScanStd,
        style : "normal",
        tilematrixSet : "PM",
        format : "image/jpeg",
        attribution : "<a href='https://github.com/mylen/leaflet.TileLayer.WMTS'>GitHub</a>&copy; <a href='http://www.ign.fr'>IGN</a>"
    }).addTo(mymap); 


    
    
    mymap.addLayer(pflauLayer);
    L.control.layers({"IGN France" : ign, "OpenStreetMap": osmOrg, "OpenStreetMap France" : osmFr}).addTo(mymap);
}

// Formulaire point
$("#frm_point").submit(function(event) {
    event.preventDefault();
    x = $('form#frm_point input[name=x]').val();
    y = $('form#frm_point input[name=y]').val();
    desc = $('form#frm_point textarea[name=desc]').val();

    var textPopup = desc.replace(/\n/g, "</br />");

    marker = L.marker(L.latLng(y, x)).addTo(mymap).bindPopup(textPopup);
    console.log(marker.addTo(pflauLayer));
    mymap.setView(marker.getLatLng());
});

// Formulaire arcband
$("#frm_arcband").submit(function(event) {
    event.preventDefault();
    
    var x = $('form#frm_arcband input[name=x]').val();
    var y = $('form#frm_arcband input[name=y]').val();
    var innerRadius = $('form#frm_arcband input[name=innerRadius]').val();
    var outerRadius = $('form#frm_arcband input[name=outerRadius]').val();
    var startAngle = $('form#frm_arcband input[name=startAngle]').val();
    var openingAngle = $('form#frm_arcband input[name=openingAngle]').val();
    var desc = $('form#frm_arcband textarea[name=desc]').val();
    
    var textPopup = desc.replace(/\n/g, "</br />");

    var polygon = L.polygon(calculateArcPoly(y, x, innerRadius, outerRadius, startAngle, openingAngle, 180)).addTo(mymap).bindPopup(textPopup);

    mymap.setView(polygon.getBounds().getCenter());
    
});

// Formulaire polygon
$("#frm_polygon").submit(function(event) {
    
    event.preventDefault();

    var vals = $('form#frm_polygon textarea[name=vals]').val();
    var desc = $('form#frm_polygon textarea[name=desc]').val();
    
    var aVals = vals.split(" ");
    var latLon = new Array(),
        y = 0,
        x = 0;
    var collection_latLon = new Array();

    // La donnée brute : une série de valeurs sans séparateur
    // Récupérer chaque série de x,y et créer une géométrie LeafLet
    for (var i = 0; i < aVals.length; i++) {
        // console.log (aVals[i]);
        if (i % 2 == true || i == 0) {

            latLon = new Array();
            x = aVals[i];
            // latLon.push(aVals[i]);
        } else {
            y = aVals[i];
            latLon.push(y);
            latLon.push(x);
            // console.log (latLon);
            collection_latLon.push(L.latLng(y, x));
        }
    }
    // console.log (collection_latLon);
    
    var textPopup = desc.replace(/\n/g, "</br />");
    
    polygon = L.polygon(collection_latLon).addTo(mymap).bindPopup(textPopup);
    mymap.setView(polygon.getBounds().getCenter());

});

// Formulaire ellipse
$("#frm_ellipse").submit(function(event) {
    event.preventDefault();
    
    x = $('form#frm_ellipse input[name=x]').val();
    y = $('form#frm_ellipse input[name=y]').val();
    var desc = $('form#frm_ellipse textarea[name=desc]').val();
    
    semiMajorAxis = $('form#frm_ellipse input[name=semiMajorAxis]').val();
    semiMinorAxis = $('form#frm_ellipse input[name=semiMinorAxis]').val();
    orientation = $('form#frm_ellipse input[name=orientation]').val();

    
    var textPopup = desc.replace(/\n/g, "</br />");
    // console.log(textPopup);
    var ellipse = L.ellipse([y, x], [semiMajorAxis, semiMinorAxis], orientation).addTo(mymap).bindPopup(textPopup);

    mymap.setView(ellipse.getBounds().getCenter());
});

// Géocodage sur nominatim (il faut que le cross domain soit accepté)
$("#frm_geocoding").submit(function(event) {
    event.preventDefault();

    place = $('form#frm_geocoding input[name=place]').val();
    var geocode = ' http://nominatim.openstreetmap.org/search?format=json&q=' + place;

    $.getJSON(geocode, function(data) {
        // console.log(data);
        try {
            console.log(data, data.length);
            if(data.length == 0) throw "Pas de résultat...";
            lat = data[0].lat;
            lon = data[0].lon;
            marker = L.marker(L.latLng(lat, lon)).addTo(mymap).bindPopup('<b>Géolocalisation : </b>' + "<br />" + data[0].display_name);
            mymap.setView(marker.getLatLng());
            
        } catch(e) {
            alert(e);
        }
    });
});

// Charger des données exemple pour les différentes géométries
$("#frm_load_samples_data").submit(function(event) {
    event.preventDefault();
    
    $.getJSON("datas/samples/point.json", function(data) {
        // console.log(data);
        try {
            // Chaine de caractères au format [y x]
            pos = data.Point.pos;
            aPos = pos.split(" ");
    
            // console.log(aPos);
            $('form#frm_point input[name=y]').val(aPos[0]);
            $('form#frm_point input[name=x]').val(aPos[1]);
            $('form#frm_point textarea[name=desc]').val(
                data.PhoneCall.NDI + "\n" + 
                data.PhoneCall.date + "\n" + 
                data.PhoneCall.id + "\n"
            );            
            
        } catch(e) {
            alert(e.message);
        }
    });

    $.getJSON("datas/samples/arcband.json", function(data) {
        // console.log(data);
        try {
            // Chaine de caractères au format [y x]
            pos = data.ArcBand.pos;
            aPos = pos.split(" ");
    
            // console.log(aPos);
            $('form#frm_arcband input[name=y]').val(aPos[0]);
            $('form#frm_arcband input[name=x]').val(aPos[1]);
            $('form#frm_arcband input[name=innerRadius]').val(data.ArcBand.innerRadius);
            $('form#frm_arcband input[name=outerRadius]').val(data.ArcBand.outerRadius);
            $('form#frm_arcband input[name=startAngle]').val(data.ArcBand.startAngle);
            $('form#frm_arcband input[name=openingAngle]').val(data.ArcBand.openingAngle);
            $('form#frm_arcband textarea[name=desc]').val(
                data.PhoneCall.NDI + "\n" + 
                data.PhoneCall.date + "\n" + 
                data.PhoneCall.id + "\n"
            );            
            
        } catch(e) {
            alert(e.message);
        }
    });
    
    $.getJSON("datas/samples/polygon.json", function(data) {
        
        try {
            // console.log(aPos);
            $('form#frm_polygon textarea[name=vals]').val(data.Polygon.posList);
            $('form#frm_polygon textarea[name=desc]').val(
                data.PhoneCall.NDI + "\n" + 
                data.PhoneCall.date + "\n" + 
                data.PhoneCall.id + "\n"
            );            
            
        } catch(e) {
            alert(e.message);
        }
    });    
    
    $.getJSON("datas/samples/ellipse.json", function(data) {
        // console.log(data);
        try {
            pos = data.Ellipse.pos;
            aPos = pos.split(" ");
    
            // console.log(aPos);
            $('form#frm_ellipse input[name=y]').val(aPos[0]);
            $('form#frm_ellipse input[name=x]').val(aPos[1]);
            $('form#frm_ellipse input[name=semiMajorAxis]').val(data.Ellipse.semiMajorAxis);
            $('form#frm_ellipse input[name=semiMinorAxis]').val(data.Ellipse.semiMinorAxis);
            $('form#frm_ellipse input[name=orientation]').val(data.Ellipse.orientation);
            $('form#frm_ellipse textarea[name=desc]').val(
                data.PhoneCall.NDI + "\n" + 
                data.PhoneCall.date + "\n" + 
                data.PhoneCall.id + "\n"
            );            
            
        } catch(e) {
            alert(e.message);
        }
    });     
});