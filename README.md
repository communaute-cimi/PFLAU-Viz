# PFLAU Viz

**Visualiseur de données issues de la PFLAU**

<img src="/doc/img/header.png" width="800">

## Introduction

La PFLAU (PlateForme de Localisation des Appels d’Urgence) permet de localiser les appelants aux services d’urgence.

## Objectif

Permettre la représentation de données lorsque l'intégration de la PFLAU dans le SI n'est pas effective ou possible.

## Specifications 

Spécifications des web services : http://www.telecom.gouv.fr/normau/

<img src="/doc/img/sampleWS.png" width="800">

###ArcBand

```xml
<postTerminalLocation
	xmlns:dc="http://purl.org/dc/terms"
	xmlns:gml="http://www.opengis.net/gml"
	xmlns:gs="http://www.opengis.net/pidflo/1.0"
	xmlns:a="http://www.telecom.gouv.fr/normau/address"
	xmlns="http://www.telecom.gouv.fr/normau/messages">
	<PhoneCall>
		<dc:date>2013-02-09T15:27:39Z</dc:date>
		<id>FR750SDIS20140123456789012</id>
		<psapPhone>+33134511398</psapPhone>
		<psapId>FR750SDIS</psapId>
		<a:NDI>0123344556</a:NDI>
	</PhoneCall>
	<gs:ArcBand srsName="urn:ogc:def:crs:EPSG::4326">
		<gml:pos>48.856578 2.351828</gml:pos>
		<gs:innerRadius uom="urn:ogc:def:uom:EPSG::9001">1500</gs:innerRadius>
		<gs:outerRadius uom="urn:ogc:def:uom:EPSG::9001">1650</gs:outerRadius>
		<gs:startAngle uom="urn:ogc:def:uom:EPSG::9102">266</gs:startAngle>
		<gs:openingAngle uom="urn:ogc:def:uom:EPSG::9102">120</gs:openingAngle>
	</gs:ArcBand>
</postTerminalLocation>
```

###Polygon

```xml

<postTerminalLocation
	xmlns:dc="http://purl.org/dc/terms"
	xmlns:gml="http://www.opengis.net/gml"
	xmlns:a="http://www.telecom.gouv.fr/normau/address"
	xmlns="http://www.telecom.gouv.fr/normau/messages">
	<PhoneCall>
		<dc:date>2013-02-09T15:27:39Z</dc:date>
		<id>FR750SDIS20140123456789012</id>
		<psapPhone>+33134511398</psapPhone>
		<psapId>FR750SDIS</psapId>
		<a:NDI>0123344556</a:NDI>
	</PhoneCall>
	<gml:Polygon srsName="urn:ogc:def:crs:EPSG::4326" gml:id="localization">
		<gml:exterior>
		<gml:LinearRing>
		<gml:posList>
			48.856578 2.351828
			48.863791 2.340954
			48.874335 2.343999
			48.877666 2.357913
			48.870453 2.368786
			48.859909 2.365746
			48.856578 2.351828
		</gml:posList>
		</gml:LinearRing>
		</gml:exterior>
	</gml:Polygon>
</postTerminalLocation>

```

###Ellipse

```xml
<postTerminalLocation
	xmlns:dc="http://purl.org/dc/terms"
	xmlns:gml="http://www.opengis.net/gml"
	xmlns:gs="http://www.opengis.net/pidflo/1.0"
	xmlns:a="http://www.telecom.gouv.fr/normau/address"
	xmlns="http://www.telecom.gouv.fr/normau/messages">
	<PhoneCall>
		<dc:date>2013-02-09T15:27:39Z</dc:date>
		<id>FR750SDIS20140123456789012</id>
		<psapPhone>+33134511398</psapPhone>
		<psapId>FR750SDIS</psapId>
		<a:NDI>0123344556</a:NDI>
	</PhoneCall>
	<gs:Ellipse srsName="urn:ogc:def:crs:EPSG::4326"> 
		<gml:pos>48.884 2.245</gml:pos>
		<gs:semiMajorAxis uom="urn:ogc:def:uom:EPSG::9001">1600</gs:semiMajorAxis>
		<gs:semiMinorAxis uom="urn:ogc:def:uom:EPSG::9001">1550</gs:semiMinorAxis>
		<gs:orientation uom="urn:ogc:def:uom:EPSG::9102">142</gs:orientation>
	</gs:Ellipse>
</postTerminalLocation>
```


## Remerciements

Merci au [Réseau Régional pour l’Aide Médicale Urgente de Haute Normandie](http://rramuir.org/) (GCS RRAMUHN) pour le code source de calcul de l'arcband.

## Liens
* [Démo](http://heroteknik.ovh/viz/PFLAU-Viz/) (cliquer sur charger exemples)
* [Appels vitaux](https://twitter.com/LT_PFLAU) (compte twitter), mise en place de la PFLAU dans un SAMU. https://twitter.com/LT_PFLAU
* Ministère de la santé : [instruction DGOS/R2 no 2015-184 du 2 juin 2015](http://social-sante.gouv.fr/fichiers/bo/2015/15-07/ste_20150007_0000_0033.pdf) relative à la mise en service de la plateforme de localisation des appels d’urgence (PFLAU).



