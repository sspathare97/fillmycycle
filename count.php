<?php
require('config.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$sql="SELECT * FROM `count`";
	$result = mysqli_query($conn, $sql);
	$row=mysqli_fetch_assoc($result);
	$count=$row['count'];
	if($_POST['action']=="update") {
		$count++;
		$sql="UPDATE `count` SET `count`=`count`+1";
		$result = mysqli_query($conn, $sql);
	}
	echo $count;
}
else header('Location: ./index.html');
?>