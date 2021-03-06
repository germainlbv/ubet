import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { name as EventsActive} from '../eventsActive/eventsActive';
import { name as EventsInactive} from '../eventsInactive/eventsInactive';

import './userEvents.html';

class UserEvents {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);
    }
}

const name = 'userEvents';

export default angular.module(name, [
        angularMeteor,
        uiRouter,
        EventsActive,
        EventsInactive
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller:UserEvents
    })
    .config(config);


function config($stateProvider) {
    'ngInject';

    $stateProvider.state('userEvents', {
        url: '/userEvents',
        template: '<user-events></user-events>'
    });
}