//define browser on load event function
window.addEventListener('load', ()=>{

    //

    //call table refresh function
    refreshPrivilegeTable()

    //

});
//define table privilege refresh function
const refreshPrivilegeTable =()=>{

    //data array
    privileges=ajaxGetRequest("/privilege/findall");



    //property list
    const displayPropertyList=[
        {dataType:'function',propertyName:getRole},
        {dataType:'function',propertyName:getModule},
        {dataType:'function',propertyName:getSelect},
        {dataType:'function',propertyName:getinsert},
        {dataType:'function',propertyName:getUpdate},
        {dataType:'function',propertyName:getDelete}
    ];


    //call fill data into table function
    fillDataIntoTable1(tablePrivilege,privileges,displayPropertyList,refillPrivilege,deletePrivilege,printprivilege)

}

const getRole = (ob)=>{
    return ob.role_id.name
}
const getModule = (ob)=>{
    return ob.module_id.name;
}
const getSelect = (ob)=>{
    let Priv="not-granted"
    if (ob.sel){
        Priv="granted";
    }
    return Priv;
}
const getinsert = (ob)=>{
    let Priv="not-granted"
    if (ob.inst){
        Priv="granted";
    }
    return Priv;
}
const getUpdate = (ob)=>{
let Priv="not-granted";
if (ob.upd){
    Priv="granted"
}
return Priv;
}
const getDelete = (ob)=>{
    let Priv="not-granted";
    if (ob.del){
        Priv="granted"
    }
    return Priv;
}



const refillPrivilege = ()=>{

}
//define function for privilege
const deletePrivilege = (ob,rowInd)=>{
const userResponse= confirm('are you sure to delete following privilege \n'
    +' role ' + ob.role_id.name
    + ' module ' + ob.module_id.name
    );
if (userResponse){
    //call delete service
    let serverResponse = ajaxHTTPRequest("/privilege","DELETE",ob);
    if (serverResponse=="ok"){
        alert("delete successful");
        refreshPrivilegeTable();
    }else {
        alert("failed to delete privilege \n"+serverResponse);
    }
}
}
const printprivilege = ()=>{

}

