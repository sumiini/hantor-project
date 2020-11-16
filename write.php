
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/write.css">
        <title>게시물 등록</title>
    </head>
    <body>
        
        <h2>글쓰기</h2>
        <h4>*게시물은 등록된 사용자만이 작성할 수 있습니다*</h4>

        <form class="wrtieform" method='get' action='write_action.php'>
            <div class="container">
                <label for="userid"><strong>ID</strong></label>
                <input id="userid" type="text" placeholder="아이디" name="userid" required>

                <label for="userpw"><strong>Password</strong></label>
                <input id="userpw" type="password" placeholder="비밀번호" name="userpw" required>

                <label for="title"><strong>Title</strong></label>
                <input id="title" type="text" placeholder="제목" name="title" required>

                <label for="content"><strong>Content</strong></label><br>
                <textarea name=content rows=15 placeholder="내용을 입력하세요."></textarea>
 

                <div class="clearfix">
                    <button type="submit" class="signupbtn" value="signup">확인</button>
                    <button type="button" class="cancelbtn" value="cancel" onclick="location.href='./noticemain.php'">취소</button>
                </div>
            </div>
        </form>
    </body>
</html> 
=======
<html>
   <meta charset="utf-8">

   <section >
         
          <form name="add_notice" method="POST" action="notice.php">
            <section id="noticeTable">
            <h1>input notice content</h1>

                <div>
                    <h2>제목</h2>
                    <input type="text" size="100" name="title">

                </div>

                <div>
                    <h3>내용</h3>
                    <input type="text" size="100" name="content">

                </div>
              
            <input type=submit value="글작성" onclick="location='noticemain.php'">
          </form>

          
        </section>
   
  
</html>
