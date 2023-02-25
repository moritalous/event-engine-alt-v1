import { useEffect, useState } from 'react';

import { Authenticator, Grid, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from 'aws-amplify';

import Header from './components/Header';
import CredentialCard from './components/CredentialCard';
import ManagementConsoleCard from './components/ManagementConsoleCard';


function App() {

  const [accessKeyId, setAccessKeyId] = useState('')
  const [secretAccessKey, setSecretAccessKey] = useState('')
  const [sessionToken, setSessionToken] = useState('')

  useEffect(() => {
    Auth.currentCredentials()
      .then((data) => {
        setAccessKeyId(data['accessKeyId'])
        setSecretAccessKey(data['secretAccessKey'])
        setSessionToken(data['sessionToken'])
      })
      .catch((error) => {
        console.error(error)
      });

  }, [])


  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <Header signOut={signOut} />

          <View
            margin='16px'
          >
            <Grid
              columnGap="1.0rem"
              rowGap="1.0rem"
              templateColumns={{ base: '1fr', large: '1fr 2fr' }}
              alignContent={'center'}
            >
              <View
                width='fit-content'
                margin='0 auto'
              >
                <CredentialCard
                  accessKeyId={accessKeyId}
                  secretAccessKey={secretAccessKey}
                  sessionToken={sessionToken}
                ></CredentialCard>
              </View>

              <View
                width='fit-content'
                margin='0 auto'
              >
                <ManagementConsoleCard
                  accessKeyId={accessKeyId}
                  secretAccessKey={secretAccessKey}
                  sessionToken={sessionToken}
                ></ManagementConsoleCard>
              </View>
            </Grid>
          </View>

        </div>
      )}
    </Authenticator>
  );
}

export default App;
