import { Card, Flex, Heading, ScrollView } from '@aws-amplify/ui-react';
import { CopyButton } from './CopyButton';

type props = {
  accessKeyId: string,
  secretAccessKey: string,
  sessionToken: string
}

function EnvvarsCard({ accessKeyId, secretAccessKey, sessionToken }: props) {

  const envvars = `export AWS_DEFAULT_REGION=ap-northeast-1
export AWS_ACCESS_KEY_ID=${accessKeyId}
export AWS_SECRET_ACCESS_KEY=${secretAccessKey}
export AWS_SESSION_TOKEN=${sessionToken}
`

  return (
    <Card variation='outlined'>
      <Flex alignItems='flex-start'>
        <Flex direction={'column'}>
          <Flex direction={'row'}>
            <Heading level={3}>AWS環境変数</Heading>
            <CopyButton copyText={envvars}></CopyButton>
          </Flex>

          <ScrollView
            style={{ wordBreak: 'break-all' }}
            height='100px'
            padding='4px'
            color='var(--amplify-colors-font-inverse)'
            backgroundColor='var(--amplify-colors-neutral-100)'
          >
            export AWS_DEFAULT_REGION=ap-northeast-1<br></br>
            export AWS_ACCESS_KEY_ID={accessKeyId}<br></br>
            export AWS_SECRET_ACCESS_KEY={secretAccessKey}<br></br>
            export AWS_SESSION_TOKEN={sessionToken}
          </ScrollView>
        </Flex>
      </Flex>
    </Card>
  )
}

export default EnvvarsCard;
