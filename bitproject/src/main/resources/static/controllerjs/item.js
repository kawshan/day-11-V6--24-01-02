window.addEventListener('load',()=>{
    console.log('working');

    refreshItemTable();
});


const refreshItemTable = ()=>{

    items=ajaxGetRequest("/item/findall");

    const displayPropertyList=[
        {dataType:'text',propertyName:''},
    ];



};