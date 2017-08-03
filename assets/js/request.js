'use strict';

/*ajax request to comments data file*/
$.ajax({
    type:"GET",
    url:"/assets/json/comments-data.json"
}).done(function (data) {
    commentData(data); //pass data to function
}).fail(function (msg) {
    console.log(msg);
});