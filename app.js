// get elements
const empty_felids = document.getElementById('empty_felids');
const modal_valid = document.querySelector('.modal-content');
const modal_valid_title = document.querySelector('.modal-content .modal-titel');


/**
 * Dynamic Skills Load Form Database
 */

const skills = document.getElementById('skills');

function skill_load (){
    axios.get('http://localhost:7700/skill').then( res =>{

    let skill_list = '';
    res.data.map( skill => {
        
        skill_list += `
            <option value="${skill.id}">${skill.name}</option>
            `
    }); 
    skills.insertAdjacentHTML('beforeend', skill_list);
});
};

skill_load();


/**
 * All Devs Data List
 */
const all_devs_data = document.getElementById('all_devs_data');

function devs_data_list(){

    axios.get('http://localhost:7700/devloper').then( res => {
        let devs_data = '';

        res.data.map( (devs , index)=>{
            devs_data += `
            <tr>
                <td>${ index + 1}</td>
                <td>${ devs.name}</td>
                <td>${ devs.email}</td>
                <td>${ devs.phone}</td>
                <td><img style="height: 50px; width: 50px; object-fit: cover;" src="${ devs.photo}" alt=""></td>
                <td>
                    <a class="btn btn-success btn-sm" data-bs-toggle="modal" href="#devs_single_view" onclick="singel_devs_data_view(${ devs.id})"><i class="fa fa-eye"></i></a>
                    <a class="btn btn-info btn-sm" data-bs-toggle="modal" href="#deves-data-edit" onclick="singel_devs_edit(${ devs.id})"><i class="fa fa-edit"></i></a>
                    <a class="btn btn-danger btn-sm" data-bs-toggle="modal" href="#del_alert" onclick="singel_devs_delete(${ devs.id})"><i class="fa fa-trash"></i></a>
                </td>
            </tr>
            `
        })
        
        all_devs_data.innerHTML = devs_data;
    })
    
}

devs_data_list()

/**
 * Devs Data Add
 */
 const devs_add_data = document.getElementById('devs_add_data');

devs_add_data.addEventListener('submit', function(e){
    e.preventDefault();

    let name = this.querySelector('#name');
    let email = this.querySelector('#email');
    let phone = this.querySelector('#phone');
    let photo = this.querySelector('#photo');
    let skills = this.querySelector('#skills');

    if(name.value == '' || email.value == '' || phone.value == ''|| skills.value == ''  || photo == ''){
        empty_felids.innerHTML = `<div class="alert alert-danger"> All Feilds Are Required!</div>`
        modal_valid.style.border = "1px solid #ad2e2f"
        modal_valid_title.style.color =  "#ad2e2f";

    }else{
    
        axios.post('http://localhost:7700/devloper',{

            id : '',
            name : name.value,
            email : email.value,
            phone : phone.value,
            photo : photo.value,
            skillId : skills.value

        }).then( res => {

            name.value = ''
            email.value = ''
            phone.value = ''
            photo.value = ''
            skills.value = ''
           
            devs_data_list();
            
        })


    };
    
});


/**
 * Devs modal_single_view
 */

 const modal_single_view= document.getElementById('modal_single_view');
singel_devs_data_view()
function singel_devs_data_view(id){
    
    axios.get('http://localhost:7700/devloper').then( res => {
    
        axios.get(`http://localhost:7700/skill/${id}`).then( skill => {


            let single_data = '';
            res.data.map( devs => {
                single_data = `
                <img src="${devs.photo}">
                        <div class="devs-info">
                            <div class="devs-info-name">
                                <h3> ${devs.name}</h3>
                                <table class="table table-bordered table-striped">
                                    <thead>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Skill</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>${devs.email}</td>
                                            <td>${devs.phone}</td>
                                            <td>${skill.data.name}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
            
                        </div>
                
                `
            })
            modal_single_view.innerHTML = single_data;
        })

        
    })
}

        


/**
 * Singel Data Delete 
 */
const data_delete = document.getElementById('delData');

function singel_devs_delete(id){

    data_delete.setAttribute('delId', id)
 
};

data_delete.addEventListener('click', function(){
    let del_id = this.getAttribute('delId')
    axios.delete(`http://localhost:7700/devloper/${del_id}`).then(res => {
    devs_data_list();
  });
})


/**
 * Single Devs Data Edit
 */
const edit_devs = document.getElementById('edit_devs')

function singel_devs_edit(id){
    let name = document.querySelector('#ename');
    let email = document.querySelector('#eemail');
    let phone = document.querySelector('#ephone');
    let photo = document.querySelector('#ephoto');
    let skill = document.querySelector('#eskills');
    let eid = document.querySelector('#eid');
    let preview = document.querySelector('#epreview');

    axios.get(`http://localhost:7700/devloper/${id}`).then( res => {
        
        eid.value = res.data.id;
        name.value = res.data.name;
        email.value = res.data.email;
        phone.value = res.data.phone;
        photo.value = res.data.photo;
        skill.value = res.data.skillId;
        preview.setAttribute('src', res.data.photo)
    })
}

edit_devs.addEventListener('submit', function(e){
    e.preventDefault();

    let name = this.querySelector('#ename');
    let email = this.querySelector('#eemail');
    let phone = this.querySelector('#ephone');
    let photo = this.querySelector('#ephoto');
    let skill = this.querySelector('#eskills');
    let eid = this.querySelector('#eid');

    axios.put(`http://localhost:7700/devloper/${eid.value}`,{

        id : "",
        name  : name.value,
        email : email.value,
        phone : phone.value,
        photo : photo.value,
        skillId : skill.value


    }).then( res => {

        name.value = '';
        email.value = '';
        phone.value = '';
        photo.value = '';

        devs_data_list();
    })

})

