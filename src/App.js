import Headers from "./components/Headers";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  const [showAddTask, setShowTask ] = useState(false)
  const [tasks, setTask] = useState([])

    useEffect(()  => {
      const getTasks = async () => {
        const tasksFromServer = await fetchTasks()
        setTask(tasksFromServer)
      }

      getTasks()
    },[])

    //fetch tasks
    const fetchTasks = async ( ) =>{
      const res = await fetch(`http://localhost:5000/tasks/`)
      const data = await res.json()

      return data
    }

    //fetch task to update
    const fetchTask = async ( id ) =>{
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()

      return data
    }

    //Add Task
    const addTask = async (task) => {
      const res = await fetch('http://localhost:5000/tasks', {
        method:'POST',
        headers:{
          'Content-type': 'application/json'
        },
        body : JSON.stringify(task)
      })

      const data = await res.json()
      setTask([...tasks, data])

      // const id = Math.floor(Math.random()*1000 ) +1

      // const newTask = { id, ...tasks}
      // setTask([...tasks, newTask])
    }

    //Delete Task
    const deleteTask = async (id) =>{
      await fetch (`http://localhost:5000/tasks/${id}`,{method:'DELETE'})

      setTask(tasks.filter((task) => task.id!==id))
    }

    //toggle remider
    const toggleReminder = async (id) => {
      const taskToToggle = await fetchTask(id)
      const updateTask ={...taskToToggle,
      reminder: !taskToToggle.reminder}

      const res = await fetch(`http://localhost:5000/tasks/${id}`,{
        method:'PUT',
        headers:{
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(updateTask)
      })

      const data = await res.json()

      setTask(tasks.map((task => task.id === id ? { ...task, reminder: !task.reminder }: task)))
    }


  return (
    <BrowserRouter>
      <div className="container">
        <Headers onAdd={() => setShowTask(!showAddTask)} showAdd = {showAddTask}/>
        
        <Routes>
          <Route path="/" exact element={
            <>
              {showAddTask && <AddTask onAdd={addTask}/>}
              {tasks.length>0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks here'}
            </>
          }/>
          <Route path='/about' element={<About />} />
        </Routes> 
        <Footer /> 
    </div>

      
             
    </BrowserRouter>
  )
}

export default App;
