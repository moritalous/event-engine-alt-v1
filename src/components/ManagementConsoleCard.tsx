import { useEffect, useState } from 'react'

import { Button, Card, Flex, Heading, Link, TextAreaField, View } from '@aws-amplify/ui-react'

type props = {
  accessKeyId: string,
  secretAccessKey: string,
  sessionToken: string
}

function ManagementConsoleCard({ accessKeyId, secretAccessKey, sessionToken }: props) {

  const [signinTokenUrl, setSigninTokenUrl] = useState('')
  const [signinTokenResult, setSigninTokenResult] = useState('')
  const [signinUrl, setSigninUrl] = useState('')

  useEffect(() => {
    try {
      const JsonSessionString = {
        "sessionId": accessKeyId,
        "sessionKey": secretAccessKey,
        "sessionToken": sessionToken
      }
      const JsonSessionStringEncoded = encodeURIComponent(JSON.stringify(JsonSessionString))

      const url = 'https://ap-northeast-1.signin.aws.amazon.com/federation' +
        '?Action=getSigninToken' +
        '&SessionDuration=' + (60 * 60 * 12) +
        `&Session=${JsonSessionStringEncoded}`

      setSigninTokenUrl(url)

    } catch (error) {
      setSigninTokenUrl('')
    }

  }, [accessKeyId, secretAccessKey, sessionToken])

  useEffect(() => {

    try {
      const signinToken = JSON.parse(signinTokenResult)['SigninToken']

      const url = 'https://ap-northeast-1.signin.aws.amazon.com/federation' +
        '?Action=login' +
        '&Destination=https%3A%2F%2Fconsole.aws.amazon.com%2F' +
        `&SigninToken=${signinToken}`

      setSigninUrl(url)
    } catch (error) {
      setSigninUrl('')
    }

  }, [signinTokenResult])


  return (
    <Card variation='outlined'>
      <Flex alignItems='flex-start'>
        <Flex direction={'column'}>

          <Heading level={3}>Management Console</Heading>

          <ol>
            <li>
              <Link href={signinTokenUrl} isExternal={true} textDecoration={'underline'}>
                Access the endpoint and retrieves the JSON document with a SigninToken value.
              </Link>
            </li>
            <li>
              Paste  the JSON document with a SigninToken value.
            </li>
          </ol>

          <TextAreaField
            label='Signin Token'
            rows={5}
            placeholder='{"SigninToken":"..."}'
            value={signinTokenResult}
            onChange={e => setSigninTokenResult(e.target.value)
            }></TextAreaField>

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
