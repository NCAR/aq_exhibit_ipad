(function () {
    'use strict';
    angular.module('edu.ucar.scied.aq.controller', ['nvd3'])
        .controller('homeCtrl', homeCtrl)
        .controller('graphCtrl', graphCtrl);

    homeCtrl.$inject = ['$scope'];

    function homeCtrl($scope) {
        // $scope.myData = [40,100,80,15,25,60,10];
        var margin = {
                top: 30,
                right: 20,
                bottom: 90,
                left: 100
            },
            width = 1600 - margin.left - margin.right,
            height = 800 - margin.top - margin.bottom;

        // Parse the date / time
        var parseDate = d3.time.format("%d-%m-%y %H:%M:%S").parse;
var minDate, maxDate;
        var xScale = d3.time.scale()
            .range([0, width]),
            yScale = d3.scale.linear()
            .range([height, 0]);
        $scope.options = {
            chart: {
                type: 'lineWithFocusChart',
                margin: margin,
                width: width,
                height: height,
                x: function (d) {
                    return d.x;
                },
                y: function (d) {
                    return d.y;
                },
                focusShowAxisX: false,
                focusShowAxisY: false,
                showLegend:false,
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
                useInteractiveGuideline: true

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

        $scope.data = [{
            key: "Large Data",
            color: "blue",
            values: [
                {
                    x: 1,
                    y: 1
            }]
    }];

        $scope.data[0].values = [];
        // This is for timing

        // Run when called
        var run = true;
        
        d3.csv("data/data.csv", function (error, data) {
            data.forEach(function (d) {
                var x = parseDate(d.day.replace(/\//g, '-') + ' ' + d.time);
                var y = parseFloat(((d.ozone.replace('$', '') * 0.9561) + 0.99461));
                maxDate = x.getTime();
                minDate = maxDate - 864000000;
                $scope.data[0].values.push({
                    x: x,
                    y: +y
                });
            });
            
            $scope.api.getScope().chart.brushExtent([minDate,maxDate]);
        });
        // Call the populate function every second
        setInterval(function () {
            if (!run) return;

            /* Determine the amount of time required to execute the chart 
             * update.
             */
            $scope.api.update();

        }, 2000);

        d3.select("#start-stop-button").on("click", function () {
            run = !run;
        });

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
