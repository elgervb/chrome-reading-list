import template from './readinglist-component.html';
import './readinglist-component.scss';

class ReadinglistController {
    /* @ngInject */
    constructor(ReadinglistService) {

        ReadinglistService.fetchBookmarks((readinglist) => {
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
