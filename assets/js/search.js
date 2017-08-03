/**
 * Created by sergeygalchenko on 03.08.17.
 */
'use strict';

function validateForm() {
    valid = true;

    if ( document.searchForm.searchInp.value === "" )
    {
        alert ( "Пожалуйста, заполните поле 'Search...'.");
        // document.searchForm.searchInp.style.borderColor = 'red';
        valid = false;
    }
}