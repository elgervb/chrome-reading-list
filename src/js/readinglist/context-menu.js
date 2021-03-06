import {UrlParser} from './services/url-parser';

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
        const context = 'context-menu';
        if (info.linkUrl) {
            const parsed = UrlParser.parse(info.linkUrl);
            const title = decodeURIComponent(parsed.pathname)
                .replace(/[-_\/]/g, ' ') // replace -_/
                .replace(/\s\s+/g, ' '); // replace multi tabs

            this.onBookmarkAdd(info.linkUrl, title, context);
        } else if (info.sourceUrl) {
            this.onBookmarkAdd(info.sourceUrl, tab.title, context);
        } else if (info.pageUrl) {
            this.onBookmarkAdd(info.pageUrl, tab.title, context);
        } else {
            throw new Error('No bookmarkable url found...');
        }
    }

    sendBookmarkableUrl(url, title) {
        chrome.runtime.sendMessage({
            action: 'addBookmark',
            context: 'context-menu',
            url,
            title
        });
    }
}

