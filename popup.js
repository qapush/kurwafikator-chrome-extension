const level = document.querySelector('select');

chrome.storage.sync.get(['level'], function(result) {
    if(result.level) level.value = result.level;
});

level.addEventListener('change', e => {
    chrome.storage.sync.set({level: e.target.value});
});