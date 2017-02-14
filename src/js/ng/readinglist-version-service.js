import manifest from '../../manifest.json';

export class VersionService {
    getVersion() {
        return manifest.version;
    }
}
