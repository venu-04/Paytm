import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import Signin from './pages/Signin.jsx';
import {Dashboard} from './pages/Dashboard';
import {SendMoney} from './pages/SendMoney.jsx';
import ProtectedRoute from './components/ProtectedRoute'

function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
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
