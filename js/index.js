teacher_list=[];

function fetchTeacherList(){
    let requestURL = "https://raw.githubusercontent.com/hyecheol123/Lingua_Teacher_Manage_Prototype/master/data.json";
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.send();
    request.onreadystatechange = function(){
        if(request.readyState == XMLHttpRequest.DONE){
            if(request.status == 200){
               teacher_list = JSON.parse(request.responseText);
               renderTeacherList();
            }
        }
    }
}

function createTeacherTableItem(item, idx){
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.scope="row"
    th.innerText= idx+1;
    const ntd = document.createElement("td");
    ntd.innerText=item.name;
    const dtd = document.createElement("td");
    dtd.innerText=item.dept;
    const ctd = document.createElement("td");
    ctd.innerText=item.contact;

    tr.appendChild(th);
    tr.appendChild(ntd);
    tr.appendChild(dtd);
    tr.appendChild(ctd);
    
    return tr;
}

function renderTeacherList(){
    const tbody = document.querySelector("#teacher-table > tbody");
    teacher_list.forEach((item, idx) => {
       let tr= createTeacherTableItem(item, idx);
       tbody.appendChild(tr);
    });
}

function enterTest() {
    // function to check whether enter key is pressed inside "search-form"
    // when enter key pressed, search teacher by the name
    if(window.event.keyCode == 13) {
        search();
    }
}

function search(){
    let name = document.querySelector(".search-form").value;
    let obj = teacher_list.find(item=>{
        return item.name == name;
    })
    if(obj!=undefined){
        // Write data to the text box
        (new Image()).src = obj.profile_img; // 프로필 이미지
        document.getElementById("profile-img").src = obj.profile_img;
        document.getElementById("staticDept").value = obj.dept; // 부서
        document.getElementById("staticContact").value = obj.contact; // 연락처
        if(obj.nid == null) { // 주민등록번호
            document.getElementById("staticNid").value = "N/A";
        } else {
            document.getElementById("staticNid").value = obj.nid;
        }
        document.getElementById("staticAddr").value = obj.addr; // 주소지
        document.getElementById("staticAccount").value = obj.account; // 계좌번호
        if(obj.reg == false) { // 교육청 등록
            document.getElementById("staticReg").value = "X";
        } else {
            document.getElementById("staticReg").value = obj.reg;
        }
        if(obj.scrime == true) { // 성범죄자 확인
            document.getElementById("staticScrime").value = "O";
        } else {
            document.getElementById("staticScrime").value = "X";
        }
        document.getElementById("memo").value = obj.memo; // 기타 작성 사항
    }else alert("Not Existing Teacher: " + name);

}

function init(){
    fetchTeacherList();
}

init();