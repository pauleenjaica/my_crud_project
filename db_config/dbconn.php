<?php
$connection = mysqli_connect("localhost", "root", "", "my_crud_db");
if(!$connection){
    die("Connection failed: " . mysqli_connect_error());
}
?>