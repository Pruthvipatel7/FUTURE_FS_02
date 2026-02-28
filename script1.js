const API = "http://localhost:5000/leads";

function loadLeads(){
  fetch(API)
    .then(res=>res.json())
    .then(data=>{
      let rows="";
      data.forEach(l=>{
        rows+=`
        <tr>
          <td>${l.name}</td>
          <td>${l.email}</td>
          <td>${l.source}</td>
          <td>
            <select onchange="updateStatus('${l._id}',this.value)">
              <option ${l.status=="New"?"selected":""}>New</option>
              <option ${l.status=="Contacted"?"selected":""}>Contacted</option>
              <option ${l.status=="Converted"?"selected":""}>Converted</option>
            </select>
          </td>
          <td>${l.notes}</td>
          <td><button onclick="deleteLead('${l._id}')">Delete</button></td>
        </tr>
        `;
      });
      document.getElementById("leads").innerHTML = rows;
    });
}

function addLead(){
  fetch(API,{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      name:name.value,
      email:email.value,
      source:source.value,
      notes:notes.value
    })
  }).then(()=>loadLeads());
}

function updateStatus(id,status){
  fetch(API+"/"+id,{
    method:"PUT",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({status})
  }).then(()=>loadLeads());
}

function deleteLead(id){
  fetch(API+"/"+id,{method:"DELETE"}).then(()=>loadLeads());
}

loadLeads();