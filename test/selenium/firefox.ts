import { Builder, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/firefox';
import * as os from 'os';

function getBinary(): string {
    const platform = os.platform();
    switch (platform) {
    case 'darwin':
        return '/Applications/Firefox Developer Edition.app';
    case 'linux':
        return 'firefox/firefox';
    default:
        throw new Error('currently not supported');
    }
}

export default function (): WebDriver {
    const options = new Options()
        .addExtensions('tmp/workspace/gossip-site-blocker.xpi')
        .setBinary(getBinary())
        .setPreference('xpinstall.signatures.required', false)
        .setPreference('intl.accept_languages', 'ja, en-US, en')
        .windowSize({ width: 1280, height: 800 });

    return new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(options)
        .build();
}
