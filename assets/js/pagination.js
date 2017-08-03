'use strict';

//start pagination function
let paginationComments = (items) => {
    $('#light-pagination').pagination({
        items: items,
        itemsOnPage: 3,
        cssStyle: 'light-theme'
    });
};
