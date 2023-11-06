import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Create from './components/Create'
import DisplayAll from './components/DisplayAll'
import DisplayOne from './components/DisplayOne'
import Update from './components/Update'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element= {<DisplayAll/> } />
        <Route path="/create" element={ <Create/> } />
        <Route path="/oneMovie/:id" element={ <DisplayOne/> } />
        <Route path="/update/:id" element={ <Update/> }/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
