import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {ReadinglistManager} from './readinglist/manager';
import {ReadinglistComponent} from './ng/readinglist-component';
import {ReadinglistItemComponent} from './ng/readinglist-item-component';
import {UrlParser} from './readinglist/url-parser';
import './popup.scss';


angular.module('readinglistApp', [uiRouter])
    .component('readingList', new ReadinglistComponent())
    .component('readingListItem', new ReadinglistItemComponent())
    .service('ReadinglistService', ReadinglistManager)
    .service('UrlParser', UrlParser)

.config(($stateProvider, $urlRouterProvider) => {
    '@ngInject';

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('readinglist', {
        url: '/',
        template: '<reading-list></reading-list>'
    });
})
.config(($compileProvider) => {
    '@ngInject';
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome|chrome-extension):/);
});

// angular.element(document).ready(() => {
    angular.bootstrap(document, ['readinglistApp']);
// });
