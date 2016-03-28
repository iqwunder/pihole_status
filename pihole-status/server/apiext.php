<?php
// API Key.
$apiKey = "123456789";

//Path to script file and gravity.list
$statusScript = "/usr/local/bin/pihole_status.sh";
$gravityList = "/etc/pihole/gravity.list";

// results.
$errors = array();
$data   = array();

// check the key.
$userKey = (isset($_REQUEST['piholekey']) && !empty($_REQUEST['piholekey'])) ? $_REQUEST['piholekey'] : 0;
if($userKey != $apiKey) {
    $data['success'] = false;
    $data['errors']['piholekey'] = "API ERR: Key Auth Fail. Check your Settings.";
    echo json_encode($data);
    exit();
}

// Action check.
$userAction = strtolower((isset($_REQUEST['action']) && !empty($_REQUEST['action'])) ? $_REQUEST['action'] : 'none');
if($userAction == 'none') {       
    $data['status'] = false;
    $data['errors']['action'] = "API ERR: No Action Requested.";
    print json_encode($data);
    exit();
}

//checking pi hole state.
if($userAction == "status") {
   $data['success'] = true;
   // check existance of gravity file. gravity exists => pi hole is active.
   $data['state'] = file_exists($gravityList);
   $data['message'] = 'Pi-Hole is active';
   $data['action'] = $userAction;
   print json_encode($data);
   exit();
}
//execute script for toggling state.
if($userAction == "togglestate") {
    $data['success'] = true;
    $data['message'] = "Action toggleState executed";
    $data['action'] = $userAction;
    $data['response'] = switchPiHoleState();
    print json_encode($data);
    exit();
} else {
   echo "nope.";
}


// script execution.
function switchPiHoleState() {
  global $statusScript;
  $command = 'sudo ' . $statusScript;
  exec($command, $result);
  return $command;
}
