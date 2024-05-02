const fillDataIntoTable1 = (tableID, dataList, columnsList, editFunction, deleteFunction, printFunction, buttonVisibility = true )=>{

    const tableBody = tableID.children[1];
    tableBody.innerHTML='';

    dataList.forEach((element,index)=>{

        const tr =document.createElement('tr');

        const tdIndex =document.createElement('td');
        tdIndex.innerText=parseInt(index)+1;
        tr.appendChild(tdIndex);


        columnsList.forEach(column =>{
            const td =document.createElement('td');

            if (column.dataType=='text'){
                td.innerText=element[column.propertyName];
            }
            if (column.dataType=='function'){
                td.innerHTML=column.propertyName(element);
            }
            tr.appendChild(td);
        });



        const tdButton =document.createElement('td');


        const buttonEdit=document.createElement('button');
        buttonEdit.className='btn btn-warning fw-bold';
        buttonEdit.innerHTML='<i class="fa-solid fa-edit fa-beat"></i> edit'
        tdButton.appendChild(buttonEdit);
        buttonEdit.onclick = function (){
            editFunction(element,index);

        }

        const buttonDelete=document.createElement('button');
        buttonDelete.className='btn btn-danger ms-2 me-2'
        buttonDelete.innerHTML='<i class="fa-solid fa-trash fa-beat"></i> delete'
        tdButton.appendChild(buttonDelete);
        buttonDelete.onclick = function (){
            deleteFunction(element,index);
            // console.log('delte');
            // confirm('are you sure to delete following employee');
        }

        const buttonPrint=document.createElement('button');
        buttonPrint.className='btn btn-primary fw-bold';
        buttonPrint.innerHTML='<i class="fa-solid fa-eye fa-beat"></i> print';
        tdButton.appendChild(buttonPrint);
        buttonPrint.onclick = function (){
            printFunction(element,index);
        }



        if (buttonVisibility){
            tr.appendChild(tdButton);
        }

        tableBody.appendChild(tr);






    });

}



const fillDataIntoTable2 = (tableID, dataList, columnsList, editFunction, deleteFunction, printFunction)=>{

    const tableBody = tableID.children[1];
    tableBody.innerHTML='';

    dataList.forEach((element,index)=>{

        const tr =document.createElement('tr');

        const tdIndex =document.createElement('td');
        tdIndex.innerText=parseInt(index)+1;
        tr.appendChild(tdIndex);


        columnsList.forEach(column =>{
            const td =document.createElement('td');

            if (column.dataType=='text'){
                td.innerText=element[column.propertyName];
            }
            if (column.dataType=='function'){
                td.innerHTML=column.propertyName(element);
            }
            tr.appendChild(td);
        });




        const tdButton =document.createElement('td');
        const dropDownDiv=document.createElement('div');
        dropDownDiv.className='dropdown';

        const dropdownI = document.createElement('i');
        dropdownI.className = 'fa-solid fa-ellipsis-vertical';
        dropdownI.setAttribute('data-bs-toggle','dropdown');
        dropdownI.setAttribute('aria-expanded','false');

        const dropdownUl = document.createElement('ul');
        dropdownUl.className = 'dropdown-menu';

        const dropdownMenuLiEdit = document.createElement('li');
        dropdownMenuLiEdit.className = 'dropdown-item';

        const buttonEdit=document.createElement('button');
        buttonEdit.className='btn btn-warning fw-bold';
        buttonEdit.innerHTML='<i class="fa-solid fa-edit fa-beat"></i> edit'
        tdButton.appendChild(buttonEdit);
        buttonEdit.onclick = function (){
            editFunction(element,index);

        }
        dropdownMenuLiEdit.appendChild(buttonEdit);




        const dropDownMenuLiDelete = document.createElement('li');
        dropDownMenuLiDelete.className = 'dropdown-item';

        const buttonDelete=document.createElement('button');
        buttonDelete.className='btn btn-danger ms-2 me-2'
        buttonDelete.innerHTML='<i class="fa-solid fa-trash fa-beat"></i> delete'
        tdButton.appendChild(buttonDelete);
        buttonDelete.onclick = function (){
            deleteFunction(element,index);
            // console.log('delte');
            // confirm('are you sure to delete following employee');
        }
        dropDownMenuLiDelete.appendChild(buttonDelete);








        const dropDownMenuLiPrint = document.createElement('li');
        dropDownMenuLiPrint.className='dropdown-item';
        const buttonPrint=document.createElement('button');
        buttonPrint.className='btn btn-primary fw-bold';
        buttonPrint.innerHTML='<i class="fa-solid fa-eye fa-beat"></i> print';
        tdButton.appendChild(buttonPrint);
        buttonPrint.onclick = function (){
            printFunction(element,index);
        }
        dropDownMenuLiPrint.appendChild(buttonPrint);


        dropdownUl.appendChild(dropdownMenuLiEdit);
        dropdownUl.appendChild(dropDownMenuLiDelete);
        dropdownUl.appendChild(dropDownMenuLiPrint);

        dropDownDiv.appendChild(dropdownI);
        dropDownDiv.appendChild(dropdownUl);

        tdButton.appendChild(dropDownDiv);
        tr.appendChild(tdButton);

        tableBody.appendChild(tr);



    });

}



const fillDataIntoTable3 = (tableID, dataList, columnsList, buttonVisibility = true )=>{

    const tableBody = tableID.children[1];
    tableBody.innerHTML='';

    dataList.forEach((element,index)=>{

        const tr =document.createElement('tr');

        const tdIndex =document.createElement('td');
        tdIndex.innerText=parseInt(index)+1;
        tr.appendChild(tdIndex);


        columnsList.forEach(column =>{
            const td =document.createElement('td');

            if (column.dataType=='text'){
                td.innerText=element[column.propertyName];
            }
            if (column.dataType=='function'){
                td.innerHTML=column.propertyName(element);
            }
            tr.appendChild(td);
        });



        const tdButton =document.createElement('td');
        tdButton.className = 'text-center'


        const inputRadio=document.createElement('input');
        inputRadio.className='form-check-input mt-3';
        inputRadio.name='modify';
        inputRadio.type='radio';

        inputRadio.onchange = function (){
            window['editOb'] = element;
            window['editRow'] = index;
            divModify.className = 'd-block'
        }

        tdButton.appendChild(inputRadio);



        if (buttonVisibility){
            tr.appendChild(tdButton);
        }

        tableBody.appendChild(tr);


    });

}



const fillDataIntoTable4 = (tableID, dataList, columnsList, buttonVisibility = true )=>{

    const tableBody = tableID.children[1];
    tableBody.innerHTML='';

    dataList.forEach((element,index)=>{

        const tr =document.createElement('tr');

        const tdIndex =document.createElement('td');
        tdIndex.innerText=parseInt(index)+1;
        tr.appendChild(tdIndex);


        columnsList.forEach(column =>{
            const td =document.createElement('td');

            if (column.dataType=='text'){
                td.innerText=element[column.propertyName];
            }
            if (column.dataType=='function'){
                td.innerHTML=column.propertyName(element);
            }
            tr.appendChild(td);
        });

        tr.onclick = function (){
            window['editOb'] = element;
            window['editRow'] = index;

            divModify.className = 'd-block';
        }


        tableBody.appendChild(tr);


    });

}



const fillDataIntoTable5 = (tableID, dataList, columnsList, editFunction ,buttonVisibility = true )=>{

    const tableBody = tableID.children[1];
    tableBody.innerHTML='';

    dataList.forEach((element,index)=>{

        const tr =document.createElement('tr');

        const tdIndex =document.createElement('td');
        tdIndex.innerText=parseInt(index)+1;
        tr.appendChild(tdIndex);


        columnsList.forEach(column =>{
            const td =document.createElement('td');

            if (column.dataType=='text'){
                td.innerText=element[column.propertyName];
            }
            if (column.dataType=='function'){
                td.innerHTML=column.propertyName(element);
            }
            tr.appendChild(td);
        });



        if (buttonVisibility){
            tr.onclick = function (){
                window['editOb'] = element;
                window['editRow'] = index;
                editFunction(element,index)
                divModify.className = 'd-block';
            }
        }


        tableBody.appendChild(tr);


    });

}









