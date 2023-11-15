import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Test from './components/Test';
import LoginForm from './components/pages/forms/LoginForm';
import Home from './components/pages/Home';

function App()
{
  return (
    <>
      <Layout />

      <Routes>
        <Route path="test" element={<Test />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Layout />}> */}
        {/* public routes */}
        <Route path="login" element={<LoginForm />} />
        {/* <Route path="register" element={<Register />} />
        
        <Route path="unauthorized" element={<Unauthorized />} /> */}
        {/* <Route path="test" element={<Test />} /> */}

        {/* todo: add role specific routes */}

        {/* <Route path="*" element={<NotFound />} /> */}
        {/* </Route> */}
      </Routes>
    </>
  );
};

export default App;
