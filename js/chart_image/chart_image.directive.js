(function () {
    'use strict';
    angular.module('edu.ucar.scied.chart_image.directive', [])
        .directive('graphGenerator', graphGenerator);

    function graphGenerator() {
        var directiveDefinitionObject = {
            restrict: 'E',
            scope: false,
            replace: false,
            templateUrl: "js/chart_image/chart.html",
            controller: ['$scope', function graphGeneratorCtrl($scope){
                $scope.generateImageUrl = generateImageUrlFunc;

                function generateImageUrlFunc(range) {
                    $scope.data.range = range;
                }

            }]
        };
        return directiveDefinitionObject;

    };
})();