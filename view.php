<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/view.css">
    <title>게시글 보기</title>
</head>
<body>
    <?php
        session_start();
        $connect = mysqli_connect("127.0.0.1", "root", "sumin8411", "opentutorials");
        $number = $_GET['number'];
        
        $query = "select * from notice where number='$number'";
        $result = $connect->query($query);
        $rows = mysqli_fetch_assoc($result);
    ?>
     
    <table class="view_table" align=center>
        <tr>
            <td colspan="4" class="view_title"><?php echo $rows['title']; ?></td>
        </tr>
        <tr>
            <td class="view_no">글번호</td>
            <td class="view_no2"><?php echo $rows['number']; ?></td>
            <td class="view_id">작성자</td>
            <td class="view_id2"><?php echo $rows['id']; ?></td>
        </tr>
        <tr>
            <td colspan="4" class="view_content" valign="top">
            <?php echo $rows['content']?></td>
        </tr>
    </table>
    
    <div class="view_btn">
        <button class="view_btn1" onclick="location.href='./noticemain.php'">목록으로</button>
        <button class="view_btn1" onclick="location.href='./modify.php?number=<?=$number?>&id=<?=$_SESSION['userid']?>'">수정</button>
        <button class="view_btn1" onclick="location.href='./delete.php?number=<?=$number?>&id=<?=$_SESSION['userid']?>'">삭제</button>
    </div>
</body>
</html>
