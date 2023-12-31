import { Route, Routes } from 'react-router-dom';

import { ROUTE_ENDPOINTS } from './constants/routeEndpoints';

import Layout from './components/layout/Layout';
import RegistrationForm from './components/pages/forms/auth/RegistrationForm';
import LoginForm from './components/pages/forms/auth/LoginForm';
import Listings from './components/pages/listings/Listings';
import SaveListingForm from './components/pages/forms/listing/SaveListingForm';
import Private from './components/guards/Private';
import Details from './components/pages/listings/Details';
import Profile from './components/pages/profile/Profile';
import Chat from './components/pages/Chat/Chat';
import Home from './components/pages/home/Home';

function App()
{
  return (
    <div className='bg-gray-200 dark:bg-gray-800 min-h-screen'>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTE_ENDPOINTS.HOME} element={<Home />} />
          <Route path={ROUTE_ENDPOINTS.LISTINGS_ALL} element={<Listings />} />
          <Route path={ROUTE_ENDPOINTS.REGISTER} element={<RegistrationForm />} />
          <Route path={ROUTE_ENDPOINTS.LOGIN} element={<LoginForm />} />

          {/* Private Routes */}
          <Route path={`${ROUTE_ENDPOINTS.LISTING_DETAIL}/:id`} element={<Private Component={Details} />} />
          <Route path={`${ROUTE_ENDPOINTS.EDIT_LISTING}/:id`} element={<Private Component={SaveListingForm} />} />
          <Route path={`${ROUTE_ENDPOINTS.CHAT}/:listingId/:otherUser`} element={<Private Component={Chat} />} />
          <Route path={ROUTE_ENDPOINTS.CREATE_LISTING} element={<Private Component={SaveListingForm} />} />
          <Route path={ROUTE_ENDPOINTS.USER_PROFILE} element={<Private Component={Profile} />} />
        </Routes>
      </Layout>
    </div >
  );
};

export default App;
