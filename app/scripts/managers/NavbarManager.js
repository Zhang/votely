'use strict';

(function() {
  var app = angular.module('vote.managers.navbar', ['vote.managers.camera']);
  app.factory('NavbarManager', function(CameraManager, $rootScope, $state, STATE, AccountManager, $timeout) {
    var EVENTS = {
      addConnection: 'navbar-add-connection',
      sharePicture: 'navbar-share-picture'
    };
    var cameraSettings = {
      rightIcon: 'ion-camera',
      action: function() {
        CameraManager.getPicture().then(function success() {
          $state.go(STATE.share);
        });
      }
    };
    var connectionSettings = {
      rightIcon: 'ion-plus-round',
      action: function() {
        $rootScope.$broadcast(EVENTS.addConnection);
      }
    };

    var shareSettings = {
      rightIcon: 'ion-checkmark-round',
      action: function() {
        $rootScope.$broadcast(EVENTS.sharePicture);
      },
      title: 'Share votes with...',
      hideLeftButtons: true
    };

    var rightButtons = [
      {
        icon: 'ion-android-more-vertical',
        action: AccountManager.logout
      }
    ];

    function getNavigationButton(state, icon) {
      return {
        state: state,
        action: function() {
          $state.go(state);
        },
        icon: icon,
        isActive: function() {
          return $state.current.name === state;
        }
      };
    }

    var leftButtons = [
      getNavigationButton(STATE.connections, 'ion-person-stalker'),
      getNavigationButton(STATE.results, 'ion-stats-bars'),
      {
        action: function() {
          CameraManager.getPicture().then(function success() {
            $state.go(STATE.share);
          });
        },
        icon: 'ion-camera'
      }
    ];

    function getCurrentActiveIndex() {
      return _.findIndex(leftButtons, function(button) {
        return button.isActive();
      });
    }

    var stateSettings = {
      //set up state settings;
    };
    $rootScope.$on('$stateChangeSuccess', function(e, toState){
      if (toState)
    });
    return {
      goBack: function() {
        $state.go(this.backState);
      },
      settings: cameraSettings,
      useConnections: function() {
        this.settings = connectionSettings;
      },
      useVoting: function() {
        this.hideLeftButtons = true;
        this.title = 'Viewing pictures';
        this.backState = STATE.connections;
      },
      useCamera: function() {
        this.settings = cameraSettings;
      },
      useShare: function() {
        this.settings = shareSettings;
      },
      EVENTS: EVENTS,
      rightButtons: rightButtons,
      leftButtons: leftButtons,
      swipeRight: function() {
        var rightSwipeTab = leftButtons[getCurrentActiveIndex() - 1];
        if (rightSwipeTab) {
          rightSwipeTab.action();
        }
      },
      swipeLeft: function() {
        var leftSwipeTab = leftButtons[getCurrentActiveIndex() + 1];
        if (leftSwipeTab) {
          leftSwipeTab.action();
        }
      },
      hideLeftButtons: false
    };
  });
})();
