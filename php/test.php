<?php 
	
	$email = $_POST['email'];
	function successHandler($message=NULL){
		die(json_encode(array(
			'type'     => 'success',
			'response' => $message
		)));
	}

	function errorHandler($message=NULL){
		die(json_encode(array(
			'type'     => 'error',
			'response' => $message
		)));
	}

	successHandler("Test form received. Test email is $email");
 ?>