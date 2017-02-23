import template from './readinglist-component.html';
import './readinglist-component.scss';

class ReadinglistController {
    /* @ngInject */
    constructor(ReadinglistService, Version) {
        this.service = ReadinglistService;
        this.fetchBookmarks();
        this.version = Version.getVersion();
    }

    addCurrentPage() {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            const tab = tabs[0];
            chrome.runtime.sendMessage({
                action: 'addBookmark',
                context: 'popup',
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

    $postLink() {
        document.querySelector('body').addEventListener('keydown', () => {
            const filterElement = document.querySelector('.readinglist__filter');
            if (filterElement) {
                filterElement.focus();
            }
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
