import { Card, Divider, Flex, Heading, Link, ScrollView, TabItem, Tabs, View } from '@aws-amplify/ui-react';
import { CopyButton } from './CopyButton';

type props = {
  accessKeyId: string,
  secretAccessKey: string,
  sessionToken: string
}

function EnvvarsCard({ accessKeyId, secretAccessKey, sessionToken }: props) {

  const envvarsLinux = `export AWS_DEFAULT_REGION=ap-northeast-1
export AWS_ACCESS_KEY_ID=${accessKeyId}
export AWS_SECRET_ACCESS_KEY=${secretAccessKey}
export AWS_SESSION_TOKEN=${sessionToken}
`

  const envvarsPowerShell = `$Env:AWS_DEFAULT_REGION="ap-northeast-1"
$Env:AWS_ACCESS_KEY_ID="${accessKeyId}"
$Env:AWS_SECRET_ACCESS_KEY="${secretAccessKey}"
$Env:AWS_SESSION_TOKEN="${sessionToken}"
`

  return (
    <Card variation='outlined'>
      <Flex alignItems='flex-start'>
        <Flex direction={'column'}>
          <Heading level={3}>AWS環境変数</Heading>
          <Divider></Divider>
          <View as='P'>有効期限は1時間です。このページをリロードすると再生成されます。</View>
          <Tabs>
            <TabItem title='Linux/Mac'>
              <ScrollView
                style={{ wordBreak: 'break-all' }}
                height='100px'
                marginTop='8px'
                padding='4px'
                color='var(--amplify-colors-font-inverse)'
                backgroundColor='var(--amplify-colors-neutral-100)'
              >
                export AWS_DEFAULT_REGION=ap-northeast-1<br></br>
                export AWS_ACCESS_KEY_ID={accessKeyId}<br></br>
                export AWS_SECRET_ACCESS_KEY={secretAccessKey}<br></br>
                export AWS_SESSION_TOKEN={sessionToken}
              </ScrollView>
              <div style={{ marginTop: '4px', marginLeft: 'auto', width: 'fit-content' }}>
                <CopyButton copyText={envvarsLinux} />
              </div>
            </TabItem>
            <TabItem title='Windows PowerShell'>
              <ScrollView
                style={{ wordBreak: 'break-all' }}
                height='100px'
                marginTop='8px'
                padding='4px'
                color='var(--amplify-colors-font-inverse)'
                backgroundColor='var(--amplify-colors-neutral-100)'
              >
                $Env:AWS_DEFAULT_REGION=ap-northeast-1<br></br>
                $Env:AWS_ACCESS_KEY_ID={accessKeyId}<br></br>
                $Env:AWS_SECRET_ACCESS_KEY={secretAccessKey}<br></br>
                $Env:AWS_SESSION_TOKEN={sessionToken}
              </ScrollView>
              <div style={{ marginTop: '4px', marginLeft: 'auto', width: 'fit-content' }}>
                <CopyButton copyText={envvarsPowerShell} />
              </div>
            </TabItem>
          </Tabs>
        </Flex>
      </Flex>

      <View as='p'>
        <Link href='https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-envvars.html' isExternal>
          User Guide
        </Link>
      </View>

    </Card>
  )
}

export default EnvvarsCard;
