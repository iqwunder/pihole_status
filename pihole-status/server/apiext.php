<?php

if (isset($_GET['status'])) {
  $status = exec('sudo pihole status web');
} else if (isset($_GET['enable'])) {
  exec('sudo pihole enable');
  $status = exec('sudo pihole status web');
} else if (isset($_GET['disable'])) {
  exec('sudo pihole disable');
  $status = exec('sudo pihole status web');
} else{
  $status = "Falsche Anweisung";
}
header('Content-type: application/json');

$data   = array();

 $data['status'] = $status;
 echo json_encode($data);
?>
