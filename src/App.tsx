import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddFormItem} from "./components/AddFormItem";

export type FilterValuesType = "all" | "active" | "completed";

type toDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type listStateType = {
    [todolistId: string]: Array<TaskType>
}

function App() {
    //BLL
    const toDoListID1 = v1()
    const toDoListID2 = v1()
    const newTodoID = v1()

    const [toDoLists, setToDoLists] = useState<Array<toDoListType>>(
        [
            {id: toDoListID1, title: 'What to learn', filter: 'all'},
            {id: toDoListID2, title: 'What to do', filter: 'all'}
        ]
    )

    const [tasks, setTasks] = useState<listStateType>({
            [toDoListID1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: false},
                {id: v1(), title: "TS", isDone: true}
            ],
            [toDoListID2]: [
                {id: v1(), title: "Water", isDone: true},
                {id: v1(), title: "Paper", isDone: false},
                {id: v1(), title: "Bread", isDone: true}
            ]
        }
    )

    const addTask = (newTitle: string, toDoListID: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        const currentTasks = tasks[toDoListID]
        const addedTasks = [newTask, ...currentTasks]
        setTasks({...tasks, [toDoListID]: addedTasks})
    }

    function removeTask(id: string, toDoListID: string) {
        const currentTasks = tasks[toDoListID]
        tasks[toDoListID] = currentTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    const isDone = (id: string, isDone: boolean, toDoListID: string) => {
        const currentTasks = tasks[toDoListID]
        tasks[toDoListID] = currentTasks.map(el => el.id === id ? {...el, isDone: isDone} : el)
        setTasks({...tasks})
    }

    const removeToDoList = (toDoListID: string) => {
        setToDoLists(toDoLists.filter(tl => tl.id !== toDoListID))
        delete tasks[toDoListID]
    }

    function changeFilter(filter: FilterValuesType, toDoListID: string) {
        setToDoLists(toDoLists.map(tl => tl.id === toDoListID ? {...tl, filter: filter} : tl))
    }

    const TasksFilter = (todolists: toDoListType) => {
        let currentList = tasks[todolists.id]
        if (todolists.filter === "active") {
            currentList = tasks[todolists.id].filter(t => !t.isDone);
        }
        if (todolists.filter === "completed") {
            currentList = tasks[todolists.id].filter(t => t.isDone);
        }
        return currentList
    }

    const toDoListHandler = (title: string) => {
        const newtoDoList: toDoListType = {id: newTodoID, title: title, filter: 'all'}
        setToDoLists([newtoDoList,...toDoLists])
        setTasks({...tasks, [newTodoID] : []})
    }

    const editTodoListTitle = (todolistID:string,newTitle:string) => {
        setToDoLists(toDoLists.map(el => el.id === todolistID ? {...el, title:newTitle} : el))
        console.log(newTitle)
    }

    // GUI
    const TodoListComponents = toDoLists.length ?
        toDoLists.map(tl => {
                const toDoListFiltered = TasksFilter(tl)
                return (
                    <Todolist
                        key={tl.id}
                        title={tl.title}
                        tasks={toDoListFiltered}
                        filter={tl.filter}
                        toDoListID={tl.id}

                        removeToDoList={removeToDoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        isDone={isDone}
                        editTodoListTitle={editTodoListTitle}
                    />
                )
            }
        ) : <span>Create your first todolist</span>


    return (
        <div className="App">
            <AddFormItem callback={toDoListHandler}/>
            {TodoListComponents}
        </div>
    );
}

export default App;
