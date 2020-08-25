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

function init(){
    fetchTeacherList();
}

init();