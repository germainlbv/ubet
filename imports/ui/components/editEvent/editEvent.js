import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { SubThemesEvent} from '../../../api/subThemesEvent';

import './editEvent.html';

import { Events } from '../../../api/events';


class EditEvent {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.subscribe('subThemesEvent');

        this.today = new Date();

        this.helpers({
            subThemes() {
                return SubThemesEvent.find({
                    theme: this.getReactively('event.theme')
                });
            }
        });
    }
    
    modify() {
        Events.update(this.event._id, {
            $set: {
                subtheme: this.event.subtheme,
                date: this.event.date,
                description: this.event.description,
                zipCode: this.event.zipCode,
                city: this.event.city,
                title: this.event.title,
                creationDate: new Date()
            }
        }, (error) => {
            if (error) {
                console.log('Oops, erreur lors de la mise à jour des infos...');
            } else {
                console.log('Succes!');
            }
        });
        if(this.done)
            this.done();
    }

}

const name = 'editEvent';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    bindings: {
        done: '&?',
        event: '<'
    },
    controller: EditEvent
});
