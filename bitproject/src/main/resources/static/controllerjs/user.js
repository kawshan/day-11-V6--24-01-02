window.addEventListener('load', function () {

    //call refresh user table function
    refreshUserTable();

    //call refresh user form function
    refreshUserForm();

});

const refreshUserTable = () => {

    users = [];
    $.ajax("/user/findall", {
        async: false,
        type: "GET",
        contentType: 'json',
        success: function (data) {
            console.log(data)
            users = data;
        },
        error: function (resOb) {
            console.log("error" + resOb);
            users = [];
        }
    });


    const displayproperty = [
        {dataType: 'function', propertyName: getEmployee},
        {dataType: 'text', propertyName: 'username'},
        {dataType: 'text', propertyName: 'email'},
        {dataType: 'function', propertyName: getRole},
        {dataType: 'function', propertyName: getUserStatus},
    ];

    fillDataIntoTable1(tableUser, users, displayproperty, userFormRefill, deleteUser, printUser, true);

}
//create function for get full name
const getEmployee = (ob) => {
    return ob.employee_id.fullname;
}


//create function for get user role
const getRole = () => {
    return 'role';
}


//create function for get user status
const getUserStatus = (ob) => {
    if (ob.status == '1') {
        return '<p class="status-working">' + 'active' + '</p>';
    } else {
        return '<p class="status-delete">' + 'not active' + '</p>';
    }
}

//create function for user form refill
const userFormRefill = (ob, rowIndex) => {
    //need to create new and old object

    user = JSON.parse(JSON.stringify(ob));
    oldUser = JSON.parse(JSON.stringify(ob));

    //set value into element

    textUserName.value = user.username

    textPassword.value = ""
    textPassword.disabled = true

    textRePassword.value = "";
    textRePassword.disabled = true

    textEmail.value = user.email


    let employeeWithoutUserAccount = ajaxGetRequest("/employee/withoutuseraccount")
    employeeWithoutUserAccount.push(user.employee_id)
    fillDataIntoSelect(selectEmployee, 'select employee', employeeWithoutUserAccount,"fullname", user.employee_id.fullname);

    if (user.status){
        checkBoxStatus.checked = true;
        labelStatus.innerText = "user account is active"
    }else {
        checkBoxStatus.checked = false;
        labelStatus.innerText = "user account is not active"
    }



    //set valid colour

}


//define function for check form updates
const checkFormUpdate = ()=>{
    let updates;

    if (user.username != oldUser.username){
        updates = updates+ " user name changed \n "
    }
    if (user.email != oldUser.email){
        updates = updates+"\n email is changed " +oldUser.email +" into "+user.email+"\n"
    }
    if (user.employee_id.id != oldUser.employee_id.id){
        updates =updates+ "user employee is changed \n";
    }
    if (user.status != oldUser.status){
        updates = updates+"status is changed \n";
    }

    return updates;
}



//define function for user update
const updateUserForm = ()=>{
    console.log('update');
    //check form error
    let errors = checkUserFormError();
    if (errors == ""){

        //check form update
        let updates = checkFormUpdate();
        if (updates != ""){
            //user confirm
            let userConfirm = confirm("are you sure to update this changes \n "+updates);
            if (userConfirm){
                //call put service
                let putServiceResponse = ajaxHTTPRequest("/user","PUT",user)
                //check put service response
                if (putServiceResponse == 'ok'){
                    alert("update successfully");
                    refreshUserTable();
                    refreshUserForm();
                }else {
                    alert("update not completed has following error \n"+putServiceResponse);
                }
            }


        }else {
            alert("nothing to update");
        }

    }else {
        alert("you have following errors \n"+errors);
    }

}


//create function for delete user
const deleteUser = (ob, rowIndex) => {
    console.log("delete ", ob, rowIndex);


    //user confirmation
    let userConfirm = confirm("\n are you sure to delete following user \n"
        + '\n user name is ' + ob.username
        + '\n email is '+ob.email
    );
    if (userConfirm){
        //call delete service
       let deleteServiceResponse = ajaxHTTPRequest("/user","DELETE",ob);
        //check delete service response
       if (deleteServiceResponse == 'ok'){
           alert("delete successful");
           refreshUserTable();
       }else {
           alert("delete unsuccessful"+deleteServiceResponse);
       }
    }


}
// create function for print user
const printUser = (ob) => {

    tdUsername.innerText = ob.username;
    tdEmployee.innerText = ob.employee_id.fullname;
    tdEmail.innerText = ob.email;

    let status;
    if (ob.status){
        status='active'
    }else {
        status='in active'
    }

    tdStatus.innerText = status



let newWindow = window.open();
newWindow.document.write("<head>"+
    "<link rel='stylesheet' href='/bootstrap-5.2.3/css/bootstrap.min.css'></head><body>"+
    tableUserPrint.outerHTML+
    "<script> tableUserPrint.removeAttribute('style');</script></body>"


);
newWindow.print();

}


//define function for user form refresh
const refreshUserForm = () => {
    user = new Object();    //define new object
    formUser.reset();   // reset input and static elements

    //get employee list without user account and fill data into select element
    let employeeWithoutUserAccount = ajaxGetRequest("/employee/withoutuseraccount")
    fillDataIntoSelect(selectEmployee, 'select employee', employeeWithoutUserAccount, 'fullname');

    //get role list without admin and generate checkbox
    roleListWithoutAdmin = ajaxGetRequest("/role/listwithoutadmin")

    divRoles.innerHTML = "";

    roleListWithoutAdmin.forEach(role => {
        let div = document.createElement('div');    //create div element
        let input = document.createElement('input'); //create input element
        let label = document.createElement('label'); //create label element

        div.className = 'form-check form-check-inline';
        input.type = 'checkbox';
        input.className = 'form-check-input';
        label.className = 'form-check-label fw-bold';
        label.innerText = role.name;


        div.appendChild(input); //append input element into div
        div.appendChild(label); //append label element into div
        divRoles.appendChild(div); //append div element into mainRoleDiv


    })

    //set default color
    selectEmployee.style.border = '2px solid #ced4da';
    textUserName.style.border = '2px solid #ced4da';
    textPassword.style.border = '2px solid #ced4da';
    textRePassword.style.border = '2px solid #ced4da';
    textEmail.style.border = '2px solid #ced4da';

}



//define function  for check user form errors
const checkUserFormError = () => {
    let errors = '';

    if (user.employee_id == null) {
        errors = errors + 'employee cannot be empty \n';
    }

    if (user.username == null) {
        errors = errors + 'user name cannot be empty \n';
    }

    if (user.password == null) {
        errors = errors + 'password cannot be empty \n';
    }

    if (user.email == null) {
        errors = errors + 'email cannot be empty \n';
    }

    if (user.status == null) {
        errors = errors + 'status cannot be empty \n';
    }
    return errors;
}


//define function for submit user form
const submitUserForm = () => {
    console.log('submit');
    console.log(user);

    let errors = checkUserFormError();

    if (errors == "") {
        let userConfirm = confirm("are you sure to submit following user detail \n "
            + '\n user name' + user.username
            + '\n user email ' + user.email);
        if (userConfirm) {
            let postServiceResponse = ajaxHTTPRequest("/user", "POST", user);
            if (postServiceResponse == "ok") {
                alert("save successfully ")
                refreshUserTable();
                refreshUserForm();
            } else {
                alert('fail to add user \n' + postServiceResponse);
            }
        }

    } else {
        alert('user form has following error \n' + errors);
    }
}

//define function for check password retype
const textPasswordReTypeValidator = () => {
    if (textPassword.value == textRePassword.value) {
        user.password = textPassword.value;
        textRePassword.style.border = "2px solid green";
    } else {
        user.password = null;
        textRePassword.style.border = "2px solid red";
    }
}

















