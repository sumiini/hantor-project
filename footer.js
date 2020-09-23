const footerContainer = document.querySelector(".js-footer");

function getFaceBookLink(){
  document.querySelector('#facebook_btn').addEventListener('click',function(){
    window.open("https://www.facebook.com/AjouHantor/", "_blank")
  })
}
function getInstagramkLink(){
  document.querySelector('#instagram_btn').addEventListener('click',function(){
    window.open("https://www.instagram.com/_suminvely/", "_blank")
  })
}
function getKakaoLink(){
  document.querySelector('#kakaotalk_btn').addEventListener('click',function(){
    window.open("https://open.kakao.com/o/sdJ9xmyc", "_blank")
  })
}

function init(){
    getFaceBookLink();
    getInstagramkLink();
    getKakaoLink();
}

init();
