const DEFAULT_ICON = '/assets/bookmark-default.svg';
export class SrcLazyDirective {
    constructor($window, Debouncer) {
        this.restrict = 'A';
        this.scope = {};
        this.$window = $window;
        this.Debouncer = Debouncer;
    }
    /**
     * The directives link function
     *
     * @param {any} scope the current scope
     * @param {any} element the current element
     * @param {any} attrs the element's attributes
     *
     * @returns {void}
     */
    link(scope, element, attrs) {
        if (attrs.lazyContainer) {
            this.scrollContainer = document.querySelector(attrs.lazyContainer);
        } else {
            this.scrollContainer = this.$window;
        }

        element[0].onerror = this.onError.bind(this);

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

    /**
     * Load the current image when it's visible in the viewport
     *
     * @param {JQLiteElement} element the image (from angular.element)
     * @param {string} lazySrc the src of the image to load
     *
     * @returns {void}
     */
    lazyLoad(element, lazySrc) {
        if (this.isElementInViewport(element[0])) {
            element.attr('src', lazySrc);
            this.$destroy();
        }
    }

    /**
     * Handle (404) errors when loading the image.
     *
     * @param {Event} e the event
     *
     * @returns {void}
     */
    onError(e) {
        const src = DEFAULT_ICON;
        this.lazyLoad(angular.element(e.currentTarget), src);

        // remove onerror to prevent endless loop
        delete this.onerror;
    }

    /**
     * Let's cleanup after ourselves
     *
     * @return {void}
     */
    $destroy() {
        this.scrollContainer.removeEventListener('scroll', this.scope.onScroll);
    }

    /**
     * Check if the current element is visible in the viewport (vertical)
     *
     * @param {HTMLElement} el the element under check
     * @returns {boolean} true when visible, false when not
     */
    isElementInViewport (el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Factory method to create the directive
     *
     * @static
     * @returns {SrcLazyDirective} a new instance
     *
     * @memberOf SrcLazyDirective
     */
    static factory() {
        /* @ngInject */
        let factory = ($window, Debouncer) => {
            return new SrcLazyDirective($window, Debouncer);
        };
        return factory;
    }
}
