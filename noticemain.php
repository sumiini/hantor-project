<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <!-- device마다 맞는 뷰포트 적용 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="css/default.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/intro.css">
    <link rel="stylesheet" href="css/notice.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;900&display=swap" rel="stylesheet">
    <title>notice</title>
  </head>
  <body>
    <div class="container">
      <!-- 자주가는 사이트 추가(심심해서 넣음) -->
      <nav class="global-menu">
        <div class="global-menu-links">
          <a href="https://portal.ajou.ac.kr" rel="noopener noreferrer" target="_blank" class="global-menu-item">Ajou Portal</a>
          <a href="https://eclass2.ajou.ac.kr/" rel="noopener noreferrer" target="_blank" class="global-menu-item">BlackBoard</a>
          <a href="https://github.com/" rel="noopener noreferrer" target="_blank" class="global-menu-item">Github</a>
          <a href="https://www.apple.com/kr-k12/shop?afid=p238%7CsyQ1OEsz4-dc_mtid_18707vxu38484_pcrid_258798361876_pgrid_50422948013_&cid=aos-kr-kwgo-edu--slid---product--" rel="noopener noreferrer" target="_blank" class="lobal-menu-item">Apple 교육할인</a>
        </div>
      </nav>
      <!-- 상단 메뉴바  -->
      <nav class="local-menu">
        <div class="local-menu-links">
          <a href="#" class="local-menu-item">공지사항</a>
          <a href="intro.html" class="intro-btn">한터소개</a>
          <a href="notice.html" class="notice-btn">공지사항</a>
          <a href="studyroom.html" class="studyroom-btn">스터디룸</a>
        </div>
      </nav>

      
      <nav class="intro-main-section">
        
        

        <section class="intro-content-section">
          <table>

          <thead>
          <tr>
          <th width="100px">No.</th>
          <th width="200px">내용</th>
          <th width="200px">날짜</th>
          </tr>
          </thead>
          <tbody >
          <?php
            // phpinfo();
            // 1, DB 연결 mysqli_connect(호스트 주소, 호스트명, 비밀번호, 디비이름)
            $conn = mysqli_connect("127.0.0.1", "root", "970107", "opentutorials");
            // 2. 쿼리문 작성(반드시 변수에 저장해야되는건 아님)
            $sql = "select * from notice order by number desc limit 0,10";
          // 3. 작성한 쿼리문을 연결한 디비에 전달하기 위해 mysqli_query(연결한 db, 쿼리문) 사용
            $result = mysqli_query($conn, $sql);
        
            if(mysqli_num_rows($result)>0){ // 출력할 행이 있을 경우에만 아래 블록 실행
                while($row = mysqli_fetch_assoc($result)){
                    echo '<tr><td width="100px">'.$row["number"].'</td><td width="200px">'.$row["content"].'</td><td width="200px">'.$row["date"].'</td></tr>';
                }
            }else{ // 테이블에 출력할 행이 없으면 아래 블록 실행
                echo "no data to print...";
            }

            mysqli_close($conn);
        ?>
        </tbody>

        </table>
        <input type="button" value="글쓰기" onclick="location='write.php'">

        </section>
        
        
      </nav>
      <!-- 하단 sns 링크 바 -->
      <footer class="js-footer">
        <div class="sns_btn">
          <button id="facebook_btn" onclick="">facebook</button>
          <button id="instagram_btn" onclick="">instagram</button>
          <button id="kakaotalk_btn" onclick="">kakaotalk</button>
        </div>
      </footer>
      <script src="footer.js"></script>
    </div>
    <script src="notice.js"></script>

  </body>
</html>