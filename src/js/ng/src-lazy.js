
export class SrcLazyDirective {
    constructor($timeout, $window) {
        this.restrict = 'A';
        this.scope = {};
        this.$timeout = $timeout;
        this.$window = $window;
    }

    link(scope, element, attrs) {

        if (attrs.lazyContainer) {
            this.scrollContainer = document.querySelector(attrs.lazyContainer);
        } else {
            this.scrollContainer = this.$window;
        }

        this.lazyLoad(element, attrs.srcLazy);

        this.onScroll = () => {
            this.lazyLoad(element, attrs.srcLazy);
        };

        this.scrollContainer.addEventListener('scroll', this.onScroll);

        element.on('$destroy', function() {
            this.$destroy();
        });
    }

    lazyLoad(element, lazySrc) {
        this.$timeout(() => {
            if (this.isElementInViewport(element[0])) {
                element.attr('src', lazySrc);

                this.$destroy();
            }
        }, 50);
    }

    $destroy() {
        // image loaded, remove event listener
        this.scrollContainer.removeEventListener('scroll', this.onScroll);
    }

    isElementInViewport (el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }



    static factory() {
        /* @ngInject */
        let factory = ($timeout, $window) => {
            return new SrcLazyDirective($timeout, $window);
        };
        return factory;
    }
}
