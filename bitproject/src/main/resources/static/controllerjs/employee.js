//browser on load event
window.addEventListener('load', () => {


// call table refresh funtion
    refreshEmployeeTable();

    //call refresh emoloyee form
    refreshEmployeeForm();



});


const refreshEmployeeTable = () => {

    /*    employees=[
            {id:1, fullName:'haritha pramoda', nic:'200019502906', email:'hartha@gmail.com', mobile:'0722837355',designation_id:{id:1, name:'manager'}, hasUserAccount:true ,employeeStatus_id:{id:1, name:'working'}},
            {id:2, fullName:'haritha pramoda', nic:'200019502906', email:'hartha@gmail.com', mobile:'0722837355',designation_id:{id:1, name:'manager'}, hasUserAccount:true ,employeeStatus_id:{id:1, name:'delete'}},
            {id:3, fullName:'haritha pramoda', nic:'200019502906', email:'hartha@gmail.com', mobile:'0722837355',designation_id:{id:1, name:'manager'}, hasUserAccount:false ,employeeStatus_id:{id:1, name:'resign'}},
            {id:4, fullName:'haritha pramoda', nic:'200019502906', email:'hartha@gmail.com', mobile:'0722837355',designation_id:{id:1, name:'manager'}, hasUserAccount:true ,employeeStatus_id:{id:1, name:'working'}},
            // {id:2, fullName:'haritha pramoda', nic:'200020502906', email:'hartha@gmail.com', mobile:'0722837356', employeeStatus_id:{id:1, name:'resign'}},
            // {id:3, fullName:'kawshan virantha', nic:'200021502906', email:'kawshan@gmail.com', mobile:'0722837357', employeeStatus_id:{id:1, name:'working'}},
            // {id:4, fullName:'nuwan bandara', nic:'200022502906', email:'nuwan@gmail.com', mobile:'0722837358', employeeStatus_id:{id:1, name:'delete'}}
        ];*/


    employees = [];
    $.ajax("/employee/findall",
        {
            async: false,
            type: "GET",
            contentType: "json",
            success: function (data) {
                console.log(data);
                employees = data;
            },
            error: function (resOb) {
                console.log(resOb);
                employees = [];
            }
        })


    // text-> string date number
    //function ->object array boolean -- create function
    //column count === object count
    const displayProperty = [
        {dataType: 'text', propertyName: 'fullname'},
        {dataType: 'text', propertyName: 'nic'},
        {dataType: 'text', propertyName: 'email'},
        {dataType: 'function', propertyName: getHasUserAccount},
        {dataType: 'text', propertyName: 'mobile'},
        {dataType: 'function', propertyName: getDesignation},
        {dataType: 'function', propertyName: getEmployeeStatus}
    ];


// call fillDataIntoTable funtion
// (tableID, dataArrayName, displayPropertyArea,editfuntion, deletefunction, printfuntion, button Visibility);

    fillDataIntoTable1(tableEmployee, employees, displayProperty, employeeFormRefill, deleteEmployee, printEmployee, true);
    // fillDataIntoTable2(tableEmployee, employees,displayProperty,employeeFormRefill, deleteEmployee, printEmployee);
    // fillDataIntoTable3(tableEmployee,employees,displayProperty,true);
    // fillDataIntoTable4(tableEmployee, employees,displayProperty,true);


}

//create funtion getEmployeeStatus
const getEmployeeStatus = (ob) => {
    if (ob.employeestatus_id.name == 'working') {
        return '<p class="status-working">' + ob.employeestatus_id.name + '</p>';
    }
    if (ob.employeestatus_id.name == 'resign') {
        return '<p class="status-resign">' + ob.employeestatus_id.name + '</p>';
    }
    if (ob.employeestatus_id.name == 'delete') {
        return '<p class="status-delete">' + ob.employeestatus_id.name + '</p>';
    }


}

const getDesignation = (ob) => {
    return ob.designation_id.name;
}


const getHasUserAccount = (ob) => {

    if (ob.hasUserAccount) {
        return '<i class="fa-solid fa-circle-check fa-2x text-success"></i>'
    } else {
        return '<i class="fa-solid fa-circle-xmark fa-2x text-danger"></i>'

    }

}

//add funtion
// function add (){
//     refreshEmployeeTable();
// }


// employeeFormRefil, deleteEmployee, printEmployee

// create function for employee form refill
const employeeFormRefill = (ob, rowIndex) => {

    employee = JSON.parse(JSON.stringify(ob));
    oldemployee = JSON.parse(JSON.stringify(ob));

    console.log('refil');
    $('#modalEmployeeAdd').modal('show');


    textFullName.value = employee.fullname;
    txtCallingName.value = employee.callingname;
    txtNic.value = employee.nic;
    // radioMale.value = ob.
    // radioFemale.value = ob.
    dateDateOfBirth.value = employee.dob;
    textEmail.value = employee.email;
    textMobile.value = employee.mobile;
    if (employee.landno == null){
        textLand.value = employee.landno;
    }else {
        textLand.value="";
    }
    textLand.value = employee.landno;
    textAddress.value = employee.address;
    textNote.value = employee.note;
    selectCivilStatus.value =employee.civilstatus;


    //radio button
    if (employee.gender == 'female'){
        radioFemale.checked = true;
    }else {
        radioMale.checked= true
    }

    //dynamic select element


    fillDataIntoSelect(selectDesignation, 'select Designation', designations, 'name',employee.designation_id.name);

    fillDataIntoSelect(selectStatus, 'select status', employeeStatuses, 'name',employee.employeestatus_id.name);



}

// define function for check updates
const checkEmployeeFormUpdate = () => {
    let updates = "";

    if (employee.email != oldemployee.email) {
        updates = updates + "email is changed \n";
    }

    if (employee.mobile != oldemployee.mobile) {
        updates = updates + "mobile is changed \n";
    }

    if (employee.nic != oldemployee.nic) {
        updates = updates + "nic is changed " + oldemployee.nic + "into " + employee.nic + "\n";
    }

    if (employee.employeestatus_id.name != oldemployee.employeestatus_id.name){
        updates = updates + "status is changed " + oldemployee.employeestatus_id.name + 'into '+ employee.employeestatus_id.name;
    }


    return updates;
}


//define function for update form data
const buttonFormUpdate = () => {
    console.log("update");
    console.log(employee);
    console.log(oldemployee);

    //need to check form errors
    let errors = checkFormErrors();
    if (errors == "") {
        let updates = checkEmployeeFormUpdate();
        if (updates == "") {
            alert("nothing changed");
        } else {
            const userConfirm = confirm("are you sure to update this employee \n" + updates);
            if (userConfirm) {
                //call put service
                let putServiceResponse;
                //call jquery ajax
                //url , options
                $.ajax("/employee", {
                    async: false,
                    contentType: "application/json",
                    type: "PUT",
                    data:JSON.stringify(employee),
                    success: function (data) {
                        console.log('success'+data)
                        putServiceResponse=data;
                    },
                    error: function (resOb) {
                        console.log('fail '+ resOb)
                        putServiceResponse=resOb;
                    }

                });
                if (putServiceResponse == 'OK'){
                    //successful
                    alert('update successful');
                    refreshEmployeeTable();
                    employeeForm.reset();
                    refreshEmployeeForm();

                    $("#modalEmployeeAdd").modal("hide");
                }else {
                    // unsuccessful
                    alert('fail to update have following error \n '+putServiceResponse)

                }

            }
        }
    } else {
        alert("form has following errors \n" + errors);
    }
}

// create funtion for delete employee
const deleteEmployee = (ob, rowIndex) => {
    console.log('delete');

    tableEmployee.children[1].children[rowIndex].style.backgroundColor = 'pink'

    setTimeout(function () {
        const userConfirm = confirm('are you sure to delete following employee \n'
            + '\n full name is ' + ob.fullname
            + '\n nic is ' + ob.nic
            + '\n status is ' + ob.employeestatus_id.name
        );

        if (userConfirm) {

            //call delete service
            let deleteServerResponse = 'ok';


            $.ajax("/employee", {
                async: false,
                type: "DELETE",
                contentType: "application/json",
                data: JSON.stringify(ob),
                success: function (data) {
                    console.log("success " + data);
                    deleteServerResponse = data;
                },
                error: function (restOb) {
                    console.log("failed " + restOb)
                    deleteServerResponse = restOb;
                }
            });


            if (deleteServerResponse == 'ok') {
                alert('delete successfully');
            } else {
                alert('delete unsuccessfull you have following erros \n' + deleteServerResponse);
            }
        }
        refreshEmployeeTable();
    }, 500)


}

// create function for print employee
const printEmployee = (ob, rowIndex) => {
    console.log('print');
}

//define function for check error
const checkFormErrors = () => {
    let errors = '';

    if (employee.fullname == null) {
        errors = errors + "full name cannot be empty \n";
        textFullName.classList.add('is-invalid');
    }
    if (employee.callingname == null) {
        errors = errors + "calling name cannot be empty\n";
    }
    if (employee.callingname == null) {
        errors = errors + "calling name cannot be empty \n";
    }
    if (employee.email == null) {
        errors = errors + "email cannot be empty \n";
    }
    if (employee.mobile == null) {
        errors = errors + "mobile cannot be empty \n";
    }
    // if (employee.landno == null) {
    //     errors = errors + "land no cannot be empty";
    // }
    if (employee.address == null) {
        errors = errors + "address cannot be empty";
    }
    // if (employee.note == null) {
    //     errors = errors + "note cannot be empty \n";
    // }
    if (employee.employeestatus_id == null) {
        errors = errors + "employee status cannot be empty";
    }

    return errors;
}


//create function for submit employee form
const employeeSubmit = () => {
    // console.log('button submit ');
    console.log(employee);

    // check form error
    const errors = checkFormErrors();

    if (errors == '') {
        // if errors not available
        //get user confirmation
        const confirmMSJ = 'are you sure to add following employee \n'
            + '\n full name is ' + employee.fullname
            + '\n nic is ' + employee.nic
            + '\n email is' + employee.email
            + '\n status is' + employee.employeestatus_id.name;

        const userConfirm = confirm(confirmMSJ)


        if (userConfirm) {
            //pass data into backend
            //check server response
            let postServerResponse;

            $.ajax("/employee/employeeform", {
                async: false,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(employee),
                success: function (data) {
                    console.log(data);
                    postServerResponse = data;
                },
                error: function (restOb) {
                    console.log(restOb)
                    postServerResponse = restOb;
                }
            })
        }


    } else {
        alert('form has following errors \n ' + errors);
    }

}

//define function for validate full name and generate calling function
const fullNameValidator = (fieldId) => {
    const pattern = '^([A-Z][a-z]{2,20}[\\s])+([A-Z][a-z]{2,20})$';
    const regPattern = new RegExp(pattern);

    if (regPattern.test(fieldId.value)) {
        //valid
        fieldId.style.border = '2px solid green'
        employee.fullname = fieldId.value;//value bind

        // need to generate calling name
        fullNameValuePartList = fieldId.value.split(' ');
        dlNameParts.innerHTML = '';
        fullNameValuePartList.forEach(element => {
            const option = document.createElement('option');
            option.value = element;
            dlNameParts.appendChild(option);
        });
        // employee.firstName = fullNameValuePartList[0];
        // employee.lastName = fullNameValuePartList[fullNameValuePartList.length-1];


    } else {
        //invalid
        fieldId.style.border = '2px solid red';
        employee.fullname = null
    }

}

// define function for calling name validator
const textCallingNameValidator = (fieldId) => {
    const callingNameValue = fieldId.value;

    const index = fullNameValuePartList.map(element => element).indexOf(callingNameValue);
    console.log(index);
    if (index != -1) {
        //valid
        fieldId.style.border = '2px solid green';
        employee.callingname = callingNameValue;
    } else {
        //invalid
        fieldId.style.border = '2px solid red'
        employee.callingname = null;
    }
}



//define function for employee form refresh
const refreshEmployeeForm = ()=>{

// create object
    employee = new Object();


    designations = ajaxGetRequest("/designation/findall")

    fillDataIntoSelect(selectDesignation, 'select Designation', designations, 'name');

    employeeStatuses = ajaxGetRequest("/status/findall")

    fillDataIntoSelect(selectStatus, 'select status', employeeStatuses, 'name');


    //refill static employee values
    //elementId.value = object.propertyName
    textFullName.style.border='1px solid #ced4da';
    txtCallingName.style.border='1px solid #ced4da';
    txtNic.style.border='1px solid #ced4da';
    dateDateOfBirth.style.border='1px solid #ced4da';
    textEmail.style.border='1px solid #ced4da';
    textMobile.style.border='1px solid #ced4da';
    textAddress.style.border='1px solid #ced4da';
    textLand.style.border='1px solid #ced4da';
    textNote.style.border='1px solid #ced4da';
    selectStatus.style.border='1px solid #ced4da';
    selectDesignation.style.border='1px solid #ced4da';
    selectCivilStatus.style.border='1px solid #ced4da';






}



