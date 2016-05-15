var polygon;
// Formulaire Point
$("#frm_point").submit(function(event) {
    event.preventDefault();
    x = $('form#frm_point input[name=x]').val();
    y = $('form#frm_point input[name=y]').val();
    desc = $('form#frm_point textarea[name=desc]').val();

    marker = L.marker(L.latLng(y, x)).addTo(mymap).bindPopup(desc.replace("\n", "<br />"));
    mymap.setView(marker.getLatLng());
});

// Formulaire arcband
$("#frm_arcband").submit(function(event) {
    x = $('form#frm_arcband input[name=x]').val();
    y = $('form#frm_arcband input[name=y]').val();
    innerRadius = $('form#frm_arcband input[name=innerRadius]').val();
    outerRadius = $('form#frm_arcband input[name=outerRadius]').val();
    startAngle = $('form#frm_arcband input[name=startAngle]').val();
    openingAngle = $('form#frm_arcband input[name=openingAngle]').val();

    event.preventDefault();

    var polygon = L.polygon(calculateArcPoly(y, x, innerRadius, outerRadius, startAngle, openingAngle, 180)).addTo(mymap);

    mymap.setView(polygon.getBounds().getCenter());
    
});

// Formulaire polygon
$("#frm_polygon").submit(function(event) {

    // Valeurs brutes venant de la PFLAU
    var vals = $('form#frm_polygon textarea[name=vals]').val();
    var desc = $('form#frm_polygon textarea[name=desc]').val();

    event.preventDefault();
    var aVals = vals.split(" ");
    var latLon = new Array(),
        y = 0,
        x = 0;
    var collection_latLon = new Array();

    // La donnée brute, une série de valeurs sans séparateur
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
    polygon = L.polygon(collection_latLon).addTo(mymap).bindPopup(desc.replace("\n", "<br />"));
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

    console.log(semiMinorAxis);
    var ellipse = L.ellipse([y, x], [semiMajorAxis, semiMinorAxis], orientation).addTo(mymap).bindPopup(desc.replace("\n", "<br />"));

    mymap.setView(ellipse.getBounds().getCenter());
});

// Géocodage sur OSM (il faut que le cross domain soit accepté)
$("#frm_geocoding").submit(function(event) {
    event.preventDefault();

    // we are using MapQuest's Nominatim service
    place = $('form#frm_geocoding input[name=place]').val();
    var geocode = ' http://nominatim.openstreetmap.org/search?format=json&q=' + place;

    $.getJSON(geocode, function(data) {
        // console.log(data);
        try {
            lat = data[0].lat;
            lon = data[0].lon;
            marker = L.marker(L.latLng(lat, lon)).addTo(mymap).bindPopup('<b>Géolocalisation</b>' + "<br />" + data[0].display_name);
            mymap.setView(marker.getLatLng());
        } catch(e) {
            alert(e.message);
        }
    });
});

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

function displayPoint(x, y) {
    // console.log(x,y);
    try {
        L.marker([y, x]).addTo(mymap);
    } catch (e) {
        console.error(e.message);
        // Etouffer l'erreur :
        // Cannot read property 'lat' of null
    }

}