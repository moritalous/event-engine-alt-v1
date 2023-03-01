import { Card, Divider, Flex, Heading, Link, TextField, View } from '@aws-amplify/ui-react';
import { CopyButton } from './CopyButton';

type props = {
  accessKeyId: string,
  secretAccessKey: string,
  sessionToken: string
}

function CredentialCard({ accessKeyId, secretAccessKey, sessionToken }: props) {

  return (
    <Card variation='outlined'>
      <Heading level={3}>AWS Credentials</Heading>
      <Divider></Divider>
      <Flex direction={'column'} margin='auto'>
        <TextField
          label='Access Key Id'
          value={accessKeyId}
          outerEndComponent=<div style={{ width: '72px' }}><CopyButton copyText={accessKeyId}></CopyButton></div>
        />
        <TextField
          label='Secret Access Key'
          value={secretAccessKey}
          outerEndComponent=<div style={{ width: '72px' }}><CopyButton copyText={secretAccessKey}></CopyButton></div>
        />
        <TextField
          label='Session Token'
          value={sessionToken}
          outerEndComponent=<div style={{ width: '72px' }}><CopyButton copyText={sessionToken}></CopyButton></div>
        />
      </Flex>
      <View as='p'>
        <Link href='https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-files.html' isExternal>
          User Guide
        </Link>
      </View>

    </Card>
  )
}

export default CredentialCard;
