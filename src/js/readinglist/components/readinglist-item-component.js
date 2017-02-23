
import template from './readinglist-item-component.html';
import {UrlParser} from '../services/url-parser';
import './readinglist-item-component.scss';

class ReadinglistItemController {
    /* @ngInject */
    constructor(ReadinglistService, $scope) {
        this.manager = ReadinglistService;
        this.$scope = $scope;
    }

    getFavicon(bookmark) {
        const parsed = UrlParser.parse(bookmark.url);
        return `${UrlParser.getBase(parsed)}/favicon.ico`;
    }

    onClick(bookmark) {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            const tab = tabs[0];
            chrome.tabs.update(tab.id, {url: bookmark.url});

            ga('send', 'event', 'bookmark', 'select', 'bookmarks');

            this.removeBookmark(bookmark);
        });
    }

    removeBookmark(bookmark) {
        this.manager.removeBookmark(bookmark.id, () => {
            this.hidden = true;
            this.$scope.$apply();
        });
    }
}
export class ReadinglistItemComponent {
    constructor() {
        this.restrict = 'E';
        this.template = template;
        this.controller = ReadinglistItemController;
        this.bindings = {
            bookmark: '<'
        };
    }
}
