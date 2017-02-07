import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {ReadinglistManager} from './readinglist/manager';
import {ReadinglistComponent} from './ng/readinglist-component';
import {ReadinglistItemComponent} from './ng/readinglist-item-component';
import {UrlParser} from './readinglist/url-parser';
import {SrcLazyDirective} from './ng/src-lazy';
import './popup.scss';


const app = angular.module('readinglistApp', [uiRouter])
    .component('readingList', new ReadinglistComponent())
    .component('readingListItem', new ReadinglistItemComponent())
    .directive('srcLazy', SrcLazyDirective.factory())
    .service('ReadinglistService', ReadinglistManager)
    .service('UrlParser', UrlParser);

/* @ngInject */
app.config(($stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('readinglist', {
        url: '/',
        template: '<reading-list></reading-list>'
    });
});
/* @ngInject */
app.config(($compileProvider) => {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome|chrome-extension):/);
});

angular.element(document).ready(() => {
    angular.bootstrap(document, ['readinglistApp'], {
        strictDi: true
    });
});
