$(document).ready(function () {

    $('#containerHighcharts').highcharts({

        chart: {
            height: 283,
            type: 'area'
        },
        xAxis: {
            categories: [0, 2, 4, 6, 8, 10, 12, 14],
            gridLineWidth: 1

        },


        series: [{
            name: 'Total Visitors',
            data: [2000, 1000, 0, 600, 2000, 3000, 4000, 3000, 2000, 1000, 500, 1000, 1540, 3000, 4000, 3000, 2000, 1000, 600, 2000 ]

        }]
});

});


