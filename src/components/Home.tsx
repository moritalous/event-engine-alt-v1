
import { Flex, Grid, View } from '@aws-amplify/ui-react';

import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import CredentialCard from './CredentialCard';
import EnvvarsCard from './EnvvarsCard';
import Header from './Header';
import InformationCard from './InformationCard';
import ManagementConsoleCard from './ManagementConsoleCard';


function Home({ signOut, user }: { signOut: any, user: any }) {

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
    <div>
      <Header signOut={signOut} />

      <View
        margin='16px'
        width='fit-contents'
      >
        <View
          margin='0 auto'
          maxWidth='1280px'
        >

          <Grid
            columnGap="1.0rem"
            rowGap="1.0rem"
            templateColumns={{ small: '1fr', medium: '1fr 1fr', large: '1fr 2fr' }}
            alignContent={'center'}
          >
            <Flex
              direction="column"
            >
              <ManagementConsoleCard
                accessKeyId={accessKeyId}
                secretAccessKey={secretAccessKey}
                sessionToken={sessionToken}
              ></ManagementConsoleCard>
              <CredentialCard
                accessKeyId={accessKeyId}
                secretAccessKey={secretAccessKey}
                sessionToken={sessionToken}
              ></CredentialCard>
            </Flex>
            <Flex
              direction="column"
            >
              <EnvvarsCard
                accessKeyId={accessKeyId}
                secretAccessKey={secretAccessKey}
                sessionToken={sessionToken}
              ></EnvvarsCard>
              <InformationCard />

            </Flex>
          </Grid>
        </View>

      </View>

    </div>
  )
}

export default Home;
