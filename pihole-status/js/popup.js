var apiurl;

function restore_options() {
  // Use defaults if empty
  chrome.storage.sync.get({
    apiurl: 'http://192.168.178.63/admin/apiext.php'
  }, function(items) {
    document.getElementById('apiurl').value = items.apiurl;
  });
}

function toggleState() {
	var apiurl = document.getElementById('apiurl').value
	var state = $('#status').bootstrapSwitch('state');
	if (!state){
		apiurl = apiurl + "?disable";
	} else {
		apiurl = apiurl + "?enable";
	}
	$.ajax({
      type:'POST',
      url: apiurl,
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
	var apiurl = document.getElementById('apiurl').value    

	$.ajax({
      type:'GET',
      url: apiurl + "?status",
    })    
	.done(function(data) {
		$('#status').bootstrapSwitch('toggleDisabled');
        if ( data.status == 1) {
			$('#status').bootstrapSwitch('state', true, true);			
		} else {
			$('#status').bootstrapSwitch('state', false, true);			
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
