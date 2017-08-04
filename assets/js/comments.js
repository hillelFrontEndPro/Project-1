'use strict';

let alldata;
let commentData = (data) => {
    alldata = data;
    //$('.item-comment').remove();
    data.forEach((item, index) => {
        createNewComment(data[index], index + 1, true);
        if (data.length === index + 1) {
            //$('.item-comment:last-child').remove();
            paginationComments(index + 1);
        }
    });
    defaultHideComment();
};

let createNewComment = (itemComment, index, fromjs) => {
    $('.item-comment:last-child .commentAuthorAva').attr('src', itemComment.avatar);
    $('.item-comment:last-child .author').html(itemComment.author);
    $('.item-comment:last-child .commentTime').html(moment(itemComment.time, 'X').fromNow());
    $('.item-comment:last-child .ip').html(itemComment.ip);
    $('.item-comment:last-child .textComment').html(itemComment.text);
    if (!fromjs && index === 11) {
        $(".item-comment:last-child").attr("display", "block !important");
    }
//call function clone item comment
    cloneItemComment(index, fromjs);
};

//function clone to comment content
let cloneItemComment = (index, fromjs) => {
    let commentWrap = $('[data-comment=0]').clone();
    $(commentWrap).attr('data-comment', index);
    $(commentWrap).appendTo('.commentsContent');
};

let addnewcomment = () => {
    let newcomment = {};
    let error=0;
    let name = $("#nameinput").val();
    if (!!name) {
        newcomment.author = name;
    } else {
        $("#nameinput").style.borderColor = 'red';
        error++;
    }

        let textcomment = $("#textinput").val()
    if (!!textcomment) {
        newcomment.text = $("#textinput").val();
    } else {
        $("#textinput").style.borderColor = 'red';
        error++;
    }
    newcomment.avatar = randomAvatar();
    newcomment.time = "170154278";
    newcomment.ip = "213.12.5.9";
    newcomment.hasAnswer = "";
    if (error===0) {
        alldata.splice(0, 0, newcomment);
        createNewComment(newcomment, alldata.length, false);
        paginationComments(alldata.length);
        defaultHideComment();
        let page = alldata.length / 3 + 1;
        console.log(alldata.length + 1);

    }
    //hideComment(page);
};

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomAvatar = () => {
    const src = [
        'assets/images/commentAuthor_1.png',
        'assets/images/commentAuthor_2.png',
        'assets/images/commentAuthor_3.png'
    ][rand(0, 2)];
    return src;
};

