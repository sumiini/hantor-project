let noticeBtn = document.querySelector("button");
let noticeUl = document.getElementById("noticeCo");
let cnt = 0;
let today = new Date();


//forEach 랑 filter는 list에 있는 모든 item을 위한 함수를 실행시키는 것

noticeBtn.addEventListener("click" ,function(){
    cnt++;

    let addNotice = document.createElement("li");
    let newNotice = document.querySelector("input");

    addNotice.innerHTML = document.getElementById("inputID").value;


    
    noticeUl.appendChild(addNotice);
    
    



    

})

