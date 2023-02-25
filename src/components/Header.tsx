import { Divider, Flex, Heading, Menu, MenuItem, View } from '@aws-amplify/ui-react';

function Header({ signOut }: any) {

  return (
    <View>
      <Flex
        direction={'row'}
        alignItems={'center'}
        wrap={'wrap'}
        margin={'0 16px'}
      >
        <Heading level={1}>Event Engine Alt</Heading>

        <View marginLeft={'auto'}>
          <Menu>
            <MenuItem onClick={signOut}>Sign out</MenuItem>
          </Menu>
        </View>

      </Flex>
      <Divider></Divider>
    </View>
  );
}

export default Header;
