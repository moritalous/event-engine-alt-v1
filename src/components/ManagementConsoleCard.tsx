import { useEffect, useState } from 'react'

import { Button, Card, Flex, Heading, Link, View } from '@aws-amplify/ui-react'
import { API } from 'aws-amplify'

type props = {
  accessKeyId: string,
  secretAccessKey: string,
  sessionToken: string
}

function ManagementConsoleCard({ accessKeyId, secretAccessKey, sessionToken }: props) {

  const [signinUrl, setSigninUrl] = useState('')

  useEffect(() => {

    if (accessKeyId === '' || secretAccessKey === '' || sessionToken === '') {
      return
    }

    try {
      const JsonSessionString = {
        "sessionId": accessKeyId,
        "sessionKey": secretAccessKey,
        "sessionToken": sessionToken
      }
      const JsonSessionStringEncoded = encodeURIComponent(JSON.stringify(JsonSessionString))

      const path = '/federation?Action=getSigninToken' +
        '&SessionDuration=' + (60 * 60 * 12) +
        `&Session=${JsonSessionStringEncoded}`

      API.get('api70c8d7e0', path, {

      }).then((response) => {
        const signinToken = response['SigninToken']

        const url = 'https://ap-northeast-1.signin.aws.amazon.com/federation' +
          '?Action=login' +
          '&Destination=https%3A%2F%2Fconsole.aws.amazon.com%2F' +
          `&SigninToken=${signinToken}`

        setSigninUrl(url)

      }).catch(() => {
        setSigninUrl('')

      })

    } catch (error) {
      setSigninUrl('')
    }

  }, [accessKeyId, secretAccessKey, sessionToken])

  return (
    <Card variation='outlined'>
      <Flex alignItems='flex-start'>
        <Flex direction={'column'}>

          <Heading level={3}>Management Console</Heading>

          <Button
            onClick={(e) => window.open(signinUrl, '_target')}
            isDisabled={signinUrl === ''}
            width='fit-content'
            margin={'0 auto'}
          >
            Access to Management Console
          </Button>

        </Flex>
      </Flex>

      <View as='p'>
        <Link href='https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_enable-console-custom-url.html' isExternal>
          User Guide
        </Link>
      </View>
    </Card>
  )
}

export default ManagementConsoleCard;
