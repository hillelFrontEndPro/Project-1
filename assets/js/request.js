'use strict';

/*ajax request to comments data file*/
$(document).ready($.ajax({
    type:"GET",
    url:"/assets/json/comments-data.json"
}).done(function (data) {
    getCommentsData(data); //pass data to function
}).fail(function (msg) {
    console.log(msg);
}));