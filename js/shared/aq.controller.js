(function () {
    'use strict';
    angular.module('edu.ucar.scied.aq.controller', ['nvd3'])
        .controller('homeCtrl', homeCtrl)
        .controller('graphCtrl', graphCtrl);

    homeCtrl.$inject = ['$scope'];

    function homeCtrl($scope) {
        // $scope.myData = [40,100,80,15,25,60,10];
        $scope.data = [{
            key: "Ozone",
            color: "blue",
            values: [
                {
                    x: 1,
                    y: 1
            }]
        }];
        $scope.data[0].values = [];
        var margin = {
                top: 30,
                right: 20,
                bottom: 90,
                left: 100
            },
            width = 1080 - margin.left - margin.right,
            height = 720 - margin.top - margin.bottom;

        // Parse the date / time
        var parseDate = d3.time.format("%d-%m-%y %H:%M:%S").parse;
        var minDate, maxDate;
        var xScale = d3.time.scale()
            .range([0, width]),
            yScale = d3.scale.linear()
            .range([height, 0]);
        $scope.options = {
            chart: {
                type: 'lineChart',
                margin: margin,
                width: width,
                height: height,
                x: function (d) {
                    return d.x;
                },
                y: function (d) {
                    return d.y;
                },
                highlightPoint: false,
                showLegend: false,
                reduceXTicks: false,
                xAxis: {
                    tickFormat: function (d) {
                        return d3.time.format('%b-%d %H:%M:%S')(new Date(d));
                    },
                    rotateLabels: -45
                },

                yAxis: {
                    axisLabel: 'Ozone (ppm)',
                    tickFormat: function (d) {
                        return d3.format(',.1f')(d);
                    }
                },
                transitionDuration: 500,
                useInteractiveGuideline: false,
                tooltip: {
                    enabled: false
                }

            },

            title: {
                enable: true,
                text: 'Ozone (ppm) today'
            },
            subtitle: {
                enable: true,
                text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet...',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            },
            // caption options
            caption: {
                enable: true,
                html: 'Figure 1. Lorem ipsum dolor sit amet...',
                css: {
                    'text-align': 'justify',
                    'margin': '10px 13px 0px 7px'
                }
            }
        };



        $scope.data[0].values = [];
        // This is for timing

        // Run when called
        var run = true;

        retrieveData('oneweek');


        // Call the populate function every second
        // setInterval(function () {
         // if (!run) return;

        /* Determine the amount of time required to execute the chart 
         * update.
         */
       // $scope.api.update();

       //   }, 2000);

        /* d3.select("#start-stop-button").on("click", function () {
             run = !run;
         });
         */

        d3.select("#oneweek-button").on('click', function () {
            
            $scope.data[0].values = [];
            update();
            retrieveData('oneweek');
            update();
        });
        
        d3.select("#onemonth-button").on('click', function () {
            $scope.data[0].values = [];
            update();
            retrieveData('onemonth');
            update();
        });
        
        d3.select("#oneyear-button").on('click', function () {
            $scope.data[0].values = [];
            update();
            retrieveData('oneyear');
            update();
        });

        function update(){
            $scope.api.update();
        }
        function formatTime(unixTimestamp) {
            var dt = new Date(unixTimestamp * 1000);

            var hours = dt.getHours();
            var minutes = dt.getMinutes();
            var seconds = dt.getSeconds();

            var day = dt.getDate();
            var month = dt.getMonth();
            var year = dt.getYear();

            if (hours < 10)
                hours = '0' + hours;

            if (minutes < 10)
                minutes = '0' + minutes;

            if (seconds < 10)
                seconds = '0' + seconds;

            return day + '-' + month + '-' + year + ' ' + hours + ":" + minutes + ":" + seconds;
        }

        function retrieveData(range) {

            $scope.data[0].values = [];
            // alert('retrieving')

            /* for testing generate a random set of dates and data */
            var now = Date.now();
            var maxDate = now;

            switch (range) {
                case 'oneweek':
                    var oneweek = 60 * 60 * 24 * 7 * 1000;
                    var minDate = now - oneweek;
                    break;
                case 'onemonth':
                    var onemonth = 60 * 60 * 24 * 30 * 1000;
                    var minDate = now - onemonth;
                    break;
                case 'oneyear':
                    var oneyear = 60 * 60 * 24 * 365 * 1000;
                    var minDate = now - oneyear;
                    break;
            }

            // 5 minutes
            var timeDiff = 60 * 5 * 1000;
            var date = minDate;
            var y = 35;
            var dir = 'increase';
            for (var i = minDate; i <= maxDate; i += timeDiff) {
                if (dir == 'increase') {
                    if (y < 89) {
                        y += Math.floor(Math.random() * 6) + 1;
                    } else {
                        dir = 'decrease';
                        y -= Math.floor(Math.random() * 15) + 1;;
                    }
                } else if (dir == 'decrease') {
                    if (y > 30) {
                        y -= Math.floor(Math.random() * 6) + 1;;
                    } else {
                        dir = 'increase';
                        y += Math.floor(Math.random() * 20) + 1;;
                    }
                }
                date = new Date(i);
                $scope.data[0].values.push({
                    x: new Date(i),
                    y: +y
                });
                console.log(new Date(i) + ' ' + y);
            }

            //$scope.api.update();
            /*d3.csv("data/data.csv", function (error, data) {
                data.forEach(function (d) {
                    var x = parseDate(d.day.replace(/\//g, '-') + ' ' + d.time);
                    var y = parseFloat(((d.ozone.replace('$', '') * 0.9561) + 0.99461));
                    //maxDate = x.getTime();
                    //minDate = maxDate - 8645000;
                    $scope.data[0].values.push({
                        x: x,
                        y: +y
                    });
                });
                
                $scope.api.update();
                //$scope.api.getScope().chart.brushExtent([minDate,maxDate]);
            });*/
        }

    }


    graphCtrl.$inject = ['$scope'];

    function graphCtrl($scope) {
        $scope.creditstitle = "Credits and Acknowledgements";
        $scope.showCreditsModal = false;

        // handle credits modal
        $scope.toggleCreditsModal = toggleCreditsModalFunc;

        // credits close btn
        $scope.closeModal = closeModalFunc;

        function closeModalFunc() {
            $scope.showCreditsModal = !$scope.showCreditsModal;
        }

        function toggleCreditsModalFunc() {
            $scope.showCreditsModal = !$scope.showCreditsModal;
        }
    }
})();
