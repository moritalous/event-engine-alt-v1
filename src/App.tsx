import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Home from './components/Home';
import AdminHome from './components/admin/AdminHome'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authenticator>
      {({ signOut, user }) => (
        <Home
          signOut={signOut}
          user={user}
        />
      )}
    </Authenticator>,
  },
  {
    path: "/admin",
    element: <Authenticator>
      {({ signOut, user }) => (
        <AdminHome
          signOut={signOut}
          user={user}
        />
      )}
    </Authenticator>,
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
