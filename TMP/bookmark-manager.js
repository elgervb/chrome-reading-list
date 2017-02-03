
var READINGLIST_BOOKMARK_NAME = "My ReadingList",
    myReadingList;
 
function getReadingListFromBookmarks(callback) {
    var bookmarkTreeNodes = chrome.bookmarks.getTree(function(bookmarks) {
        if (bookmarks) {
            filterBookmarks(bookmarks);
            if (!myReadingList) {
                createReadingList();
            }
        } 
    });
};

function filterBookmarks(bookmarks) {
    if (bookmarks) {
        bookmarks.forEach(function(bookmark) {
            // search for folders
            if (!bookmark.url) {
                if (bookmark.title === READINGLIST_BOOKMARK_NAME) {
                    myReadingList = bookmark;
                    return;
                }

                filterBookmarks(bookmark.children);
            }
        });
    }
}

function createReadingList() {
    console.log('create a new reading list')
    chrome.bookmarks.create({
        title: READINGLIST_BOOKMARK_NAME
    }, function(readingList) {
        myReadingList = readingList;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    getReadingListFromBookmarks();

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        debugger;
        console.log('got message', request, sender, sendResponse);
        if (request.action === 'addBookmark') {
            chrome.bookmarks.create({
                'parentId': myReadingList.id,
                'title': request.title,
                'url': request.url
            });
        }
    });
    
});
