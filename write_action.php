<?php
    session_start();
 
    $connect = mysqli_connect("localhost", "dondon", "5Susdpdlf!", "opentutorials") or die("fail");
 
    $id=$_GET['userid']; // 이전 write.php 폼에서 입력받은 아이디값
    $pw=$_GET['userpw']; // 이전 write.php 폼에서 입력받은 비밀번호값
    $title=$_GET['title'];
    $content=$_GET['content'];
 
    //아이디가 있는지 검사
    $query = "select * from member where id='$id'";
    $result = $connect->query($query);
 
 
    //아이디가 있다면 비밀번호 검사
    if(mysqli_num_rows($result)==1) {
        $row=mysqli_fetch_assoc($result);
 
        //비밀번호가 맞다면 세션 생성
        if($row['pw']==$pw){
            $_SESSION['userid']=$id;
            if(isset($_SESSION['userid'])){?>     
            <?php
                $query2 = "insert into notice(title, content, id) values('$title', '$content', '$id')";
                $connect->query($query2);    
            ?>
                <script>
                    alert("게시물이 등록 되었습니다.");
                    location.replace("./noticemain.php");
                </script>
        <?php
            }else{
                echo "session fail";
            }
        }else {
        ?>
            <script>
                alert("아이디 혹은 비밀번호가 잘못되었습니다.");
                history.back();
            </script>
        <?php
        }
    }else{?>              
        <script>
            alert("아이디 혹은 비밀번호가 잘못되었습니다.");
            history.back();
        </script>
    <?php
    } 
?>
