let noticeBtn = document.querySelector("button");
let noticeUl = document.getElementById("noticeCo");
let noticeTableSection = document.getElementById("noticeTable");
let cnt = 0;
let today = new Date();

let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜

//forEach 랑 filter는 list에 있는 모든 item을 위한 함수를 실행시키는 것
let addNotice = document.createElement("li");
let newNotice = document.querySelector("textarea");

const noticeContentArr = [];
function saveContent(){
    localStorage.setItem('noticeContent',JSON.stringify(noticeContentArr));
}

noticeBtn.addEventListener("click" ,function(){
    cnt+=1;

    
    let todayDate = "\t"+year+'/'+month+'/'+date;

    
    const noticeObj = {
        content: newNotice.value,
        todayDay : todayDate
    };
    noticeContentArr.push(noticeObj);

    

    saveContent();

    function makeTable(){
        let tableValue = document.getElementById("valueTable");
        let tr = document.createElement("tr");
        let tableContent = document.createElement("td");
        let tableDate = document.createElement("td");
        tableValue.appendChild(tr);
        
        tableContent.innerHTML=noticeContentArr[noticeContentArr.length-1].content;
        tableDate.innerHTML=noticeContentArr[noticeContentArr.length-1].todayDay;
    
        tr.appendChild(tableContent);
        tr.appendChild(tableDate);
    
    
    }

    makeTable();

    
    
})







