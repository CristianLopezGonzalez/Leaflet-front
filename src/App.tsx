import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Map from './pages/Map'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<div>Home</div>} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
