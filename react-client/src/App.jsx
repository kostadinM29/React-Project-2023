import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Test from './components/Test';
import Home from './components/pages/Home';
import CreateListingForm from './components/pages/forms/listing/CreateListingForm';
import RegistrationForm from './components/pages/forms/auth/RegistrationForm';
import LoginForm from './components/pages/forms/auth/LoginForm';
import Listings from './components/pages/listings/Listings';
import ListingsByUser from './components/pages/listings/ListingsByUser';
import { ROUTE_ENDPOINTS } from './constants/routeEndpoints';

function App()
{
  return (
    <div className="bg-gray-200 dark:bg-gray-800 min-h-screen">
      <Layout />

      <Routes>
        <Route path="test" element={<Test />} />
        <Route path={ROUTE_ENDPOINTS.HOME} element={<Home />} />
        <Route path={ROUTE_ENDPOINTS.LISTINGS_ALL} element={<Listings />} />
        {/* public routes */}
        <Route path={ROUTE_ENDPOINTS.REGISTER} element={<RegistrationForm />} />
        <Route path={ROUTE_ENDPOINTS.LOGIN} element={<LoginForm />} />
        <Route path={ROUTE_ENDPOINTS.CREATE_LISTING} element={<CreateListingForm />} />
        <Route path={ROUTE_ENDPOINTS.USER_PROFILE} element={<ListingsByUser />} />
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
