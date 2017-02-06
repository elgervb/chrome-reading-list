
export class UrlParser {
    static parse(url) {
        const parser = document.createElement('a');
        parser.href = url;

        return {
            protocol: parser.protocol, // => "http:"
            hostname: parser.hostname, // => "example.com"
            port: parser.port,     // => "3000"
            pathname: parser.pathname, // => "/pathname/"
            search: parser.search,   // => "?search=test"
            hash: parser.hash,     // => "#hash"
            host: parser.host     // => "example.com:3000"
        };
    }

    static getBase(parsed) {
        let base = `${parsed.protocol}//${parsed.hostname}`;
        if (parsed.port) {
            base += `:${parsed.port}`;
        }

        return base;
    }
}
