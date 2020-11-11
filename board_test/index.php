
<!doctype html>
<head>
<meta charset="UTF-8">
<title>게시판</title>
<link rel="stylesheet" type="text/css" href="css/style.css" />
</head>
<body>

<div id="board_area"> 
  <h1>자유게시판</h1>
  <h4>자유롭게 글을 쓸 수 있는 게시판입니다.</h4>
  <table class="list-table">
      <thead>
          <tr>
              <th width="70">번호</th>
                <th width="200">내용</th>
                <th width="100">작성일</th>
            </tr>
        </thead>
        <?php
        // board테이블에서 idx를 기준으로 내림차순해서 5개까지 표시
        $conn = mysqli_connect("127.0.0.1", "dondon", "5Susdpdlf!", "opentutorials");
        $sql = "select * from notice order by number desc limit 0,10";
        $result = mysqli_query($conn, $sql);

        while($row = mysqli_fetch_assoc($result)){
              
        ?>
        <tbody>
          <tr>
            <td width="70"><?php echo $row['number']; ?></td>
            <td width="200"><a href=""><?php echo $row['content'];?></a></td>
            <td width="100"><?php echo $row['date']?></td>
          </tr>
        </tbody>
        <?php } ?>
    </table>
    <div id="write_btn">
      <a href="/page/board/write.php"><button>글쓰기</button></a>
    </div>
  </div>
</body>
</html>