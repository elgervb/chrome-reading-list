
export class SrcLazyDirective {
    constructor($timeout) {
        this.restrict = 'A';
        this.scope = {};
        this.$timeout = $timeout;
    }

    link(scope, element, attrs) {
        this.$timeout(() => {
            element.attr('src', attrs.srcLazy);
        }, 100);
    }

    static factory() {
        /* @ngInject */
        let factory = ($timeout) => {
            return new SrcLazyDirective($timeout);
        };
        return factory;
    }
}
