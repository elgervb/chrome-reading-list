import {UrlParser} from './url-parser';

export class ContextMenu {

    constructor(onBookmarkAdd) {
        this.onBookmarkAdd = onBookmarkAdd;
    }

    create() {
        const contexts = ['page', 'link', 'editable', 'image', 'video', 'audio'];
        const parent = chrome.contextMenus.create({
            title: 'My reading list',
            contexts
        });
        chrome.contextMenus.create({
            title: 'Add bookmark',
            parentId: parent,
            contexts,
            onclick: this.handleClick.bind(this)
        });
    }

    handleClick(info, tab) {
        if (info.linkUrl) {
            debugger;
            const parsed = UrlParser.parse(info.linkUrl);
            const title = decodeURIComponent(parsed.pathname)
                .replace(/[-_\/]/g, ' ') // replace -_/
                .replace(/\s\s+/g, ' '); // replace multi tabs

            this.onBookmarkAdd(info.linkUrl, title);
        } else if (info.sourceUrl) {
            this.onBookmarkAdd(info.sourceUrl, tab.title);
        } else if (info.pageUrl) {
            this.onBookmarkAdd(info.pageUrl, tab.title);
        } else {
            throw new Error('No bookmarkable url found...');
        }
    }

    sendBookmarkableUrl(url, title) {
        chrome.runtime.sendMessage({
            action: 'addBookmark',
            url,
            title
        });
    }
}

