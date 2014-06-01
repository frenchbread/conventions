$(function(){
    $('#topmenu').hover(
        function() {
             $(this).find('#menulist').stop(true, true);
             $(this).find('#menulist').fadeIn('fast');
        },
        function() {
            $(this).find('#menulist').fadeOut('fast');
        }
    );

    /*-------------------*/

     $("#menulist li").click(function () {
        window.location = $(this).find("a").attr("href");
        return false;
    });

    var this_height = $('.header').css('height');

    $('#side_bar').css('top', this_height);
    $('.prof_page').css('margin-top', this_height);

    var jsonfile = 'static/assets/js/';
    $.getJSON(jsonfile + 'cons.json' , function(data){
        for(var j in data){
            var date = data[j][2];
            date = date.split(' ');
            $('.home_conts').append('<li class="homebigbox">' +
                '<div class="homebigboxtop">'+data[j][1]+'</div>' +
                '<div class="date"><span class="dateday">'
                + date[0] + '</span> <span class="datemonth">'+ date[1] + '</span> <span class="dateyear">'
                + date[2] + '</span></div>' +
                '</li>');
        }
    });


    $('#topmenu.opnthis').click(function(){
        $('#side_bar').fadeToggle('fast');
    });

    var stat_f_url = $('#static_files_url').val();

    var icon_file_home = "url('" + stat_f_url + "img/map.png')";
    var icon_file_map = "url('" + stat_f_url + "img/map-2.png')";
    var icon_file_about = "url('" + stat_f_url + "img/bookshelf.png')";
    var icon_file_help = "url('" + stat_f_url + "img/medicine.png')";
    var icon_file_marker = "url('" + stat_f_url + "img/marker.png')";
    var icon_file_login = "url('" + stat_f_url + "img/packman.png')";
    var icon_file_logout = "url('" + stat_f_url + "img/skull.png')";

    var jsonfile =  stat_f_url + "js/name.json";
    $('#getthisshit').val(jsonfile);

    var homebg = "url('" + stat_f_url + "img2/party.jpg')";
    var profbg = "url('" + stat_f_url + "img2/5.jpg')";
    var thislogo = "url('" + stat_f_url + "img2/concavelogo2.png')";

    $('div.icon.home').css('background-image', icon_file_home );
    $('div.icon.map').css('background-image', icon_file_map );
    $('div.icon.about').css('background-image', icon_file_about );
    $('div.icon.help').css('background-image', icon_file_help    );
    $('div.icon.marker').css('background-image', icon_file_marker   );
    $('div.icon.login').css('background-image', icon_file_login   );
    $('div.icon.logout').css('background-image', icon_file_logout   );
    $('#homee ').css('background-image', homebg );
    $('.prof_page').css('background-image', profbg );
    //$('.header').css('background-image', thislogo );


});