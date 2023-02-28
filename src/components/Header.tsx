import { Divider, Flex, Heading, Link, Menu, MenuItem, View } from '@aws-amplify/ui-react';

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
              <img src='/github-mark.svg' width={32} height={32} alt='' />
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
