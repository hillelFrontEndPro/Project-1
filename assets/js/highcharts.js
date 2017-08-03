$(document).ready(function () {

    $('#containerHighcharts1').highcharts({

        chart: {
            marginRight: 0,
            marginBottom: 25,
            width: 700,
            height: 210,
            type: 'area'
        },
        xAxis: {
            categories: [0, 2, 4, 6, 8, 10, 12, 14]


        },

        series: [{
            name: 'Total Visitors',
            data: [2000, 1000, 0, 600, 2000, 3000, 4000, 3000, 2000, 1000, 500, 1000, 1540, 3000, 4000, 3000, 2000, 1000, 600, 2000 ]

        }]
});

    $('#containerHighcharts2').highcharts({


        chart: {
            marginRight: 0,
            marginBottom: 25,
            width: 700,
            height: 210
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        },


        series: [{
            name: 'Total Orders',
            data: [100000, 125000, 150000, 110000, 90000, 140000, 200000, 250000, 190000, 160000, 260000, 210000 ]

        }]
    });


    $('#containerHighcharts3').highcharts({


        chart: {
            marginRight: 0,
            marginBottom: 25,
            width: 700,
            height: 210,
            type: 'area'
        },

        xAxis: {
            categories: [2013, 2014, 2015, 2016, 2017]

        },


        series: [{
            name: 'Total Users',
            data: [50000, 170000, 350000, 500000, 600000 ],
            type: 'column'

        }]

    });
});


