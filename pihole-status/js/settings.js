// Saves options to chrome.storage.sync.
function save_options() {
  var piholeurl = document.getElementById('apiurl').value;
  chrome.storage.sync.set({
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
    apiurl: 'http://pihole/admin/apiext.php'
  }, function(items) {
    document.getElementById('apiurl').value = items.apiurl;
  });
}

// Empty storage
function clear_options() {
  chrome.storage.sync.clear();
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('clear').addEventListener('click', clear_options);
