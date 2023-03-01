import { Divider, Flex, Heading, Link, Menu, MenuItem, View } from '@aws-amplify/ui-react';
import { ReactComponent as GitHubMark } from '../svg/github-mark.svg'


function Header({ signOut }: any) {

  return (
    <View>
      <Flex
        direction={'row'}
        alignItems={'center'}
        wrap={'wrap'}
        margin={'0 16px'}
      >
        <Heading level={1}>Event Engine Alternative</Heading>

        <View marginLeft={'auto'}>
          <Flex direction={'row'}>
            <Link href='https://github.com/moritalous/event-engine-alt-v1' isExternal>
              <GitHubMark width={32} height={32} viewBox='0 0 98 96' />
            </Link>
            <Menu>
              <MenuItem onClick={signOut}>Sign out</MenuItem>
            </Menu>
          </Flex>
        </View>

      </Flex>
      <Divider></Divider>
    </View>
  );
}

export default Header;
