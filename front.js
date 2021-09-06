const q_modal = document.createElement('div');
const q_modal_inner = document.createElement('div');
const q_text = document.createElement('p');
const q_close = document.createElement('span');
const q_copy = document.createElement('span');
const q_copySuccess = document.createElement('span');


q_close.innerHTML = 'zamknij';
q_copy.innerHTML = 'kopiuj';
q_copySuccess.innerHTML = 'skopiowano';

q_modal.classList.add('q_modal', 'q_hidden');
q_modal_inner.classList.add('q_modal_inner');
q_text.classList.add('q_text');
q_close.classList.add('q_close')
q_copy.classList.add('q_copy')
q_copySuccess.classList.add('q_copy_success','q_hidden')

q_close.addEventListener('click', hideResult);
q_copy.addEventListener('click', copyResult);

q_modal.append(q_close);
q_modal.append(q_modal_inner);
q_modal.append(q_copy);
q_modal.append(q_copySuccess);
q_modal_inner.append(q_text);
document.querySelector('body').append(q_modal);

chrome.runtime.onMessage.addListener(
    function(request) {
        chrome.storage.sync.get(['level'], function(result) {
            if(result.level) {
                kurwafikacja(request.text, result.level)
            }
        });
    }
);

function kurwafikacja(rawText, level){
    // SET VARIABLES
    const kurwa = "kurwa",
          chunk = Number(level),
          rawArray = rawText.split(' ');
          
    let result = [];
    // ADD KURWA
    for(let i = 0, size = chunk; i < rawArray.length; i += chunk, size += chunk) {
        let currentChunk = rawArray.slice(i,size);
        console.log(currentChunk);
        result = result.concat(currentChunk);
        if(currentChunk.length == chunk || i == 0) result.push(kurwa);
    }
    
    // SHOW RESULT
    q_text.innerHTML = result.join(' ');
    showResult();
}

function showResult(){
    q_modal.classList.remove('q_hidden');
    document.querySelector('body').style.overflow = 'hidden';
}

function hideResult(){
    q_modal.classList.add('q_hidden');
    document.querySelector('body').style.overflow = 'scroll';
}
 function copyResult(){
    navigator.clipboard.writeText(q_text.innerHTML).then(function() {
        // success

        q_copySuccess.classList.remove('q_hidden');
        setTimeout(()=> {
            q_copySuccess.classList.add('q_hidden')
        }, 2000 );

      }, function() {
        // error
      });
 }