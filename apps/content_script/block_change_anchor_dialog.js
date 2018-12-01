class BlockChangeAnchorDialog {
    constructor(mediator, url, reason) {
        const background = $.div("block-dialog-background");
        document.body.appendChild(background);
        this.background = background;
        const dialog = $.div("block-dialog");
        dialog.textContent = `${url}\n${reason}`;
        background.appendChild(dialog);
        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("block-dialog-buttons");
        dialog.appendChild(buttonsDiv);
        const cancelButton = $.button("cancel", "blocker-secondary-button");
        buttonsDiv.appendChild(cancelButton);
        $.onclick(cancelButton, this.cancel.bind(this));
        const unblockButton = $.button("unblock", "blocker-secondary-button");
        buttonsDiv.appendChild(unblockButton);
        $.onclick(unblockButton, this.unblock.bind(this));
        const hardBlockButton = $.button("hard block", "blocker-secondary-button");
        buttonsDiv.appendChild(hardBlockButton);
        $.onclick(hardBlockButton, this.toHard.bind(this));
        this.reason = reason;
    }
    cancel() {
        this.closeDialog();
    }
    async toHard() {
        Logger.debug("toHard: ", this.reason);
        await BlockedSitesRepository.toHard(this.reason);
        this.closeDialog();
    }
    async unblock() {
        Logger.debug("unblock:", this.reason);
        await BlockedSitesRepository.del(this.reason);
        this.closeDialog();
    }
    closeDialog() {
        // remove background
        this.background.parentElement.removeChild(this.background);
    }
}
//# sourceMappingURL=block_change_anchor_dialog.js.map