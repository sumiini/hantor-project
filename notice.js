let noticeBtn = document.querySelector("button");
let noticeUl = document.getElementById("noticeCo");
let noticeTableSection = document.getElementById("noticeTable");
let cnt = 0;
let today = new Date();

let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜

let addNotice = document.createElement("li");
let newNotice = document.querySelector("textarea");
const NOTICE_LS='noticeContent';
const noticeContentArr = [];
function saveContent(){
    localStorage.setItem('noticeContent',JSON.stringify(noticeContentArr));

    localStorage.setItem(NOTICE_LS,JSON.stringify(noticeContentArr));


}

noticeBtn.addEventListener("click" ,function paintNotice(text){
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

function loadNotice(){
    const loadedNotice = localStorage.getItem(NOTICE_LS);
    if(loadedNotice!==null){
        const parsedNotice = JSON.parse(loadedNotice);
        parsedNotice.forEach(function(noTice){
            paintNotice(noTice.content);
        });
    }
}

loadNotice();

function handleSubmit(event){
    event.preventDefault();
    const currentValue = newNotice.value;
    paintNotice(currentValue);
    newNotice.value="";

}





