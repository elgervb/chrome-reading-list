
export class DesktopNotifications {

    /* @ngInject */
    constructor($timeout) {
        this.$timeout = $timeout;
    }

    isSupported() {
        return 'Notification' in window;
    }

    makeNotification(title, message, iconSrc) {
        const notificaton = new Notification(title, {body: message, icon: iconSrc});

        this.$timeout(notificaton.close.bind(notificaton), 5000);
    }

    notify(title, message, iconSrc) {
        const icon = iconSrc || this.defaultIcon;

        if (this.isSupported()) {
            if (Notification.permission === 'granted') {
                this.makeNotification(title, message, icon);
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission((permission) => {
                    // If the user is okay, let's create a notification
                    if (permission === 'granted') {
                        this.makeNotification(title, message, icon);
                    }
                });
            }
        }
    }
}
