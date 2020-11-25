<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <style>
        a:link { color: black; text-decoration: none;}
        a:visited { color: black; text-decoration: none;}
        a:hover { color: rgb(43, 89, 117); text-decoration: none;}
        a:active { color: rgb(43, 89, 117); text-decoration: none;}

        .view_table{
            border: 1px solid #444444;
            margin: 6% 6% 0 6%;
        }
        
        .view_title {
            width: 100vw;
            height: 3rem;
            text-align: center;
            background-color: rgb(43, 89, 117);
            color: white;
            font-weight: bold;
            font-size: 1.3rem;
        }

        .view_no, .view_id{
            text-align: center;
            background-color: #EEEEEE;
            width: 15%; 
        }

        .view_no2, .view_id2{
            text-align: center;
            background-color: rgba(255, 255, 255, 0.5);
            width: 35%;
        }

        .view_content {
            padding-top: 20px;
            height: 500px;
            border-top: 1px solid #444444;
        }

        .view_btn {
            margin-top: 3%;
            height: 200px;
            text-align: center;
        }

        .view_btn1 {
            margin: 0 1em;
            justify-content: center;
            font-size: 1em;
            font-weight: bold;
            text-align: center;
        }
    </style>
    <title>게시글 보기</title>
</head>
<body>
    <?php
        session_start();
        // $connect = mysqli_connect("127.0.0.1", "root", "sumin8411", "opentutorials");
        $connect = mysqli_connect("127.0.0.1", "root", "970107", "opentutorials");
        $number = $_GET['number'];
        $query = "select * from notice where number='$number'";
        $result = $connect->query($query);
        $rows = mysqli_fetch_assoc($result);
    ?>
    <table class="view_table" align=center>
        <thead>
            <tr>
                <td colspan=4 class="view_title"><?php echo $rows['title']; ?></td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="view_no">글번호</td>
                <td class="view_no2"><?php echo $rows['number']; ?></td>
                <td class="view_id">작성자</td>
                <td class="view_id2"><?php echo $rows['id']; ?></td>            
            </tr>
            <tr>
                <td class="view_file"><a href="./<?php echo $rows['filename'] ?>" download><?php echo $rows['filename']; ?></a></td>
            </tr>
            <tr>
                <td colspan="4" class="view_content" valign="top"><?php echo $rows['content']; ?></td>
            </tr>
        </tbody>
    </table>
    <div class="view_btn">
        <a class="view_btn1" href="./noticemain.php">목록으로</a>
        <a class="view_btn1" href="./modify.php?number=<?=$number?>&id=<?=$_SESSION['userid']?>">수정</a>
        <a class="view_btn1" href="./delete.php?number=<?=$number?>&id=<?=$_SESSION['userid']?>">삭제</a>
    </div>
</body>
</html>
