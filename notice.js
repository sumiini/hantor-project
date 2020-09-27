let noticeBtn = document.querySelector("button");
let noticeUl = document.getElementById("noticeCo");
let cnt = 0;
let today = new Date();

let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜

//forEach 랑 filter는 list에 있는 모든 item을 위한 함수를 실행시키는 것
let addNotice = document.createElement("li");
let newNotice = document.querySelector("textarea");

let noticeContentArr = [];
function saveContent(){
    localStorage.setItem('noticeContent',JSON.stringify(noticeContentArr));


}

noticeBtn.addEventListener("click" ,function(){
    cnt++;

    
    let todayDate = '\t'+year+'/'+month+'/'+date;

    addNotice.innerHTML = newNotice.value +'\t'+todayDate;


    
    noticeUl.appendChild(addNotice);

    const noticeObj = {
        content: newNotice.value,
        todayDay : todayDate
    };
    noticeContentArr.push(noticeObj);

    

    saveContent();

    
    
})



