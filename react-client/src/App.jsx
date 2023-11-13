import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { UserProvider } from './components/UserContext';

function App()
{
  return (
    <UserProvider>
      <BrowserRouter >
        <Layout />
      </BrowserRouter >
    </UserProvider>
  );
};

export default App;
