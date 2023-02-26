
import { Grid, View } from '@aws-amplify/ui-react';

import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import CredentialCard from './CredentialCard';
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
            >
                <Grid
                    columnGap="1.0rem"
                    rowGap="1.0rem"
                    templateColumns={{ base: '1fr', small: '1fr 1fr', large: '1fr 1fr 1fr' }}
                    alignContent={'center'}
                >
                    <View
                    >
                        <CredentialCard
                            accessKeyId={accessKeyId}
                            secretAccessKey={secretAccessKey}
                            sessionToken={sessionToken}
                        ></CredentialCard>
                    </View>

                    <View
                    >
                        <ManagementConsoleCard
                            accessKeyId={accessKeyId}
                            secretAccessKey={secretAccessKey}
                            sessionToken={sessionToken}
                        ></ManagementConsoleCard>
                    </View>
                    <View
                    >
                        <InformationCard />
                    </View>
                </Grid>
            </View>

        </div>
    )
}

export default Home;
