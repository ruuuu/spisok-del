//https://getbootstrap.com/ классы беерм отсюда

//здесь егнеиер массив задач [{},{}, {}]
//фукнция принмает один парметр key (поэтому скобики не ставим)
//если данные получили, то мы дсотаем их, если не получили,то возвращаем массив
//JSON.parse распарсивает
const initDataTodo = key => 
    localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];

//обновляет даннеы в  localStorage:
//JSON.stringify превращает в JSON
const updateDataTodo = (key, todoData) => 
    localStorage.setItem(key, JSON.stringify(todoData));


const createToDo = (title, form, list ) => { //создаем li, передаем  парамтеры title, form, list

    const todoContainer = document.createElement('div');// создали элемент div
    const todoRow = document.createElement('div');
    const todoHeader = document.createElement('h1');
    const wrapperForm = document.createElement('div');
    const wrapperList = document.createElement('div');

    todoContainer.classList.add('container'); //<div class="container">  </div>
    todoRow.classList.add('row');
    todoHeader.classList.add('text-center', 'mb-5', 'block-header-logo');
    wrapperList.classList.add('col-6');
    wrapperForm.classList.add('col-6');

    todoHeader.textContent = title;


    wrapperForm.append(form);//form добавилии в wrapperForm
    wrapperList.append(list);
    todoRow.append(wrapperForm, wrapperList);//добавляем эементы wrapperForm, wrapperList в todoRow
    todoContainer.append(todoHeader, todoRow); // todoHeader  и form добавлям в родителя todoContainer  <div class="container"><h1> title</h1></div>

    return todoContainer; //djpdhoft 'tkvtyn
};



const createListTodo = () => {//создаем ul

    const listTodo = document.createElement('ul');
    listTodo.classList.add('list-group');

    return listTodo;//возыращаем ul
};

//                      li     ul
const createItemTodo = (item, listTodo) => { //создаем li, item = {id, nameTodo, descriptionTodo, success:false }
    const Itemtodo = document.createElement('li');
    const btnItem = document.createElement('button');

    //class 'list-item' добавили сами, чобы потом првоерять что содержит этот класс 
    Itemtodo.classList.add('list-group-item', 'p-0', 'mb-3', 'border-0'); 
    btnItem.classList.add('list-item', 'btn',   'btn-block', 'border-primary', 'rounded-pill', item.success ? 'btn-success' : 'btn-light'); 
    

    btnItem.textContent = item.nameTodo; //<button> text</button>
    btnItem.id = item.id; //добавили кнопкe атрибут id, то есть <button id=''> text</button>

    Itemtodo.append(btnItem);// добавляем в  li button

    listTodo.append(Itemtodo);//добавляем li в ul 
    
};


const createFormTodo = () => {  //создаем форму, фукнция  ничего не принимает ()

    const form  = document.createElement('form');
    const input = document.createElement('input');
    const textArea = document.createElement('textarea');
    const btnSubmit = document.createElement('button');


    input.setAttribute('placeholder', 'Введите текст');//добавили input у аттрибут palceholder
    //лтбо можно так input.placeholder = 'Введите текст'
    textArea.placeholder = 'Описание';

    btnSubmit.textContent = 'Добавить';
    btnSubmit.type = 'submit';

    form.classList.add('form-group');//эти классы берутся с бутстрапа
    input.classList.add('form-control', 'mb-3');  // можно и несколкьо классов сразу добавить элементу
    textArea.classList.add('form-control', 'mb-3');
    btnSubmit.classList.add('btn', 'btn-primary', 'btn-lg' , 'btn-block');

    form.append(input, textArea, btnSubmit); //все три элемента добавиили разом в form, именгно в таком порядке они вставляются 

    return { input, textArea, btnSubmit, form }; //возвращаем объект
};

//можно псиать так, если фукция принмиает 1 параметр, const addTodo = event => {}
//const addTodo = (event) => {  //event - объект события
    
    //event.preventDefault();//отмням дейсвите по умолчанию, т есть страница не будет перезагружаться, обычно вешают на ссылки 
    //console.log(event);


//};

//                   массив []     ul     input       textArea
const addtoDoitem = (key, todoData, listTodo, nameTodo, descriptionTodo) => { // добавляет li-задачу в ul  и заполняет массив задач
    const id = `todo${(+new Date()).toString(16)}`;
    todoData.push({id, nameTodo, descriptionTodo, success: false });//добавляе объект в массив todoData
    updateTodo(listTodo, todoData, key); //переlаем спсиок и массив заадч   [{id, nameTodo, descriptionTodo, success:false },{},{}]
    
    console.log(todoData);
};


const createModal = () => { //создание мод окна
    const modalElem = document.createElement('div');
    const modalDialog = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalHeader = document.createElement('div');
    const modalBody = document.createElement('div');
    const modalFooter = document.createElement('div');
    const itemTitle = document.createElement('h2');
    const itemDescription = document.createElement('p');
    const btnClose = document.createElement('button');
    const btnReady = document.createElement('button');
    const btnDelete = document.createElement('button');

    modalElem.classList.add('modal');
    modalDialog.classList.add('modal-dialog');
    modalContent.classList.add('modal-content');
    modalHeader.classList.add('modal-header');
    modalBody.classList.add('modal-body');
    modalFooter.classList.add('modal-footer');
    itemTitle.classList.add('modal-title');
    
    btnClose.classList.add('close', 'btn-modal');//класс .btn-modal для того чтобы найти кнопки в модалке и закрыть ее, не для стилизации
    btnReady.classList.add('btn', 'btn-success', 'btn-modal');
    btnDelete.classList.add('btn', 'btn-danger', 'btn-delete', 'btn-modal');// элементу модно сразу несколкьо классво добавлять

    btnClose.innerHTML = '&times;';//символ кретсика
    btnReady.textContent = 'Выполнено';
    btnDelete.textContent = 'Удалить';

    modalDialog.append(modalContent);
    modalContent.append(modalHeader, modalBody, modalFooter); //элементы modalHeader, modalBody, modalFooter  встлютмя поочереди
    modalHeader.append(itemTitle, btnClose);

    modalBody.append(itemDescription);
    modalFooter.append(btnReady, btnDelete);

    modalElem.append(modalDialog); //вставили modalDialog в modalElem

    

    const closeModal = event => { //фукнция принимает параметр event, если передаем один параметp скобки можно не указывать
        const target = event.target; //тот элемент на котрый кликнули
        //console.log(target);//
        
        //target.classList.contains('btn-modal') если у элемента есть класс btn-modal
        if (target.classList.contains('btn-modal') || target === modalElem) { //если нажали на кнпоку кретсик или на мод окноб то модалка азкрывается
            modalElem.classList.remove('d-block');
        } 
        //if(target === btnClose || target === modalElem){// если ажатый элемент  является кнопкой или модокном
            //modalElem.classList.remove('d-block');
        //}
        
    };

    btnClose.addEventListener('click', closeModal);//обработик кнпоки Удалить, после нажатия вызывется фкнция closeModal

    
    

    const showModal = (titleTodo, descriptionTodo, id) => { //фукнция принимает параметры
        modalElem.dataset.idItem = id; //добавили атрибут id-item элементу modalElem, <div class="modal d-block" data-id-item="todo1762420ad34">
        modalElem.classList.add('d-block'); //отображаем модалку
        itemTitle.textContent = titleTodo;
        itemDescription.textContent = descriptionTodo;     
    }

    modalElem.addEventListener('click', closeModal); //на modalElem вешаем событие клика, после надатия на моадлку, вызывается фукнция  closeModal


    return { modalElem, btnReady, btnDelete, showModal };// возврщаает объект элементов и функцию showModal
}


//                      ul      массив задач-[{id, nameTodo, descriptionTodo, success:false },{},{},]
const updateTodo = (listTodo,  todoData, key) => { //
    listTodo.textContent = ''; //очищает спсиок
    //item = {id, nameTodo, descriptionTodo }
    todoData.forEach(item => createItemTodo(item, listTodo)); //для каждого элемента item(задачу) массива вызываем фукнцию
    updateDataTodo(key, todoData);
}

//titletoDo
const initToDo = (selector, key = 'todo') => { //передаем селектор и key(испоьзуе для localStorage)

    const todoData = initDataTodo(key);//массив объектов(дел) {id, nameTodo, descriptionTodo}, его храим  в localStorage, заполянм его в фукнции addtoDoitem выше 

    const wrapper =  document.querySelector(selector);
    const FormTodo = createFormTodo(); //выщываем фукнию созданяи формы, возвращается объект { input, textArea, btnSubmit, form }
    const listTodo = createListTodo(); //вызвали функиую созданяи списка, получили ul
    const modal = createModal();//мод окно создали -object

    const todoApp = createToDo(key, FormTodo.form, listTodo);//вызов фукнции, создаем эелмент <div class="container">  </div>
    
    document.body.append(modal.modalElem);

    wrapper.append(todoApp);//добавили в элемент wrapper элемент todoApp 

    //при собяти submit выполянется все то что описано в  фукнции 
    FormTodo.form.addEventListener('submit', event => {

        event.preventDefault();//отмням дейсвите по умолчанию, т есть страница не будет перезагружаться, обычно вешают  preventDefault на ссылки 
        FormTodo.input.classList.remove('is-invalid');//удаляем класс котрый добавилии на предыддущйи итерации
        FormTodo.textArea.classList.remove('is-invalid');


        if(FormTodo.input.value && FormTodo.textArea.value){
            
            addtoDoitem(key, todoData, listTodo, FormTodo.input.value, FormTodo.textArea.value);//вызываем функцию
            FormTodo.form.reset();// очищает форму
        }
        else{
            if(!FormTodo.input.value){ //если не ввели в поле input
                FormTodo.input.classList.add('is-invalid');
            }
            if(!FormTodo.textArea.value){ //если не ввели в поле textArea
                FormTodo.textArea.classList.add('is-invalid');
            }
        }
    });


    listTodo.addEventListener('click', event => { //вешаем обработчик собтия клика на список listTodo, нажимая на любуюкнпоку из списка отображаем модалку
        const target = event.target;  //определяем на какой элемнет нажали(ккнопка из списка)
        //console.log(1);

        //проверяем что target === li:
        if (target.classList.contains('list-item')) { //если target содержит класс list-item, то етсь еси нажали на li
            const item = todoData.find(elem => elem.id === target.id); //find перебирает массив todoData объектов(дел)  elem = {id, nameTodo, descriptionTodo }, возвращает объект {id, nameTodo, descriptionTodo, success:false }
            console.log('item ', item);
            modal.showModal(item.nameTodo, item.descriptionTodo, item.id); 
        }
        
    });

    modal.btnReady.addEventListener('click', () => {//обрабтчик нажатия на кнпоку  Устанвоить в модалке, парамтер ebvent  не передаем
        //получаем объект-задачу {id, nameTodo, descriptionTodo, success:false}
        const itemTodo = todoData.find(elem => 
            elem.id === modal.modalElem.dataset.idItem );//find перебирает массив дел todoData объектов(дел)  elem = {id, nameTodo, descriptionTodo }, возвращает объект {id, nameTodo, descriptionTodo, success:false}
    
        itemTodo.success = !itemTodo.success;//противоположное значение
        updateTodo(listTodo, todoData, key);//вызов фукнции,перелаем список дел(ul) и массив дел todoData
    });

    modal.btnDelete.addEventListener('click', () => { //обрабтчик нажатия на кнпоку   Удалить в модалке
        //получаем объект-задачу {id, nameTodo, descriptionTodo, success:false}
        const index = todoData.findIndex(elem => elem.id === modal.modalElem.dataset.idItem);//find перебирает массив дел todoData объектов(дел)  elem = {id, nameTodo, descriptionTodo }, возвращает объект {id, nameTodo, descriptionTodo, success:false}
        todoData.splice(index, 1);
        updateTodo(listTodo, todoData, key);//обновляем списко,  вызов фукнции,перелаем список дел(ul) и массив дел todoData
    });
    
    updateTodo(listTodo, todoData, key);//это нжно чтобы когда перезагружаем станиуц, данеы не исчезали

};

initToDo('.app', 'Список дел');


