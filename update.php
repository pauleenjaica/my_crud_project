<?php
include 'db.php';
if(isset($_POST['update'])) {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $price = $_POST['price'];
    $sql = "UPDATE items SET item_name='$name', price='$price' WHERE id=$id";
    if (mysqli_query($conn, $sql)) {
        header("Location: index.php");
    }
}
?>