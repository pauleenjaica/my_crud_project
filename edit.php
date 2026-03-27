<?php 
include 'db_config/dbconn.php'; 
$id = $_GET['id'];
$result = mysqli_query($connection, "SELECT * FROM items WHERE id=$id");
$row = mysqli_fetch_assoc($result);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit Student Record</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background-color: #f4f7f6; }
        .edit-card { border: none; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card edit-card p-4">
                <h3 class="text-center mb-4 text-primary fw-bold">Update Student Info</h3>
                <form action="update.php" method="POST">
                    <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                    <div class="mb-3">
                        <label class="form-label fw-bold">Student Name</label>
                        <input type="text" name="name" class="form-control form-control-lg" value="<?php echo $row['item_name']; ?>" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Age</label>
                        <input type="number" name="price" class="form-control form-control-lg" value="<?php echo $row['price']; ?>" required>
                    </div>
                    <div class="d-grid gap-2">
                        <button type="submit" name="update" class="btn btn-success btn-lg">Update Record</button>
                        <a href="index.php" class="btn btn-light">Back to List</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</body>
</html>