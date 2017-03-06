(function () {
    'use strict';
    angular.module('edu.ucar.scied.aq.controller', [])
        .controller('homeCtrl', homeCtrl)
        .controller('pmCtrl', homeCtrl)
        .controller('ozoneCtrl', homeCtrl)
        .controller('graphCtrl', graphCtrl);

    homeCtrl.$inject = ['$scope'];
    function homeCtrl($scope) {
        // ipad pro resolution is 2048x2732, so max height of each, with nav is 682
        $scope.ozone = {
            tabName: 'Ozone',
            dataName: 'ozone',
            datatype:'ozone',
            range:'oneweek',
            axis_y_label: "Ozone (parts per billion)"
        };
        $scope.pm = {
            tabName: 'Particulate Matter',
            dataName: 'pm',
            datatype:'pm',
            range:'oneweek',
            axis_y_label: "PM2.5 &mu;g/m<sup>3</sup>"
        };

        

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