
import template from './readinglist-item-component.html';
import './readinglist-item-component.scss';

class ReadinglistItemController {
    constructor(ReadinglistService, $scope) {
        '@ngInject';
        this.manager = ReadinglistService;
        this.$scope = $scope;
    }

    onClick(bookmark) {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            const tab = tabs[0];
            chrome.tabs.update(tab.id, {url: bookmark.url});

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
