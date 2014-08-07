
<?php

$request_body = file_get_contents('php://input');

if(!empty($request_body)) {

	$data = json_decode($request_body);

	require_once dirname(__FILE__) . '/../lib/meekrodb.2.3.class.php';
	
	$first_name = filter_var ($data->first_name, FILTER_SANITIZE_SPECIAL_CHARS);
	$last_name = filter_var ($data->last_name, FILTER_SANITIZE_SPECIAL_CHARS);
	$email = filter_var ($data->email, FILTER_SANITIZE_SPECIAL_CHARS);
	$question_one = $data->questionOne;
	$question_two = $data->questionTwo;
	$question_three = $data->questionThree;
	$question_four = $data->questionFour;
	$question_five = $data->questionFive;

	DB::$user = 'yoav_user';
	DB::$password = 'hudhdudh12';
	DB::$dbName = 'yoav_government_app';

	DB::insert('government_survey', array(
  	'first_name' => $first_name,
  	'last_name' => $last_name,
  	'email' => $email,
  	'question_one' => $question_one,
  	'question_two' => $question_two,
  	'question_three' => $question_three,
  	'question_four' => $question_four,
  	'question_five' => $question_five
	));
}