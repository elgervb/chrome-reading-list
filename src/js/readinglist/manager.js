const READINGLIST_BOOKMARK_NAME = 'My ReadingList';

export class ReadinglistManager {

    constructor() {
        chrome.bookmarks.getTree((bookmarks) => {
            if (bookmarks) {
                this.filterBookmarks(bookmarks);
                if (!this.myReadingList) {
                    this.createReadingList();
                }
            }
        });
    }

    get readingList() {
        return this.myReadingList;
    }

    filterBookmarks(bookmarks) {
        if (bookmarks) {
            bookmarks.forEach((bookmark) => {
                // search for folders
                if (!bookmark.url) {
                    if (bookmark.title === READINGLIST_BOOKMARK_NAME) {
                        this.myReadingList = bookmark;
                        return;
                    }

                    this.filterBookmarks(bookmark.children);
                }
            });
        }
    }

    addBookmark(url, title) {
        chrome.bookmarks.create({
            parentId: this.readingList.id,
            title,
            url
        });
    }

    createReadingList() {
        chrome.bookmarks.create({
            title: READINGLIST_BOOKMARK_NAME
        }, (readingList) => {
            this.myReadingList = readingList;
        });
    }

}
