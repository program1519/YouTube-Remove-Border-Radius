(function(){
  'use strict';
  const css = `
  body, body *, 
  ytd-app, ytd-page-manager, ytm-app, ytm-page-manager, 
  #content, #container, #masthead-container, #header, #items, #primary, #secondary,
  .ytp-chrome-top, .ytp-chrome-bottom, .ytp-button, .ytp-menu, .ytp-slider,
  .ytp-thumbnail, .ytp-panel, .ytp-panel-content, .ytp-panel-promo,
  .ytp-progress-bar-container, .ytp-ce-element, .ytp-title, .ytp-title-channel,
  .ytd-video-renderer, .ytd-rich-grid-media, .ytd-compact-video-renderer,
  .ytm-rich-item-renderer, .ytm-media-item, .ytm-thumbnail, .ytm-video-with-context-renderer {
    border-radius: 0 !important;
    box-shadow: none !important;
  }`;

  function inject() {
    try {
      if (document.getElementById('yt-remove-radius-style')) return;
      const s = document.createElement('style');
      s.id = 'yt-remove-radius-style';
      s.type = 'text/css';
      s.appendChild(document.createTextNode(css));
      (document.head || document.documentElement).appendChild(s);
    } catch (e) {
      console.warn('failed', e);
    }
  }

  inject();

  const obs = new MutationObserver(() => inject());
  obs.observe(document.documentElement || document, { childList: true, subtree: true });
})();
