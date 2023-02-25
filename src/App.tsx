import React from 'react';
import './App.css';

import { Authenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <Heading level={1}>Hello {user?.username}</Heading>
          <Button onClick={signOut}>Sign out</Button>
          <h2>Amplify Todos</h2>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
