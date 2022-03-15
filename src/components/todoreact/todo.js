import {useState,React, useEffect} from 'react';
import "./style.css";

// const getLocalData = () =>{
//     const lists = localStorage.getItem("mytodolist");
//     if(lists){
//         return lists;
//     }
// }

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    const addItem = () => {
        // if(inputData === ''){
        //     console.log("Input data is ''");
        // }
        // else{
        //     console.log("input data is ",inputData);
        // // }
        // if(!inputData){
        //     console.log("input data does not exist.");
        // }
        // else{
        //     console.log("input data exists");
        // }
        //both this and above logic are flawed, coz when inputdata is space spce space eg "   "
            //it says that input data exists, while it should have said i/p data DNE
        var x = true;
        var i;
        for(i=0; i<inputData.length; i++){
            if(inputData[i] != ' '){
                // console.log("input data exists");
                x = false;
                if(toggleButton){
                    setItems(
                        items.map((curElem) => {
                            if(curElem.id === isEditItem){
                                return {...curElem,name:inputData};
                            }
                            return curElem;
                        } )
                    )

                    setIsEditItem("");
                    setInputData("");
                    setToggleButton(false);
                }
                else{
                    const myNewInputData = {
                        id : new Date().getTime().toString(),
                        name: inputData,
                    };
                    setItems([...items,myNewInputData]);
                    setInputData("");
                }
                break;
            }
        }
        if(x){
            alert("Please enter the name of item.")
            // console.log("input data does not exist");
        }
        
    }

    const deleteItem = (index) => {
        const updatedList = items.filter((curElem) => {
            return curElem.id !== index;
        })
        setItems(updatedList);
    }

    //adding local storage
    useEffect(() => {
        localStorage.setItem("mytodolist",JSON.stringify(items));//need to pass string into it
    }, [items]);

    const editItem = (index) => {
        const item_todo_edited = items.find((curElem)=>{
            return curElem.id === index;
        })

        setIsEditItem(index);
        setInputData(item_todo_edited.name);
        setToggleButton(true);
    };

  return (
    <>
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src="./todo.svg" alt="2021 to diary image" />
                    <figcaption>Add Your List Here 👇</figcaption>
                </figure>
                
                    <div className='addItems'>
                        <input type="text"
                         placeholder='✍ Add Item' 
                         className='form-control'
                         value = {inputData}
                         onChange = {(event) =>
                             setInputData(event.target.value)}
                         />
                         {/* we can write expressions only in jsx and not programming constructs */}
                         {/* if(toggleButton){
                            <i className="far fa-edit add-btn"></i>
                         }
                         else{
                            <i className="fa fa-plus add-btn" onClick = {addItem}></i> */}
                         {/* } */}
                         {toggleButton ?  <i className="far fa-edit add-btn" onClick = {addItem}></i>:
                         <i className="fa fa-plus add-btn" onClick = {addItem}></i>}
                    </div>

                <div className='showItems'>
                    {items.map((curElem, index) => {
                        {/* console.log(index); */}
                        return (
                            <div className='eachItem' key = {curElem.id}>
                                <h3>{curElem.name}</h3>
                                <div className='todo-btn'>
                                <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                                <i className="far fa-trash-alt add-btn" onClick={() => {deleteItem(curElem.id)}}></i>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text='Remove All' onClick={() => {setItems([])}}>
                        <span>CHECK LIST</span>
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo

