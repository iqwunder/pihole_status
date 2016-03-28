var apikey, apiurl;

function restore_options() {
  // Use defaults if empty
  chrome.storage.sync.get({
    apikey: '123456789',
    apiurl: 'http://192.168.178.63/admin/apiext.php'
  }, function(items) {
    document.getElementById('apiurl').value = items.apiurl;
    document.getElementById('apikey').value = items.apikey;
  });

}

function toggleState() {
	var apikey = document.getElementById('apikey').value
	var apiurl = document.getElementById('apiurl').value

	var statusdata = {
      'piholekey': apikey,
      'action': 'toggleState' 
    };
	$.ajax({
      type:'POST',
      url: apiurl,
      data: statusdata,
      dataType: 'json',
    })    
	.done(function(data) {
		if($('#status').bootstrapSwitch('state')){
			$('form').append('<div id="alert" name="alert" class="alert alert-success">Pi-Hole enabled</div>').hide().fadeIn("slow"); 
		} else {
			$('form').append('<div id="alert" name="alert" class="alert alert-success">Pi-Hole disabled</div>').hide().fadeIn("slow"); 
		}
			$('#alert').delay(2000).fadeOut(5000, function() {
			  $(this).remove();
			});    
    })
    .fail(function(data) {
		$('form').append('<div id="alert" name="alert" class="alert alert-danger">Pi-Hole state toggling was not succesful</div>' + apiurl).hide().fadeIn("slow"); 
		$('#alert').delay(2000).fadeOut(5000, function() {
		  $(this).remove();
		});    
         console.log(data);
    });

}
function check_status(){
	var apikey = document.getElementById('apikey').value
	var apiurl = document.getElementById('apiurl').value
    
	var statusdata = {
      'piholekey': apikey,
      'action': 'status' 
    };
	$.ajax({
      type:'POST',
      url: apiurl,
      data: statusdata,
      dataType: 'json',
    })    
	.done(function(data) {
        if ( ! data.success) {
          if(data.errors.piholekey) {
            $('form').append('<div id="alert" name="alert" class="alert alert-danger">' + data.errors.piholekey + '</div>').hide().fadeIn("slow"); 
            $('#alert').delay(2000).fadeOut(5000, function() {
              $(this).remove();
            });
          }
        } else {
			$('#status').bootstrapSwitch('toggleDisabled');
			$('#status').bootstrapSwitch('state', data.state, true);			
        }
    })
    .fail(function(data) {
		$('form').append('<div id="alert" name="alert" class="alert alert-danger">Pi-Hole state toggling was not succesful</div>').hide().fadeIn("slow"); 
		$('#alert').delay(2000).fadeOut(5000, function() {
		  $(this).remove();
		});    
         console.log(data);
    });
	
}

document.addEventListener('DOMContentLoaded', function() {
	$('#status').bootstrapSwitch();	
	restore_options();
	window.setTimeout(check_status,1000);
	$('#status').on('switchChange.bootstrapSwitch', function (event, state) {		
		toggleState();
	});
});
