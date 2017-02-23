const READINGLIST_BOOKMARK_NAME = 'My ReadingList';
// const READINGLIST_ARCHIVE_BOOKMARK_NAME = 'My ReadingList - Archive';

export class ReadinglistManager {

    constructor() {
        //
    }

    fetchBookmarks(callback) {
        chrome.bookmarks.getTree((bookmarks) => {
            if (bookmarks) {
                this.filterBookmarks(bookmarks, callback);
                if (!this.myReadingList) {
                    this.createReadingList(callback);
                }
            }
        });
    }

    /**
     * return all reading list items
     *
     * @returns {Object[]} all reading list items
     */
    get readingList() {
        return this.myReadingList;
    }

    filterBookmarks(bookmarks, callback) {
        if (bookmarks) {
            bookmarks.forEach((bookmark) => {
                // search for folders
                if (!bookmark.url) {
                    if (bookmark.title === READINGLIST_BOOKMARK_NAME) {
                        this.myReadingList = bookmark;
                        if (callback) {
                            callback(this.myReadingList);
                        }
                        return;
                    }

                    this.filterBookmarks(bookmark.children, callback);
                }
            });
        }
    }

    addBookmark(url, title, context) {
        chrome.bookmarks.create({
            parentId: this.readingList.id,
            title,
            url
        });

        const ctx = context || 'unknown';
        ga('send', 'event', 'bookmark', 'add', ctx, this.readingList.children.length);
    }

    removeBookmark(id, callback) {
        chrome.bookmarks.remove(id, callback);
    }

    createReadingList(callback) {
        chrome.bookmarks.create({
            title: READINGLIST_BOOKMARK_NAME
        }, (readingList) => {
            this.myReadingList = readingList;
            if (callback) {
                callback(this.myReadingList);
            }
        });

        // TODO enable when moving bookmarks to archive folder
        // chrome.bookmarks.create({
        //     title: READINGLIST_ARCHIVE_BOOKMARK_NAME
        // });
    }

}
