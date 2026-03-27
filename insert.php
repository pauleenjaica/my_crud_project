<?php
include 'db.php';
if(isset($_POST['add'])) {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $sql = "INSERT INTO items (item_name, price) VALUES ('$name', '$price')";
    if (mysqli_query($conn, $sql)) {
        header("Location: index.php");
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>