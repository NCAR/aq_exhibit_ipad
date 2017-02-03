(function () {
    'use strict';
    angular.module('edu.ucar.scied.tab.directive', [])
        .directive('tabGenerator', tabGenerator);

    function tabGenerator() {
        var directiveDefinitionObject = {
            restrict: 'E',
            scope: {
                data: '=data'
            },
            replace: false,
            templateUrl: "js/tab/tab.html",
        };
        return directiveDefinitionObject;

    };
})();