<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <!-- device마다 맞는 뷰포트 적용 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="css/default.css">
    <link rel="stylesheet" href="css/common.css">
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
        </div>
      </nav>

      <section class="notice-content-section">
        <h1>공지사항</h1>
        <?php
          session_start();
          $connect = mysqli_connect("localhost", "root", "970107", "opentutorials") or die("fail");
          // $connect = mysqli_connect("127.0.0.1", "root", "sumin8411", "opentutorials");
          // pull 받고 내꺼 주석처리하고 너꺼 주석 풀고 해

          // $page : GET 메소드로 현재 페이지 번호를 확인하기 위한 변수
          if(isset($_GET['page'])){
            $page = $_GET['page'];
          }else{
            $page = 1;
          }
        ?>
        <table class="postboard" style='margin: 7vh auto;'>
          <thead>
            <tr>
              <th class="tnum">번호</th>
              <th class="ttitle">제목</th>
              <th class="tdate">날짜</th>
              <th class="tperson">작성자</th>

            </tr>
          </thead>
          <?php  
            $query1 = "select * from notice";
            $result = $connect->query($query1);
            $row_num = mysqli_num_rows($result); //게시판 총 레코드 수

            $list = 15; //한 페이지에 보여줄 개수
            $block_ct = 5; //블록당 보여줄 페이지 개수

            $block_num = ceil($page/$block_ct); // 현재 페이지 블록 구하기
            $block_start = (($block_num - 1) * $block_ct) + 1; // 블록의 시작번호
            $block_end = $block_start + $block_ct - 1; //블록 마지막 번호

            $total_page = ceil($row_num / $list); // 페이징한 페이지 수 구하기

            if($block_end > $total_page) {
              $block_end = $total_page; //만약 블록의 마지박 번호가 페이지수보다 많다면 마지박번호는페이지 수
            }
            $total_block = ceil($total_page/$block_ct); //블럭 총 개수
            $start_num = ($page-1) * $list; //시작번호 (page-1)에서 $list를 곱한다.
            $query2 = "select * from notice order by number desc limit $start_num, $list";
            $result2 = mysqli_query($connect, $query2);          
          ?>
          <tbody id="tbody" >
              
            <?php
              if(mysqli_num_rows($result2)>0){ // 출력할 행이 있을 경우에만 아래 블록 실행
                  while($row = mysqli_fetch_assoc($result2)){
                      echo '<tr>
                      <td class="cnum">'.$row["number"].'</td>
                      <td class="ctitle"><a href=view.php?db="opentutorials"&number='.$row["number"].'>'.$row["title"].'</a></td>                    
                      <td class="cdate">'.$row["date"].'</td>
                      <td class="cperson">'.$row["id"].'</td>
                      </tr>';

                  }
              }else{ // 테이블에 출력할 행이 없으면 아래 블록 실행
                  echo "no data to print...";
              }

            ?>
          </tbody>

        </table>
        <div id="page_num">
          <ul>
            <?php
              if($page == 1){
                echo "<li class='fo_re'><a class='fo_re' href='noticemain.php?page=1'>처음</a></li>"; 
              }
              else{
                $pre = $page-1; 
                echo "<li><a href='noticemain.php?page=$pre'>◀이전</a></li>"; 
              }

              for($i=$block_start; $i<=$block_end; $i++){ 
                //for문 반복문을 사용하여, 초기값을 블록의 시작번호를 조건으로 블록시작번호가 마지박블록보다 작거나 같을 때까지 $i를 반복시킨다
                if($page == $i){
                  echo "<li class='fo_re'>[$i]</li>";
                }else{
                  echo "<li><a href='noticemain.php?page=$i'>[$i]</a></li>";
                }
              }

              if($page >= $total_page){
                echo "<li><a class='fo_re' href='noticemain.php?page=$total_page'>마지막</a></li>"; 
              }else{
                $next = $page + 1;
                echo "<li><a href='noticemain.php?page=$next'>다음▶</a></li>";
              }
            ?>
          </ul>
        </div>
        <input id="writebtn" type="button" value="글쓰기" onclick="location='write.php'" style='float: right'>

      </section>   
      <!-- 하단 sns 링크 바 -->
      <footer class="js-footer">
        <div class="sns_btn">
          <button id="facebook_btn" onclick="">facebook</button>
          <button id="instagram_btn" onclick="">instagram</button>
          <button id="kakaotalk_btn" onclick="">kakaotalk</button>
        </div>
      </footer>
      <script src="footer.js"></script>
      <script src="js/notice.js" charset="utf-8"></script>
    </div>

  </body>
</html>