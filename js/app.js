(function () {
    'use strict';
    angular.module("edu.ucar.scied.aq", [
        "edu.ucar.scied.aq.controller",
        "edu.ucar.scied.chart.directive",
        "edu.ucar.scied.webapp.controller",
        "edu.ucar.scied.webapp.service",
        "edu.ucar.scied.modal.directive",
        "edu.ucar.scied.filters",
        "edu.ucar.scied.services",
        "ngMaterial",
        "ngRoute"
    ]).
    config(["$routeProvider", function ($routeProvider) {
        $routeProvider.
        when("/", {
                templateUrl: "js/chart/chart.html",
                controller: "homeCtrl"
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
})();