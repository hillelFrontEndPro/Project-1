/**
 * Created by sergeygalchenko on 31.07.17.
 */
'use strict';

$(document).ready(function() {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
        //Получить название активной вкладки
        var activeTab = $(e.target).text();
        // Получить название предыдущей активной вкладки
        var previousTab = $(e.relatedTarget).text();
        $(".tab-active span").html(activeTab);
        $(".tab-previous span").html(previousTab);
    });

    $('[data-toggle="tooltip"]').tooltip();
});