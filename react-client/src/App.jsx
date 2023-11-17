import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Test from './components/Test';
import Home from './components/pages/Home';
import LoginForm from './components/pages/forms/LoginForm';
import RegistrationForm from './components/pages/forms/RegistrationForm';

function App()
{
  return (
    <div className="bg-gray-200 dark:bg-gray-800 min-h-screen">
      <Layout />

      <Routes>
        <Route path="test" element={<Test />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Layout />}> */}
        {/* public routes */}
        <Route path="register" element={<RegistrationForm />} />
        <Route path="login" element={<LoginForm />} />
        {/* <Route path="register" element={<Register />} />
        
        <Route path="unauthorized" element={<Unauthorized />} /> */}
        {/* <Route path="test" element={<Test />} /> */}

        {/* todo: add role specific routes */}

        {/* <Route path="*" element={<NotFound />} /> */}
        {/* </Route> */}
      </Routes>
    </div >
  );
};

export default App;
