import './App.css'
import { Routes, Route, Navigate, } from 'react-router-dom';
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Homes from './pages/Homes/Homes';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContex';

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className='h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/Login' element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path='/SignUp' element={authUser ? <Navigate to='/' /> : <SignUp />} />
        <Route path='/' element={authUser ? <Homes /> : <Navigate to="/Login" />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
