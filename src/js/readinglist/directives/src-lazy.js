
export class SrcLazyDirective {
    constructor($window, Debouncer) {
        this.restrict = 'A';
        this.scope = {};
        this.$window = $window;
        this.Debouncer = Debouncer;
    }

    link(scope, element, attrs) {
        if (attrs.lazyContainer) {
            this.scrollContainer = document.querySelector(attrs.lazyContainer);
        } else {
            this.scrollContainer = this.$window;
        }

        element[0].onerror = this.onError;

        this.lazyLoad(element, attrs.srcLazy);
        this.scope.onScroll = this.Debouncer.debounce(() => {
            // TODO removeEventListener impl is not working. For now fix like this
            if (element.attr('src')) {
                return;
            }
            this.lazyLoad(element, attrs.srcLazy);
        }, 250).bind(this);

        this.scrollContainer.addEventListener('scroll', this.scope.onScroll);

        element.on('$destroy', () => {
            this.$destroy();
        });
    }

    lazyLoad(element, lazySrc) {
        if (this.isElementInViewport(element[0])) {
            element.attr('src', lazySrc);
            this.$destroy();
        }
    }

    onError(e) {
        const element = e.target;

        console.log('asfd');
        debugger;
        e.currentTarget = laksdfjlaskjf

        this.lazyLoad(element);
    }

    $destroy() {
        this.scrollContainer.removeEventListener('scroll', this.scope.onScroll);
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
        let factory = ($window, Debouncer) => {
            return new SrcLazyDirective($window, Debouncer);
        };
        return factory;
    }
}
