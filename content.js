(function () {
  'use strict';

  const STYLE_ID_GLOBAL = 'yt-remove-radius-global';
  const STYLE_ID_PLAYER = 'yt-remove-radius-player';

  const cssGlobal = `
    body, body *,
    ytd-app, ytd-page-manager, ytm-app, ytm-page-manager,
    #content, #container, #masthead-container, #header,
    #items, #primary, #secondary,
    .ytp-chrome-top, .ytp-chrome-bottom, .ytp-button, .ytp-menu, .ytp-slider,
    .ytp-thumbnail, .ytp-panel, .ytp-panel-content, .ytp-panel-promo,
    .ytp-progress-bar-container, .ytp-ce-element, .ytp-title, .ytp-title-channel,
    .ytd-video-renderer, .ytd-rich-grid-media, .ytd-compact-video-renderer,
    .ytm-rich-item-renderer, .ytm-media-item, .ytm-thumbnail, .ytm-video-with-context-renderer {
      border-radius: 0 !important;
      box-shadow: none !important;
    }
  `;

  const cssPlayer = `
    /* Safe remove only the player area */
    ytd-player,
    #player,
    #player-container,
    #player-wide-container,
    #movie_player,
    .html5-video-player {
      border-radius: 0 !important;
      overflow: visible !important;
      box-shadow: none !important;
    }

    video,
    .html5-main-video {
      border-radius: 0 !important;
      overflow: visible !important;
      box-shadow: none !important;
      clip-path: none !important;
      mask-image: none !important;
    }
  `;

  function addStyle(id, css) {
    if (document.getElementById(id)) return;
    const s = document.createElement('style');
    s.id = id;
    s.textContent = css;
    document.documentElement.appendChild(s);
  }

  function removeStyle(id) {
    const s = document.getElementById(id);
    if (s) s.remove();
  }

  function applyMode(enabled) {
    if (enabled) {
      removeStyle(STYLE_ID_GLOBAL);
      addStyle(STYLE_ID_PLAYER, cssPlayer);
    } else {
      removeStyle(STYLE_ID_PLAYER);
      addStyle(STYLE_ID_GLOBAL, cssGlobal);
    }
  }

  chrome.storage.sync.get({ playerOnly: false }, (res) => {
    applyMode(res.playerOnly);
  });

  chrome.storage.onChanged.addListener((changes) => {
    if (changes.playerOnly) {
      applyMode(changes.playerOnly.newValue);
    }
  });

})();
