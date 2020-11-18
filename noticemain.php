<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <!-- device마다 맞는 뷰포트 적용 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="css/default.css">
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/intro.css">
    <link rel="stylesheet" href="css/noticemains.css">
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
          <a href="index.html" class="local-menu-item" target="_self">Hantor</a>
          <a href="intro.html" class="intro-btn">한터소개</a>
          <a href="noticemain.php" class="notice-btn">공지사항</a>
          <a href="studyroom.html" class="studyroom-btn">스터디룸</a>
        </div>
      </nav>

      <nav class="intro-main-section">
        
        

        <section class="intro-content-section">
          <table clase="postboard" style='margin: auto'>

          <thead>
          <tr>
            <th id="tnum" width="75px">번호</th>
            <th id="ttitle" width="150px">제목</th>
            <th id="tdate" width="150px">날짜</th>
            <th id="tperson" width="75px">작성자</th>

          </tr>
          </thead>
          <tbody id="tbody" >
            
          <?php
            
            $conn = mysqli_connect("127.0.0.1", "root", "sumin8411", "opentutorials");
            $sql = "select * from notice order by number desc limit 0,10";
            $result = mysqli_query($conn, $sql);
        
            if(mysqli_num_rows($result)>0){ // 출력할 행이 있을 경우에만 아래 블록 실행
                while($row = mysqli_fetch_assoc($result)){
                    echo '<tr>

                    <td width="75px" align="center" style="font-family:verdana; font-size: medium; border-bottom:1px solid; padding-top:10px; padding-bottom:10px; ">'.$row["number"].'</td>
                    <td width="150px" align=center" style=" font-family:verdana; font-size: medium; text-align:center; border-bottom:1px solid; padding-top:10px; padding-bottom:10px;""><a href=view.php?db="opentutorials"&number='.$row["number"].'>'.$row["title"].'</a></td>                    
                    <td width="150px" align="center" style="font-family:verdana; font-size: medium; border-bottom:1px solid; padding-top:10px; padding-bottom:10px;">'.$row["date"].'</td>
                    <td width="75px" align="center" style="font-family:verdana; font-size: medium; border-bottom:1px solid; padding-top:10px; padding-bottom:10px;">'.$row["id"].'</td>
                    </tr>';

                }
            }else{ // 테이블에 출력할 행이 없으면 아래 블록 실행
                echo "no data to print...";
            }

            mysqli_close($conn);
        ?>
        </tbody>

        </table>
        <input id="writebtn" type="button" value="글쓰기" onclick="location='write.php'" style='float: right'>

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

  </body>
</html>