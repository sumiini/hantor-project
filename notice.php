<html>
   <meta charset="utf-8">

<?php
 
$host = 'localhost';
$user = 'root';
$pw = 'sumin8411';
$dbName = 'opentutorials';
$mysqli = new mysqli($host, $user, $pw, $dbName);

 $number=$_POST['number'];
 $date=($_POST['date']);
 $content=$_POST['content'];
 
 
 $sql = "insert into notice (number, date, content)";             // (입력받음)insert into 테이블명 (column-list)
 $sql = $sql. "values('$number','$date','$content')";         // calues(column-list에 넣을 value-list)
 if($mysqli->query($sql)){                                                              //만약 sql로 잘 들어갔으면
  echo 'success inserting <p/>';                                                            //success inserting 으로 표시
  echo $date.'에 공지사항이 추가 되었습니다.<p/>';                                   // id님 안녕하세요.
 }else{                                                                                //아니면
  echo 'fail to insert sql';                                                            //fail to insert sql로 표시
 }
mysqli_close($mysqli);
 
 
?>
<input type="button" value="다시 글 등록하기" onclick="location='notice.php'">
</html>