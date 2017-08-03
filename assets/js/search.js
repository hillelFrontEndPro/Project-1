
'use strict';


function validate() {
    var formElem = document.forms.searchForm.elements;

    for (var i = 0; i < formElem.length; i++) {
        if (formElem[i].name === 'searchInp') {
            if (formElem[i].value == "") {
                formElem[i].style.borderColor = 'red';

            } else {
                formElem[i].style.borderColor = 'green';
                if (formElem[i].style.borderColor = 'green') {

                }
            }
        }
    }
}


