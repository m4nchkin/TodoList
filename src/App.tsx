import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

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
        setTasks({...tasks, [toDoListID]:addedTasks})
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

    // let tasksForTodolist = tasks;
    //
    // if (filter === "active") {
    //     tasksForTodolist = tasks.filter(t => !t.isDone);
    // }
    // if (filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone);
    // }
    const TasksFilter = (todolists:toDoListType) => {
        let currentList = tasks[todolists.id]
        if (todolists.filter === "active") {
            currentList = tasks[todolists.id].filter(t => !t.isDone);
        }
        if (todolists.filter === "completed") {
            currentList = tasks[todolists.id].filter(t => t.isDone);
        }
        return currentList
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
                        toDoList={tl.id}

                        removeToDoList={removeToDoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        isDone={isDone}
                        />
            )
        }
    ) : <span>Create your first todolist</span>


    return (
        <div className="App">
            {TodoListComponents}
        </div>
    );
}

export default App;
