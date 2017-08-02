
$(document).ready(function () {

    $( function() {
        $( "#datepickerBlock" ).datepicker({
            changeMonth: true,
            changeYear: true,
            onSelect: function (date) {
                $('#datepicker').text(date);
            }

        });

    });
});