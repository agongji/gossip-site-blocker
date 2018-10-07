const OptionRepository = {
    async isDeveloperMode() {
        const items = await ChromeStorage.get({ developerMode: false });
        return items.developerMode;
    },
    async setDeveloperMode(mode) {
        await ChromeStorage.set({ developerMode: mode });
        Logger.log("set 'developerMode' to =>", mode);
    },
    async getAutoBlockIDNOption() {
        const autoBlockIDNDefault = { enabled: false };
        const items = await ChromeStorage.get({ autoBlockIDN: autoBlockIDNDefault });
        return items.autoBlockIDN;
    },
    async setAutoBlockIDNOption(autoBlockIDN) {
        await ChromeStorage.set({ autoBlockIDN });
        Logger.debug("set 'autoBlockIDN' to =>", autoBlockIDN);
    },
};
//# sourceMappingURL=config.js.map