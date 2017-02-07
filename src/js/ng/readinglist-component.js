import template from './readinglist-component.html';
import './readinglist-component.scss';

class ReadinglistController {
    /* @ngInject */
    constructor(ReadinglistService) {
        this.service = ReadinglistService;
        this.fetchBookmarks();
    }

    addCurrentPage() {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            const tab = tabs[0];
            chrome.runtime.sendMessage({
                action: 'addBookmark',
                url: tab.url,
                title: tab.title
            });

        });
    }

    fetchBookmarks() {
        this.service.fetchBookmarks((readinglist) => {
            this.bookmarks = readinglist.children;
        });
    }
}
export class ReadinglistComponent {
    constructor() {
        this.restrict = 'E';
        this.template = template;
        this.controller = ReadinglistController;
        this.bindings = {};
    }
}
