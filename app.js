// get elements
const skills = document.getElementById('skills');
const empty_felids = document.getElementById('empty_felids');
const devs_add_data = document.getElementById('devs_add_data');
const all_devs_data = document.getElementById('all_devs_data');
const modal_single_view= document.getElementById('modal_single_view');
const modal_valid = document.querySelector('.modal-content');
const modal_valid_title = document.querySelector('.modal-content .modal-titel');


/**
 * Dynamic Skills Load Form Database
 */
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

function devs_data_list(){

    axios.get('http://localhost:7700/devloper').then( res => {
        let devs_data = '';

        res.data.map( (devs , index)=>{
            devs_data += `
            <tr>
                <td>${ index + 1}</td>
                <td>${ devs.name}</td>
                <td>${ devs.skillId}</td>
                <td>${ devs.email}</td>
                <td>${ devs.phone}</td>
                <td><img style="height: 50px; width: 50px; object-fit: cover;" src="${ devs.photo}" alt=""></td>
                <td>
                    <a class="btn btn-success btn-sm" data-bs-toggle="modal" href="#devs_single_view" onclick="singel_devs_data_view(${ devs.id})"><i class="fa fa-eye"></i></a>
                    <a class="btn btn-info btn-sm" data-bs-toggle="modal" href="#deves-data-edit"><i class="fa fa-edit"></i></a>
                    <a class="btn btn-danger btn-sm" href="#" onclick="singel_devs_delete(${ devs.id})"><i class="fa fa-trash"></i></a>
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
singel_devs_data_view()
function singel_devs_data_view(id){
    
    axios.get('http://localhost:7700/devloper').then( res => {


   
        // let single_data = '';
        // res.data.map( devs => {
        //     single_data += `
        //     <img src="${devs.photo}">
        //             <div class="devs-info">
        //                 <div class="devs-info-name">
        //                     <h3> ${devs.name}</h3>
        //                     <table class="table table-bordered table-striped">
        //                         <thead>
        //                             <th>Email</th>
        //                             <th>Phone</th>
        //                             <th>Skill</th>
        //                         </thead>
        //                         <tbody>
        //                             <tr>
        //                                 <td>${devs.email}</td>
        //                                 <td>${devs.phone}</td>
        //                                 <td>${devs.skillId}</td>
        //                             </tr>
        //                         </tbody>
        //                     </table>
        //                 </div>

        //             </div>
            
        //     `
        // })

        // modal_single_view.innerHTML = single_data;
    })
}

/**
 * Singel Data Delete 
 */

function singel_devs_delete(index){
  axios.delete('http://localhost:7700/devloper/'+index).then(res => {
   
  });
};


