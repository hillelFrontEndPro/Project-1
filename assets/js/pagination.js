'use strict';

//start pagination function
let paginationComments = (items) => {
    $('#light-pagination').pagination({
        items: items,
        itemsOnPage: 3,
        prevText: '',
        nextText: '',
        cssStyle: 'light-theme',
        onPageClick(pageNumber, event) {
            hideComment(pageNumber);
        }
    });
};

let defaultHideComment = () => {
    let comments = $('.commentsContent').children();
    console.log(comments);
    for (let i = 3; i < comments.length; i++) {
        comments[i].classList.add('hide-comment');
    }
};

let hideComment = (pageNumber) => {
    $('.item-comment').css('display', 'none');

    let comments = $('.commentsContent').children();
    let i = pageNumber*3 - 3;

    for (i; i < pageNumber*3; i++){
        $(comments[i]).css('display', 'block');
    }
};

