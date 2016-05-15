/*
* Retourne les points constituant un arcband PFLAU
* Code source RRAMUHN : contact@rramuhn.org
*/

// segments = densification de l'arc

function calculateArcPoly(centerLat, centerLon, radiusInt, radiusExt, startAngle, endAngle, segments) {

    var pointList = [],
        point,
        i,
        dInt = radiusInt / 1000, // d = distance in km
        dExt = radiusExt / 1000,
        R = 6371, // km, R = earth's radius (mean radius = 6,371km)
        lat1 = deg2Rad(centerLat),
        lon1 = deg2Rad(centerLon),
        lat2,
        lon2,
        dAngle = segments + 1,
        azimuth;

    startAngle = deg2Rad(startAngle);

    endAngle = deg2Rad(endAngle);

    for ( i = 0; i < dAngle; i++) {
        azimuth = startAngle - (startAngle - endAngle) * i / (dAngle - 1);
        lat2 = Math.asin(Math.sin(lat1) * Math.cos(dExt / R) + Math.cos(lat1) * Math.sin(dExt / R) * Math.cos(azimuth));
        lon2 = lon1 + Math.atan2(Math.sin(azimuth) * Math.sin(dExt / R) * Math.cos(lat1), Math.cos(dExt / R) - Math.sin(lat1) * Math.sin(lat2));
        lat2 = 180 * lat2 / Math.PI;
        lon2 = 180 * lon2 / Math.PI;
        var point = L.latLng(lat2, lon2);
        // console.log("Point Ext."+i+" : "+lat2+' '+lon2);
        pointList.push(point);

    }

    for ( i = dAngle - 1; i >= 0; i--) {
        azimuth = startAngle - (startAngle - endAngle) * i / (dAngle - 1);
        lat2 = Math.asin(Math.sin(lat1) * Math.cos(dInt / R) + Math.cos(lat1) * Math.sin(dInt / R) * Math.cos(azimuth));
        lon2 = lon1 + Math.atan2(Math.sin(azimuth) * Math.sin(dInt / R) * Math.cos(lat1), Math.cos(dInt / R) - Math.sin(lat1) * Math.sin(lat2));
        lat2 = 180 * lat2 / Math.PI;
        lon2 = 180 * lon2 / Math.PI;
        var point = L.latLng(lat2, lon2);
        //console.log("Point Int."+i+" : "+lat2+' '+lon2);
        pointList.push(point);
    }

    return pointList;
}

function deg2Rad(degrees) {
    return degrees * Math.PI / 180;
}