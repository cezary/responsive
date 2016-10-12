function parseQuery(url) {
  let [pathname, qs] = url.split('?');
  qs = qs.split('+').join(' ');

  let params = {};
  let tokens;
  const re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}

window.onload = function() {
  const inputEl = document.querySelector('input.url');
  const formEl = document.querySelector('.inputs form');

  function initUrl() {
    const query = parseQuery(window.location.href);
    if (query.url) inputEl.value = query.url;
  }

  function getUrl() {
    return inputEl.value;
  }

  function setUrl(url) {
    const iframeEls = Array.from(document.querySelectorAll('.device iframe'));
    iframeEls.forEach(iframeEl => iframeEl.src = url);
  }

  formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    const url = inputEl.value;
    window.history.replaceState({}, '', `?url=${encodeURIComponent(url)}`)
    setUrl(url);
  });

  initUrl();
  setUrl(getUrl());
};
