import Auth0ProviderContext from './providers/auth-provider';
import ThemeProviderContext from './providers/theme-provider';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Auth0ProviderContext>
          <ThemeProviderContext>
            <AppRoutes />
          </ThemeProviderContext>
        </Auth0ProviderContext>
      </Router>
    </Provider>
  );
}

export default App;
