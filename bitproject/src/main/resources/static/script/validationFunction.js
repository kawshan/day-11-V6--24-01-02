// define function for validating text element
const textValidator = (fieldId,pattern,object,property)=>{
    console.log(fieldId.value);

    //create variable for assign regEXP object
    const regPattern = new RegExp(pattern);

    if (fieldId.value != ""){
        //if value exist
        if (regPattern.test(fieldId.value)){
            //if value valid
            window[object][property] = fieldId.value
            fieldId.style.border='2px solid green';
        }else {
            //if value is invalid
            window[object][property] = null;
            fieldId.style.border='2px solid red';
        }
    }else {
        //if value not exist
        if (fieldId.required){
            fieldId.style.border='1px solid red';
        }else {
            fieldId.style.border='1px solid #ced4da';
        }
    }
}


//define validation for select element
const selectDValidation = (fieldId,pattern,object,property) =>{

    if (fieldId.value != ""){
        //valid
        fieldId.style.border= '2px solid green';
        window[object][property] = JSON.parse(fieldId.value);
    }else {
        //invalid
        fieldId.style.border= '2px solid green'
        window[object][property] = null
    }
}

const selectSValidation = (fieldId,pattern,object,property) =>{
    if (fieldId.value != ""){
        //valid
        fieldId.style.border= '2px solid green';
        window[object][property] = fieldId.value
    }else {
        //invalid
        fieldId.style.border= '2px solid red';
        window[object][property]=null;

    }
}
