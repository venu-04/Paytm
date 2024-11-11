import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import Signin from './pages/Signin.jsx';
// import home from './pages/Home.jsx';
import {Dashboard} from './pages/Dashboard';
import {SendMoney} from './pages/SendMoney.jsx';
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home.jsx';

function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}></Route>
        <Route path="/send" element={<SendMoney />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
