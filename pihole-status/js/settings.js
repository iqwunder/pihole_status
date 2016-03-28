// Saves options to chrome.storage.sync.
function save_options() {
  var piholeurl = document.getElementById('apiurl').value;
  var piholekey = document.getElementById('apikey').value;
  chrome.storage.sync.set({
    apikey: piholekey,
    apiurl: piholeurl
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.innerHTML = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

// Localstorage 
function restore_options() {
  // Use defaults
  chrome.storage.sync.get({
    apikey: '123456789',
    apiurl: 'http://pihole/admin/apiext.php'
  }, function(items) {
    document.getElementById('apiurl').value = items.apiurl;
    document.getElementById('apikey').value = items.apikey;
  });
}

// Empty storage
function clear_options() {
  chrome.storage.sync.clear();
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('clear').addEventListener('click', clear_options);
