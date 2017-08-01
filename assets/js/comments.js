'use strict';

/*function getCommentsData(data) {
    createAuthorAvatar (data);
}

function createAuthorAvatar(data) {
    for(let index in data) {
        let itemComment = document.createElement('div');
        $(itemComment).addClass('item-comment');

        let avatarContainer = document.createElement('div');
        $(avatarContainer).addClass('commentAuthor');
        let avatar = document.createElement('img');

        $(avatar).attr('src', data[index].avatar);
        $(avatarContainer).append(avatar);
        $(itemComment).append(avatarContainer);
        $('.commentsContent').append(itemComment);
    }

    createCommentInfo (data);
}

function createCommentInfo(data) {
    for(let index in data) {
        let commentInfo = document.createElement('div');
        $(commentInfo).addClass('commentInfo');

        let commentHeader = document.createElement('div');
        $(commentHeader).addClass('commentHeader');

        //author title
        let  authorName = document.createElement('p');
        $(authorName).addClass('commentTitle').html(data[index].author);
        $(authorName).appendTo(commentHeader);

        //comment time ago
        let commentTime = document.createElement('span');
        $(commentTime).addClass('commentTime').html(moment(data[index].time, 'X').fromNow());
        $(commentTime).appendTo(commentHeader);

        //button
        let answerCommentBtn = document.createElement('button');
        let imageCommentBtn = document.createElement('img');
        $(imageCommentBtn).attr('src', '/assets/images/answer_Comment_Button.png');

        $(answerCommentBtn).addClass('btnAnswerComment').html(imageCommentBtn);
        $(answerCommentBtn).appendTo(commentHeader);

        //ip author
        let ip = document.createElement('span');
        $(ip).addClass('ip').html(data[index].ip);
        $(ip).appendTo(commentHeader);

        //ip title
        let ipTitle = document.createElement('span');
        $(ipTitle).addClass('ip-title').html('IP:&nbsp;');
        $(ipTitle).appendTo(commentHeader);

        let commentText = document.createElement('p');
        $(commentText).addClass('commentText').html(data[index].text);
        $(commentText).appendTo(commentHeader);

        $(commentHeader).appendTo(commentInfo);

        let itemComment = $('.item-comment')[index];
        $(commentInfo).appendTo(itemComment);
    }
}*/
