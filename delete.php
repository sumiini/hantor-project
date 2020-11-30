<?php
    session_start();
    // $connect = mysqli_connect("127.0.0.1", "root", "sumin8411", "opentutorials");
    $connect = mysqli_connect("127.0.0.1", "root", "970107", "opentutorials");
    $number = $_GET['number'];
    $sql = "delete from notice where number='$number';";
    $result = $connect->query($sql);
?>
<script type="text/javascript">alert("삭제되었습니다.");</script>
<meta http-equiv="refresh" content="0 url=./noticemain.php" />