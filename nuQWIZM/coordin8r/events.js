"use strict";

var QWIZM = QWIZM || {};
$(document).ready(function () {
    $('.label').hide();
    // event handler must precede method call
    var label = function (e) {
        var offset = $(this).parent().offset(),
            imageLeft = Math.round(offset.left),
            imageTop = Math.round(offset.top),
            imageWidth = Math.round($('img').width()),
            imageHeight = Math.round($('img').height()),
            str = ``,
            // labelWidth = null,
            // labelHeight = null,
            relX = Math.round(e.pageX - imageLeft),
            relY = Math.round(e.pageY - imageTop),
            label = `1.234 mm`,
            xper = Math.round(relX / imageWidth * 100),
            yper = Math.round(relY / imageHeight * 100),
            labelW = Math.round($('.label').width()),
            labelH = Math.round($('.label').height());

        str += `left: ${xper}%, top: ${yper}%`;

        $('.coords').text(str);
        // $('.label').text('123.4 mm');

        $('.command').text(labelW + ', ' + labelH);
        // $('.label').css({
        //     left: relX + imageLeft - 20,
        //     top: relY + imageTop - 20
        // });
    };







    $('img').on('mouseenter', function (e) {
        $('.label').show();
    });
    $('img').on('mouseleave', function (e) {
        // $('.label').hide();
        $('.coords').text('Coords');
    });
    $('img').on('mousemove', label);


});