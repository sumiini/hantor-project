<?php
    session_start();
 
    // $connect = mysqli_connect("localhost", "root", "sumin8411", "opentutorials") or die("fail");
    $connect = mysqli_connect("localhost", "root", "sumin8411", "opentutorials") or die("fail");
 
    $id=$_GET['userid']; // 이전 write.php 폼에서 입력받은 아이디값
    $pw=$_GET['userpw']; // 이전 write.php 폼에서 입력받은 비밀번호값
    $title=$_GET['title'];
    $content=$_GET['content'];
    $filename=$_GET['file'];

    $file_id=$_GET['file_id'];
    $file=$_GET['file'];
    $file_name=$_GET['file'];


    
 
    //아이디가 있는지 검사
    // $query = "select * from person where id='$id'";
    $query = "select * from person where id='$id'";
    $result = $connect->query($query);
 
 
    //아이디가 있다면 비밀번호 검사
    if(mysqli_num_rows($result)==1) {
        $row=mysqli_fetch_assoc($result);
 
        //비밀번호가 맞다면 세션 생성
        if($row['pw']==$pw){
            $_SESSION['userid']=$id;
            if(isset($_SESSION['userid'])){?>     
            <?php
                $query2 = "insert into notice(title, content, id,filename) values('$title', '$content', '$id','$filename')";
                if($filename!=null){
                    $query3="insert into fileblob(file,file_name) values('$file','$file_name')";
                    ?>
                     <script>
                        alert("파일이 등록 되었습니다.");
                    </script>
                    <?php
                    
                    $connect->query($query3);
                }
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
