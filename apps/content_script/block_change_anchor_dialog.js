class BlockChangeAnchorDialog {
    constructor(mediator, url, reason) {
        const background = document.createElement("div");
        background.classList.add("block-dialog-background");
        document.body.appendChild(background);
        this.background = background;
        const dialog = document.createElement("div");
        dialog.classList.add("block-dialog");
        dialog.textContent = `${url}\n${reason}`;
        background.appendChild(dialog);
        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("block-dialog-buttons");
        dialog.appendChild(buttonsDiv);
        const cancelButton = document.createElement("input");
        cancelButton.type = "button";
        cancelButton.value = "cancel";
        cancelButton.classList.add("blocker-secondary-button");
        buttonsDiv.appendChild(cancelButton);
        cancelButton.addEventListener("click", this.cancel.bind(this));
        const unblockButton = document.createElement("input");
        unblockButton.type = "button";
        unblockButton.value = "unblock";
        unblockButton.classList.add("blocker-secondary-button");
        buttonsDiv.appendChild(unblockButton);
        unblockButton.addEventListener("click", this.unblock.bind(this));
        const hardBlockButton = document.createElement("input");
        hardBlockButton.type = "button";
        hardBlockButton.value = "hard block";
        hardBlockButton.classList.add("blocker-secondary-button");
        buttonsDiv.appendChild(hardBlockButton);
        hardBlockButton.addEventListener("click", this.toHard.bind(this));
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