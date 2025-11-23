document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggle');
  const closeBtn = document.getElementById('closeBtn');


  if (chrome && chrome.storage && chrome.storage.sync) {
    chrome.storage.sync.get({ playerOnly: false }, (res) => {
      toggle.checked = Boolean(res.playerOnly);
    });
  } else {
    toggle.checked = false;
  }

  toggle.addEventListener('change', () => {
    const enabled = !!toggle.checked;

    chrome.storage.sync.set({ playerOnly: enabled }, () => {

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs || !tabs.length) return;
        for (const t of tabs) {
          try {
            chrome.tabs.sendMessage(t.id, { action: 'apply', enabled }, () => {});
          } catch (e) {

          }
        }
      });
    });
  });

  closeBtn.addEventListener('click', () => {
    window.close();
  });
});
