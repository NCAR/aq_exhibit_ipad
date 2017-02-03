(function () {
    'use strict';
    angular.module('edu.ucar.scied.aq.controller', [])
        .controller('homeCtrl', homeCtrl)
        .controller('graphCtrl', graphCtrl);

    homeCtrl.$inject = ['$scope'];
    function homeCtrl($scope) {
        // ipad pro resolution is 2048x2732, so max height of each, with nav is 682
        $scope.range = "oneweek";
        $scope.datatype = "ozone";
        
        if($scope.datatype == 'ozone'){
            $scope.axis_y_label = "Ozone (parts per million)";
        } else if($scope.datatype == 'pm'){
            $scope.axis_y_label = "Particulate Matter";
        }

        $scope.generateImageUrl = generateImageUrlFunc;

        function generateImageUrlFunc(range) {
            $scope.range = range;
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