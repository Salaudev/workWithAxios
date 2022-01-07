// const toDarkMode = () =>{
//     const body = document.querySelector('body');
//     body.classList.add("dark-mode");
// }


const getTodos = async() =>{
    try {
        const res = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10");

        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};



const edit  = async(item) =>{
    try {
        const res= await axios.put("https://jsonplaceholder.typicode.com/todos", { title: item });

        return res.data;
    } catch (error) {
        console.log(error, "!!!!");
    }
}

const row = document.querySelector("#list");

const buildToDoList = async () =>{
    const toDoData = await getTodos();
    console.log(toDoData);

    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-6 shadow";
    row.append(col);

    const addForm = document.createElement("form");
    addForm.className ="d-flex justify-content-between my-3";

    //to create addTaskBtn
    const addTaskBtn = document.createElement("button");
    addTaskBtn.className ="btn me-3";
    addTaskBtn.innerHTML = `<i class="fas fa-plus"></i>`;
    addForm.append(addTaskBtn);


    //to create addInput
    const addInput = document.createElement("input");
    addForm.append(addInput);
    addInput.className = "form-control";
    addInput.style.outline ="none";


    addInput.placeholder = "Add new Task"
    col.append(addForm);

    let dataId = toDoData.length;
    console.log(dataId);


    addTaskBtn.addEventListener("click",(e) =>{
        e.preventDefault();
        const newTask = addInput.value;
        console.log("neTask" , newTask);
        const obj = {
            userI :1,
            id : ++dataId,
            title : addInput.value,
        }


         try {
    const res = axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      obj
    );

    console.log(res);
    alert("qoshildi");
    // setPhotos();
  } catch (error) {
    console.log(error);
  }

    }); 

    const titleUncompletedTasks = document.createElement("p");
    titleUncompletedTasks.className = "text-danger text-start";
    titleUncompletedTasks.innerHTML = "Uncompleted Tasks";
    col.append(titleUncompletedTasks);
    


    const uncompletedTasks = document.createElement("ul");
    uncompletedTasks.className = "card p-2";
    col.append(uncompletedTasks);

    const titleCompletedTasks = document.createElement("p");
    titleCompletedTasks.className = "text-success text-start";
    titleCompletedTasks.innerHTML = "Completed Tasks";
    col.append(titleCompletedTasks);


    const completedTasks = document.createElement("ul");
    completedTasks.className = "card p-2";
    col.append(completedTasks);



    toDoData.map((item , i) =>{
        console.log(item);
        const id = item.id;

        const li = document.createElement("li");
        li.className ="d-flex justify-content-between mb-4 align-items-center";
       
        if(item.completed){
            completedTasks.append(li);
        }
        else{
            uncompletedTasks.append(li);
        }


        const completedBtn =document.createElement("button");
        completedBtn.type = "submit";
        completedBtn.className = "btn d-flex justifu-conten-center align-items-center rounded-circle"
        completedBtn.innerHTML = `<i class="fas fa-plus"></i>`;
        // completedBtn.style.width = "30px";
        // completedBtn.style.height = "30px";
        

        const inputForTitle = document.createElement("input");
        inputForTitle.type = "text";
        inputForTitle.setAttribute("readonly", "true");
        inputForTitle.value = item.title;
        inputForTitle.style.outline ="none";
        inputForTitle.style.border = "none";
        inputForTitle.style.borderBottom = "2px solid black";
        inputForTitle.className = "w-75";
        
        const actions = document.createElement("div");
        actions.className = "d-flex"

        const buttonForDelete = document.createElement("button");
        buttonForDelete.type = "submit";
        buttonForDelete.classList = "btn";
        buttonForDelete.innerHTML =`<i class="fas fa-trash"></i>`;

        const buttonForEdit = document.createElement("button");
        buttonForEdit.type = "submit";
        buttonForEdit.classList = " btn";
        buttonForEdit.style.marginInlineEnd = "10px";
        buttonForEdit.innerHTML =`<i class="fas fa-pencil-alt"></i>`;

        actions.append(buttonForEdit , buttonForDelete)

        li.append(completedBtn , inputForTitle , actions ,);

        completedBtn.addEventListener("mouseover", () =>{
            completedBtn.style.color = "blue";
        });
        completedBtn.addEventListener(("mouseleave"), () =>{
            completedBtn.style.color = "black";
           
        });

        buttonForDelete.addEventListener("mouseover", () =>{
            buttonForDelete.style.color = "crimson";
        });
        buttonForDelete.addEventListener(("mouseleave"), () =>{
            buttonForDelete.style.color = "black";
           
        });

          buttonForEdit.addEventListener("mouseover", () =>{
            buttonForEdit.style.color = "#FFA600";
        });
        buttonForEdit.addEventListener(("mouseleave"), () =>{
            buttonForEdit.style.color = "black";
        });


        buttonForEdit.addEventListener('click' , () =>{
            console.log(item);
            if(buttonForEdit.innerHTML == `<i class="fas fa-pencil-alt"></i>`)
            {
                console.log("Success");
                buttonForEdit.innerHTML = `<i class="fas fa-check text-success"></i>`
                inputForTitle.removeAttribute("readonly");
                inputForTitle.focus();
                inputForTitle.style.color = "violet";

            }
            else{
                console.log("////");
                buttonForEdit.innerHTML = `<i class="fas fa-pencil-alt"></i>`
                inputForTitle.setAttribute("readonly" ,true);
                inputForTitle.style.color = "black";
                const response = axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, { title: inputForTitle.value });

                try {
                    response.data;
                    console.log(item);
                } catch (error) {
                    console.log(error , "!!!");
                }
                
            }
           
        });

        buttonForDelete.addEventListener('click' , async(e) =>{
            e.preventDefault();

           try {
                await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`,);
                // res.data;
                console.log("Success");


           } catch (error) {
                console.log(error);
           }


        });

        completedBtn.addEventListener('click', async () =>{
             try {
                    const obj = {
                        id : id,
                        title : inputForTitle.value,
                        completed : !item.completed,
                    }

                    const response =  axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, obj).then(() =>{
                    alert("Success");

                    }).catch(
                        alert("failure"))
             } catch (error) {
                console.log(error);   
             }

        
    })

    });



}

buildToDoList();