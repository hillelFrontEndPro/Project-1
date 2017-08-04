'use strict';

let commentData = (data) => {
    data.forEach( (item, index) => {
        createNewComment(data[index], index+1);
        if (data.length === index+1) {
            $('.item-comment:last-child').remove();
            paginationComments(index+1);
        }
    });
    defaultHideComment();
};

let createNewComment = (itemComment, index) => {
    $('.item-comment:last-child .commentAuthorAva').attr('src', itemComment.avatar);
    $('.item-comment:last-child .author').html(itemComment.author);
    $('.item-comment:last-child .commentTime').html(moment(itemComment.time, 'X').fromNow());
    $('.item-comment:last-child .ip').html(itemComment.ip);
    $('.item-comment:last-child .textComment').html(itemComment.text);

    //call function clone item comment
    cloneItemComment(index);
};

//function clone to comment content
let cloneItemComment = (index) => {
    let commentWrap = $('[data-comment=0]').clone();
    $(commentWrap).attr('data-comment', index);
    $(commentWrap).appendTo('.commentsContent');
};
