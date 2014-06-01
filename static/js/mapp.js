var map;
var place = new google.maps.LatLng(39.9995601, -30.1395161);
var place2 = new google.maps.LatLng(51.49506473014368, -0.087890625);



var locations = [
    [1, 'Saint-Petersburg!', 59.905467573267195, 30.3662109375],
    [2, 'Helsinki!',60.16884161373975, 24.93896484375],
    [3, 'Mikkeli!', 61.6794500443896, 27.26806640625],
    [4, 'London', 51.49506473014368, -0.087890625],
    [5, 'Rome', 41.86956082699455, 12.48046875],
    [6, 'Paris',48.83579746243093, 2.373046875],
    [7, 'New york', 40.713955826286046, -74.00390625],
    [8, 'San Francisco', 37.82280243352756, -122.3876953125]
];


var loc = [
    [
        "Location 1",
        "215 West Girard Avenue 19123",
        "39.9695601",
        "-75.1395161"
    ],
    [
        "Location 2",
        "5360 Old York Road 19141",
        "40.034038",
        "-75.145223"
    ],
    [
        "Location 3",
        "1350 W Girard Avenue 19123",
        "39.9713524",
        "-75.1590360"
    ]
];

var gmarkers = [];
var mark_id;
var html1,html2, html3, pointA, pointB;

var featureOpts = [
    {"featureType":"poi", "stylers":[ {"visibility":"on"} ]	},
    {"stylers":[ {"saturation":-50}, {"lightness":37}, {"gamma":1.15} ]	},
    {"elementType":"labels", "stylers":[ {"gamma":0.99}, {"visibility":"on"} ] },
    {"featureType":"road", "stylers":[ {"lightness":0}, {"saturation":0}, {"hue":"#ffffff"}, {"gamma":0} ] },
    {"featureType":"road",		               "elementType":"labels.text.stroke", "stylers":[ {"visibility":"off"} ] },
    {"featureType":"road.arterial",		       "elementType":"geometry", "stylers":[ {"lightness":20} ] },
    {"featureType":"road.highway",	           "elementType":"geometry", "stylers":[ {"lightness":50}, {"saturation":0}, {"hue":"#ffffff"} ] },
    {"featureType":"administrative.province",  "stylers":[ {"visibility":"on"}, {"lightness":-50} ]	},
    {"featureType":"administrative.province",  "elementType":"labels.text.stroke", "stylers":[ {"visibility":"off"} ] },
    {"featureType":"administrative.province",  "elementType":"labels.text", "stylers":[ {"lightness":20} ] }];


var MY_MAPTYPE_ID = 'custom_style';



/*$(document).ready(function(){
 navigator.geolocation.getCurrentPosition(initialize);
 });
 var myCenter=new google.maps.LatLng(location.coords.latitude,location.coords.longitude);*/


function initialize() {

    var static_files_url = $('#static_files_url').val();

    var mapOptions = {zoom: 3,minZoom:3, center: place, zoomControl: true, zoomControlOptions: {  style: google.maps.ZoomControlStyle.SMALL, position: google.maps.ControlPosition.LEFT_CENTER},panControl: false, scaleControl: false,streetViewControl:false, mapTypeControl:false, mapTypeControlOptions: { mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID] }, mapTypeId: MY_MAPTYPE_ID };

    map = new google.maps.Map(document.getElementById('mainmap'), mapOptions);

    var styledMapOptions = {
        name: 'Custom Style'
    };

    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

    map.mapTypes.set(MY_MAPTYPE_ID, customMapType);


    var infowindow = new google.maps.InfoWindow();

    //var side_bar_html = "";

    /*google.maps.event.addListener(map, "rightclick", function(event) {
     var lat = event.latLng.lat();
     var lng = event.latLng.lng();
     var text = lat + ', ' +  lng;
     window.prompt( 'Hello ', text);
     });*/

    function createMarker(html,pointA,pointB) {

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(pointA, pointB),
            map: map,
            icon: static_files_url + 'img/pin.png'
        });
        google.maps.event.addListener(marker, 'click', function() {
            map.panTo(marker.getPosition());
            //map.setZoom(8);
            infowindow.setContent('<div class="infowindowii">'+ html +'</div>');
            infowindow.open(map, marker);
        });




        return marker;
    }

    var stat_f_url = $('#static_files_url').val();
    var jsonfile =  stat_f_url + "js/cons.json";
    $.getJSON(jsonfile, function(data){
        for(var j in data){
            //console.log(j + ': '+ data[j][0] + ' - ' + data[j][1] + ' - ' + data[j][2] );
            var qwe ='<div class="infowindowii">Title: '+ data[j][1] +'<hr/>Address: '+  data[j][3] +'<hr/>Date: '+data[j][2] +'</div>'
            gmarkers[data[j][1]] = createMarker( qwe , data[j][4], data[j][5]);
            var date = data[j][2];
            date = date.split(' ');
            $('#mylist').append('<li class="mark_list" data-id="'+ j +'" onclick="google.maps.event.trigger(gmarkers[\''
                + data[j][1] +'\'],\'click\');"><span class="num hidd">'
                + j +'</span>  <div class="top_infoo"><span class="title">'+data[j][1]+'</span> <span class="'+ data[j][0] +' contype">('+ data[j][0] +' con)</span></div><br/> <div class="date">Date: <span class="dateday">'
                + date[0] + '</span> <span class="datemonth">'+ date[1] + '</span> <span class="dateyear">'
                + date[2] + '</span></div> </li>');
        }
    });
    /*for (var i = 0; i < locations.length; i++) {
        gmarkers[locations[i][0]] = createMarker( locations[i][1] , locations[i][2], locations[i][3]);
        side_bar_html += '<div class="mark_list"  onclick="google.maps.event.trigger(gmarkers[\'' + locations[i][0] +'\'],\'click\');">'+locations[i][1]+'</div>';
    }*/



    //document.getElementById("side_bar").innerHTML = side_bar_html;

}
google.maps.event.addDomListener(window, 'load', initialize);

