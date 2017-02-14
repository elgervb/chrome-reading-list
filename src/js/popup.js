import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {ReadinglistManager} from './readinglist/manager';
import {ReadinglistComponent} from './ng/readinglist-component';
import {ReadinglistItemComponent} from './ng/readinglist-item-component';
import {UrlParser} from './readinglist/url-parser';
import {SrcLazyDirective} from './ng/src-lazy';
import {VersionService} from './ng/readinglist-version-service';
import {Debouncer} from './ng/debouncer-service';
import './popup.scss';


const app = angular.module('readinglistApp', [uiRouter])
    .component('readingList', new ReadinglistComponent())
    .component('readingListItem', new ReadinglistItemComponent())
    .directive('srcLazy', SrcLazyDirective.factory())
    .service('ReadinglistService', ReadinglistManager)
    .service('UrlParser', UrlParser)
    .service('Version', VersionService)
    .service('Debouncer', Debouncer);

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

angular.element(document).ready(() => {
    angular.bootstrap(document, ['readinglistApp'], {
        strictDi: true
    });
});

/* eslint-disable */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-613449-6', 'auto');
// Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
ga('set', 'checkProtocolTask', function(){});
ga('require', 'displayfeatures');
ga('send', 'pageview', 'popup.html');
