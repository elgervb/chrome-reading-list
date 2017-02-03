import {ReadinglistManager} from './readinglist/manager';
import {ContextMenu} from './readinglist/context-menu';

document.addEventListener('DOMContentLoaded', () => {
    const manager = new ReadinglistManager();

    const contextMenu = new ContextMenu(manager.addBookmark.bind(manager));
    contextMenu.create();


    chrome.runtime.onMessage.addListener((request) => {
        if (request.action === 'addBookmark') {
            manager.addBookmark(request.title, request.url);
        }
    });
});
