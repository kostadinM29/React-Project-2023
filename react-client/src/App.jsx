import { Route, Routes } from 'react-router-dom';

import { ROUTE_ENDPOINTS } from './constants/routeEndpoints';

import Layout from './components/layout/Layout';
import Test from './components/Test';
import Home from './components/pages/Home';
import RegistrationForm from './components/pages/forms/auth/RegistrationForm';
import LoginForm from './components/pages/forms/auth/LoginForm';
import Listings from './components/pages/listings/Listings';
import ListingsByUser from './components/pages/listings/ListingsByUser';
import SaveListingForm from './components/pages/forms/listing/SaveListingForm';
import Private from './components/guards/Private';

function App()
{
  return (
    <div className="bg-gray-200 dark:bg-gray-800 min-h-screen">
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="test" element={<Test />} />
          <Route path={ROUTE_ENDPOINTS.HOME} element={<Home />} />
          <Route path={ROUTE_ENDPOINTS.LISTINGS_ALL} element={<Listings />} />
          <Route path={ROUTE_ENDPOINTS.REGISTER} element={<RegistrationForm />} />
          <Route path={ROUTE_ENDPOINTS.LOGIN} element={<LoginForm />} />

          {/* Private Routes */}
          <Route path={`${ROUTE_ENDPOINTS.EDIT_LISTING}/:id`} element={<Private><SaveListingForm /></Private>} />
          <Route path={ROUTE_ENDPOINTS.CREATE_LISTING} element={<Private><SaveListingForm /></Private>} />
          <Route path={ROUTE_ENDPOINTS.USER_PROFILE} element={<Private><ListingsByUser /></Private>} />
        </Routes>
      </Layout>
    </div >
  );
};

export default App;
