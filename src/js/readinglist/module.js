import angular from 'angular';
import {ReadinglistComponent} from './components/readinglist-component';
import {ReadinglistItemComponent} from './components/readinglist-item-component';
import {UrlParser} from './services/url-parser';
import {SrcLazyDirective} from './directives/src-lazy';
import {ReadinglistManager} from './services/manager';
import {VersionService} from './services/readinglist-version-service';
import {DesktopNotifications} from './services/desktop-notifications';
import {Debouncer} from './services/debouncer-service';

export const ReadinglistModule = angular.module('readinglist', [])
    .component('readingList', new ReadinglistComponent())
    .component('readingListItem', new ReadinglistItemComponent())
    .directive('srcLazy', SrcLazyDirective.factory())
    .service('ReadinglistService', ReadinglistManager)
    .service('UrlParser', UrlParser)
    .service('Version', VersionService)
    .service('Debouncer', Debouncer)
    .service('DesktopNotifications', DesktopNotifications);
