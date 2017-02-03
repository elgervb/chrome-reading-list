function genericOnClick(info, tab) {
    console.log("item", info.menuItemId, "was clicked");
    console.log("info:", info);
    console.log("tab:", tab);
    debugger;
    if (info.linkUrl) {
        sendBookmarkableUrl(info.linkUrl, tab.title)
    } else if (info.sourceUrl) {
        sendBookmarkableUrl(info.linkUrl, tab.title);
    } else if (info.pageUrl) {
        sendBookmarkableUrl(info.pageUrl, tab.title)
    } else {
        throw new Error('No bookmarkable url found...');
    }

}

function sendBookmarkableUrl(url, title) {
    chrome.runtime.sendMessage({
        action: 'addBookmark',
        url: url,
        title: title
    });
}

function createContextMenu() {
    var contexts = ["page", "link", "editable", "image", "video", "audio"];
    var parent = chrome.contextMenus.create({
        "title": "My Bookmarks",
        "contexts": contexts,
        "onclick": genericOnClick
    });
    var child1 = chrome.contextMenus.create({
        "title": "Add bookmark", 
        "parentId": parent, 
        "contexts": contexts,
        "onclick": genericOnClick
    });
}

document.addEventListener('DOMContentLoaded', function () {
    createContextMenu();
});
