import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Test from './components/Test';
import Home from './components/pages/Home';
import CreateListingForm from './components/pages/forms/listing/CreateListingForm';
import RegistrationForm from './components/pages/forms/auth/RegistrationForm';
import LoginForm from './components/pages/forms/auth/LoginForm';
import Listings from './components/pages/listings/Listings';

function App()
{
  return (
    <div className="bg-gray-200 dark:bg-gray-800 min-h-screen">
      <Layout />

      <Routes>
        <Route path="test" element={<Test />} />
        <Route path="/" element={<Home />} />
        <Route path="listings" element={<Listings />} />
        {/* public routes */}
        <Route path="register" element={<RegistrationForm />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="listing/create" element={<CreateListingForm />} />

        {/* <Route path="" element={<Register />} /> */}

        {/* <Route path="unauthorized" element={<Unauthorized />} /> */}
        {/* <Route path="test" element={<Test />} /> */}

        {/* todo: add role specific routes */}

        {/* <Route path="*" element={<NotFound />} /> */}
        {/* </Route> */}
      </Routes>
    </div >
  );
};

export default App;
