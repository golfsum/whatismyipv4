const lat = document.getElementById('lat');
const lon = document.getElementById('lon');
const accuracy = document.getElementById('accuracy');
const status = document.getElementById('status');

chrome.storage.local.get('lastLocation').then(({ lastLocation }) => {
  if (!lastLocation) return;
  lat.value = lastLocation.latitude ?? '';
  lon.value = lastLocation.longitude ?? '';
  accuracy.value = lastLocation.accuracy ?? 25;
});

function show(message, ok = true) {
  status.textContent = message;
  status.style.color = ok ? '#bdd0ff' : '#ffb4b4';
}

document.getElementById('apply').addEventListener('click', async () => {
  show('Applying…');
  const response = await chrome.runtime.sendMessage({
    type: 'apply-location',
    latitude: Number(lat.value),
    longitude: Number(lon.value),
    accuracy: Number(accuracy.value),
  });
  show(response?.ok ? 'Test location applied to this tab.' : (response?.error || 'Unable to apply location.'), Boolean(response?.ok));
});

document.getElementById('clear').addEventListener('click', async () => {
  show('Clearing…');
  const response = await chrome.runtime.sendMessage({ type: 'clear-location' });
  show(response?.ok ? 'Location override cleared.' : (response?.error || 'Unable to clear override.'), Boolean(response?.ok));
});
