
export class Debouncer {
    /* @ngInject */
    constructor($timeout) {
        this.$timeout = $timeout;
    }

    debounce(func, wait, immediate) {
        let timeout;
        return () => {
            const args = arguments;
            const later = () => {
                timeout = null;
                if (!immediate) {
                    func.apply(this, args);
                    this.$timeout.cancel(timeout);
                }
            };

            const callNow = immediate && !timeout;
            if (timeout) {
                this.$timeout.cancel(timeout);
            }
            timeout = this.$timeout(later, wait);
            if (callNow) {
                func.apply(this, args);
                this.$timeout.cancel(timeout);
            }
        };
    }
}
