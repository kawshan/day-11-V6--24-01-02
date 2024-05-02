
const ajaxHTTPRequest = (url,method,data)=>{
    let serverResponse;


    $.ajax(url, {
        async: false,
        type: method,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (data) {
            console.log("success " + data);
            serverResponse = data;
        },
        error: function (restOb) {
            console.log("failed " + restOb);
            serverResponse = restOb;
        }
    });
    return serverResponse;
}



//define function for ajax get request

const ajaxGetRequest=(url)=>{
    let servicesResponse;
    $.ajax(url,{
        async: false,
        type: "GET",
        contentType: "json",
        success:function (data) {
            console.log(data);
            servicesResponse=data;
        },
        error:function (resOb) {
            console.log(resOb);
            servicesResponse=[];
        }
    });
    return servicesResponse;
}


//define function for fill data into select element

const fillDataIntoSelect = (fieldId,message,dataList,property,selectedValue)=>{
    fieldId.innerHTML=''
    const optionMsg = document.createElement('option');
    optionMsg.innerText = message;
    optionMsg.selected='selected';
    optionMsg.disabled='disabled';
    fieldId.appendChild(optionMsg);


    dataList.forEach(element => {
        const option = document.createElement('option');
        option.innerText=element[property];
        option.value=JSON.stringify(element); // json string ekak set kararanna one nisa meka dynamic dropdown mewa data base eken gannn one
        if (selectedValue == element[property]){
            option.selected = 'selected';
            console.log('ssss');
        }
        fieldId.appendChild(option);            // convert javascript object into json string --> option element value type is string
    });

}
