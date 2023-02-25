
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Home from './components/Home';

function App() {

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Home
          signOut={signOut}
          user={user}
        />
      )}
    </Authenticator>
  );
}

export default App;
