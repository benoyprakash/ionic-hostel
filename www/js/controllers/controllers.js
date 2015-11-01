angular.module('hostelApp.controllers', [])

.controller('DashCtrl', function($scope, $localstorage, OrganizationsFactory, $ionicLoading) {

    $scope.dashCS = {};
    $scope.dashCS.selectedOrg = {};
    
    var localActiveOrg = $localstorage.getObject('activeOrg');

    if (localActiveOrg !== "undefined") {
        $scope.dashCS.selectedOrg = localActiveOrg;

    } else {
        console.log("fetched data from LS : " + localActiveOrg);

    }

    // ------------------------------------------------------------------

    $scope.organizationsList = [];
    $scope.promise = OrganizationsFactory.all();

    $scope.promise
        .then(
            function(data) {

                var jsonString = JSON.stringify(data);
                $scope.organizationsList = JSON.parse(jsonString);

            },
            function(error) {
                console.log(error);
            });

    // ------------------------------------------------------------------

    $scope.dashCS.selectCurrentOrg = function() {

        if ($scope.dashCS.selectedOrg !== null && $scope.dashCS.selectedOrg !== "undefined") {
            $localstorage.setObject('activeOrg', $scope.dashCS.selectedOrg);
        }
    };
    // ------------------------------------------------------------------
})

.controller('CustomersCtrl', function($scope, Chats) {
    /* For list of customers */

    $scope.customers = Chats.all();
    $scope.settings = {
        enableFriends: true
    };


    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = true; // set the default sort order
    $scope.searchKey = ''; // set the default search/filter term

    // create the list of sushi rolls 
    $scope.sushi = [{
        name: 'Cali Roll',
        fish: 'Crab',
        tastiness: 2
    }, {
        name: 'Philly',
        fish: 'Tuna',
        tastiness: 4
    }, {
        name: 'Tiger',
        fish: 'Eel',
        tastiness: 7
    }, {
        name: 'Rainbow',
        fish: 'Variety',
        tastiness: 6
    }];
})

.controller('CustomerDetailsCtrl', function($scope, $stateParams, Camera) {
    /* For individual customer */
    $scope.testDate = new Date('02-19-1990');

    $scope.getPhoto = function() {
        console.log('Getting camera');
        Camera.getPicture({
            quality: 75,
            targetWidth: 320,
            targetHeight: 320,
            saveToPhotoAlbum: false
        }).then(function(imageURI) {
            console.log(imageURI);
            $scope.lastPhoto = imageURI;
        }, function(err) {
            console.err(err);
        });

        /*    navigator.camera.getPicture(function(imageURI) {
              console.log(imageURI);
            }, function(err) {
            }, { 
              quality: 50,
              destinationType: Camera.DestinationType.DATA_URL
            });*/

    }
})

.controller('SettingsCtrl', function($scope, $ionicActionSheet, $timeout) {


})

.controller('OrganizationsCtrl', function($scope, $timeout, $ionicActionSheet, OrganizationsFactory) {

    $scope.organizationsList = [];
    $scope.promise = OrganizationsFactory.all();

    $scope.promise
        .then(
            function(data) {

                // $scope.organizationsList = data;
                var jsonString = JSON.stringify(data);
                $scope.organizationsList = JSON.parse(jsonString);


            },
            function(error) {
                alert(error);
            });

    // Triggered on a button click, or some other target
    $scope.showActionSheet = function(orgId, orgName) {

        var orgId = orgId;
        var selectedOrg = {};


        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({

            // buttons: [
            //   { text: 'Deactivate' + orgId },
            //   { text: 'Move' }
            // ],
            destructiveText: 'Delete ' + orgName,
            titleText: 'Actions',
            cancelText: 'Cancel',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                alert(index);
                return true;
            },
            destructiveButtonClicked: function() {
                console.log("Delete the organization with id : " + orgId);

                $scope.promise = OrganizationsFactory.getOrgById(orgId);
                $scope.promise
                    .then(
                        function(data) {
                            if (data.length > 0) {
                                var jsonString = JSON.stringify(data[0]);
                                var p_selectedOrg = JSON.parse(jsonString);

                                p_selectedOrg.status = "deleted";

                                $scope.promise = OrganizationsFactory.saveOrganization(p_selectedOrg);
                                $scope.promise
                                    .then(
                                        function(data) {
                                            hideSheet();
                                            alert("Deleted");
                                        },
                                        function(error) {
                                            alert("Unable to process your request. Please try after sometime");
                                        });
                            }
                        });
            }

        }, function(error) {
            alert(error);
        });

        // For example's sake, hide the sheet after two seconds
        // $timeout(function() {
        //   hideSheet();
        // }, 20000);

    };
})

.controller('NewOrganizationDetailsCtrl', function($scope, $state) {

        $scope.orgDtlCS = {};
        $scope.orgDtlCS.currentOrganization = {};

    })
    .controller('OrganizationDetailsCtrl', function($scope, $stateParams, OrganizationsFactory) {

        $scope.orgDtlCS = {};
        $scope.orgDtlCS.currentOrganization = {};

        $scope.promise = OrganizationsFactory.getOrgById($stateParams.orgId);
        $scope.promise
            .then(
                function(data) {
                    if (data.length > 0) {

                        var jsonString = JSON.stringify(data[0]);
                        $scope.orgDtlCS.currentOrganization = JSON.parse(jsonString);
                    }
                },
                function(error) {
                    alert(error);
                });

        $scope.saveOrganizationDetails = function() {
            console.log("model at ctrl : " + JSON.stringify($scope.orgDtlCS.currentOrganization));
            
            $scope.promise = OrganizationsFactory.saveOrganization($scope.orgDtlCS.currentOrganization);
            $scope.promise
                .then(
                    function(data) {
                        OrganizationsFactory.hide();


                    },
                    function(error) {
                        alert(error);
                        OrganizationsFactory.hide();
                    });

        };
    })

.controller('RoomsCtrl', function($scope, RoomsFactory) {

    $scope.rooms = RoomsFactory.all();
})

.controller('RoomDetailCtrl', function($scope, $stateParams, RoomsFactory) {
    $scope.room = RoomsFactory.getRoomById($stateParams.roomId);
})

;