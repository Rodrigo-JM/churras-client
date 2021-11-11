import Auth0ProviderContext from './providers/auth-provider';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes';

function App() {
  return (
    <Router>
      <Auth0ProviderContext>
        <AppRoutes />
      </Auth0ProviderContext>
    </Router>
  );
}

export default App;
