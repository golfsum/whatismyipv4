const attachedTabs = new Set();

async function attach(tabId) {
  if (attachedTabs.has(tabId)) return;
  await chrome.debugger.attach({ tabId }, "1.3");
  attachedTabs.add(tabId);
}

async function detach(tabId) {
  try { await chrome.debugger.detach({ tabId }); } catch (_) {}
  attachedTabs.delete(tabId);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  (async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab?.id) throw new Error("No active tab found.");
      const tabId = tab.id;

      if (message?.type === "apply-location") {
        const latitude = Number(message.latitude);
        const longitude = Number(message.longitude);
        const accuracy = Math.max(1, Number(message.accuracy) || 25);
        if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) throw new Error("Latitude must be between -90 and 90.");
        if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) throw new Error("Longitude must be between -180 and 180.");
        await attach(tabId);
        await chrome.debugger.sendCommand({ tabId }, "Emulation.setGeolocationOverride", { latitude, longitude, accuracy });
        await chrome.storage.local.set({ lastLocation: { latitude, longitude, accuracy } });
        sendResponse({ ok: true });
        return;
      }

      if (message?.type === "clear-location") {
        if (attachedTabs.has(tabId)) {
          await chrome.debugger.sendCommand({ tabId }, "Emulation.clearGeolocationOverride");
          await detach(tabId);
        }
        sendResponse({ ok: true });
        return;
      }

      throw new Error("Unknown command.");
    } catch (error) {
      sendResponse({ ok: false, error: error?.message || "Unable to update location." });
    }
  })();
  return true;
});

chrome.debugger.onDetach.addListener((source) => {
  if (source.tabId) attachedTabs.delete(source.tabId);
});

chrome.tabs.onRemoved.addListener((tabId) => attachedTabs.delete(tabId));
