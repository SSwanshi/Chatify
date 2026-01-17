import Messenger from './components/Messenger';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './context/AccountProvider';
function App() {

  return (
    <div className="App">
      <GoogleOAuthProvider clientId= '939530381645-4j5an0ufqhlmph1g2a3ha133n7596n22.apps.googleusercontent.com'>
        <AccountProvider>
          <Messenger />
        </AccountProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
