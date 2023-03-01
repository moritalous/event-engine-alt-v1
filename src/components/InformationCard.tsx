import { Card, Divider, Flex, Heading, Link } from '@aws-amplify/ui-react';

function InformationCard() {

  return (
    <Card variation='outlined'>
      <Flex alignItems='flex-start'>
        <Flex direction={'column'}>
          <Heading level={3}>おすすめハンズオン</Heading>
          <Divider></Divider>
          <ul>
            <li><Link href='https://aws.amazon.com/jp/events/aws-event-resource/hands-on/' isExternal>AWS Hands-on for Beginners</Link></li>
            <li><Link href='https://aws-samples.github.io/jp-contents-hub/' isExternal>JP Contents Hub</Link></li>
            <li><Link href='https://workshops.aws/' isExternal>AWS Workshops</Link></li>
          </ul>
        </Flex>
      </Flex>

    </Card>
  )
}

export default InformationCard;
