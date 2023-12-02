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
import Details from './components/pages/listings/Details';
import Chat from './components/pages/Chat';

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
          <Route path={`${ROUTE_ENDPOINTS.LISTING_DETAIL}/:id`} element={<Private Component={Details} />} />
          <Route path={`${ROUTE_ENDPOINTS.EDIT_LISTING}/:id`} element={<Private Component={SaveListingForm} />} />
          <Route path={`${ROUTE_ENDPOINTS.CHAT}/:id`} element={<Private Component={Chat} />} />
          <Route path={ROUTE_ENDPOINTS.CREATE_LISTING} element={<Private Component={SaveListingForm} />} />
          <Route path={ROUTE_ENDPOINTS.USER_PROFILE} element={<Private Component={ListingsByUser} />} />
        </Routes>
      </Layout>
    </div >
  );
};

export default App;
