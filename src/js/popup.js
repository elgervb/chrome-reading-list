import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {ReadinglistModule} from './readinglist/module';
import './popup.scss';

const app = angular.module('app', [uiRouter, ReadinglistModule.name]);
/* @ngInject */
app.config(($stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('readinglist', {
        url: '/',
        template: '<reading-list class="page"></reading-list>'
    });
});
/* @ngInject */
app.config(($compileProvider) => {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome|chrome-extension):/);
});

/* Bootstrap */
angular.element(document).ready(() => {
    angular.bootstrap(document, ['app'], {
        strictDi: true
    });
});

import './google-analytics';
