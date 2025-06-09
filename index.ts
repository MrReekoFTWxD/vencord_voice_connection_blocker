import { showNotification } from "@api/Notifications";
import { findByProps } from "@webpack";
import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
import { Logger } from "@utils/Logger";

const logger = new Logger("BlockVoiceJoin");
let originalVoiceSelect: any = null;

const settings = definePluginSettings({
    allowVoiceChatConnection: {
        description: "Toggle to allow the joining of voice channels.",
        type: OptionType.BOOLEAN,
        default: true,
    },
});

function onStart() {
    const voiceModule = findByProps("selectVoiceChannel");

    if (!voiceModule) {
        logger.error("Voice module not found.");
        return;
    }

    originalVoiceSelect = voiceModule.selectVoiceChannel;

    voiceModule.selectVoiceChannel = function (...args: any[]) {
        const channel = args[0];

        if (!settings.store.allowVoiceChatConnection) {
            logger.info(
                "Attempted to join voice channel:",
                channel?.name || "Unknown"
            );

            showNotification({
                title: "Voice Connection Blocker",
                body: `🚫 Prevent joining the voice channel`,
                noPersist: true,
            });
            return;
        }

        return originalVoiceSelect.apply(this, args);
    };
}

function onStop() {
    const voiceModule = findByProps("selectVoiceChannel");

    if (voiceModule && originalVoiceSelect) {
        voiceModule.selectVoiceChannel = originalVoiceSelect;
        originalVoiceSelect = null;
        logger.info("Restored voice join functionality.");
    }
}

export default definePlugin({
    name: "Voice Connection",
    description:
        "Will stop you from connecting to a voice channel. Also gives a popup when connection is blocked.",
    authors: [{ name: "MrReeko", id: 0n }],
    settings,
    toolboxActions: {
        Join() {},
    },
    start: onStart,
    stop: onStop,
});
