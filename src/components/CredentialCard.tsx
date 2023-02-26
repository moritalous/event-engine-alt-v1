
import { Button, Card, Flex, Heading, Link, TextField, View } from '@aws-amplify/ui-react'

type props = {
  accessKeyId: string,
  secretAccessKey: string,
  sessionToken: string
}

async function clipboardWrite(text: string) {
  try {
    // @ts-ignore
    const permission = await navigator.permissions.query({ name: 'clipboard-write' });
    if (permission.state === 'denied') {
      throw new Error('Not allowed to write clipboard.');
    }
    navigator.clipboard.writeText(text)
  } catch (error) {

  }
}

function CredentialCard({ accessKeyId, secretAccessKey, sessionToken }: props) {

  function copy(text: string) {
    clipboardWrite(text)
  }

  return (
    <Card variation='outlined'>
      <Flex alignItems='flex-start'>
        <Flex direction={'column'}>
          <Heading level={3}>AWS Credentials</Heading>
          <TextField
            label='Access Key Id'
            value={accessKeyId}
            outerEndComponent=<Button onClick={e => copy(accessKeyId)}>copy</Button>
          />
          <TextField
            label='Secret Access Key'
            value={secretAccessKey}
            outerEndComponent=<Button onClick={e => copy(secretAccessKey)}>copy</Button>
          />
          <TextField
            label='Session Token'
            value={sessionToken}
            outerEndComponent=<Button onClick={e => copy(sessionToken)}>copy</Button>
          />
        </Flex>
      </Flex>

      <View as='p'>
        <Link href='https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html' isExternal>
          User Guide
        </Link>
      </View>

    </Card>
  )
}

export default CredentialCard;
