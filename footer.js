const footerContainer = document.querySelector(".js-footer");

function getFaceBookLink(){
    document.querySelector('#facebook_btn').addEventListener('click',function(){
        location.href="https://www.facebook.com/AjouHantor/";
    })
}
function getInstagramkLink(){
    document.querySelector('#instagram_btn').addEventListener('click',function(){
        location.href="https://www.instagram.com/_suminvely/";
    })
}
function getKakaoLink(){
    document.querySelector('#kakaotalk_btn').addEventListener('click',function(){
        location.href="https://open.kakao.com/o/sdJ9xmyc";
    })
}

function init(){
    getFaceBookLink();
    getInstagramkLink();
    getKakaoLink();
}

init();
