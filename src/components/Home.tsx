
import { AmplifyUser } from '@aws-amplify/ui';
import { Flex, Grid, View } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { AwsRum, AwsRumConfig } from 'aws-rum-web/dist/es/src';
import { useEffect, useState } from 'react';
import CredentialCard from './CredentialCard';
import EnvvarsCard from './EnvvarsCard';
import Header from './Header';
import InformationCard from './InformationCard';
import ManagementConsoleCard from './ManagementConsoleCard';

const config: AwsRumConfig = {
  sessionSampleRate: 1,
  endpoint: "https://dataplane.rum.ap-northeast-1.amazonaws.com",
  telemetries: ["errors", "http", "performance"],
  allowCookies: true,
  enableXRay: false,
};

const APPLICATION_ID: string = '5d9fd061-6610-4983-8846-9a5776abcb7d';
const APPLICATION_VERSION: string = '1.0.0';
const APPLICATION_REGION: string = 'ap-northeast-1';

function Home({ signOut, user }: { signOut: any, user: AmplifyUser | any }) {

  const [accessKeyId, setAccessKeyId] = useState('')
  const [secretAccessKey, setSecretAccessKey] = useState('')
  const [sessionToken, setSessionToken] = useState('')

  useEffect(() => {
    Auth.currentCredentials()
      .then((data) => {
        setAccessKeyId(data['accessKeyId'])
        setSecretAccessKey(data['secretAccessKey'])
        setSessionToken(data['sessionToken'])

        const email = (user as AmplifyUser).attributes?.email || ''

        const awsRum: AwsRum = new AwsRum(
          APPLICATION_ID,
          APPLICATION_VERSION,
          APPLICATION_REGION,
          config,
        );
        awsRum.setAwsCredentials(data)
        awsRum.addSessionAttributes({ 'email': email })
        awsRum.enable()

        awsRum.recordEvent('PageLoad', { email: email })
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
