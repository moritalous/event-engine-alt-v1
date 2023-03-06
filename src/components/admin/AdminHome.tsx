import { defaultDarkModeOverride } from '@aws-amplify/ui';
import { ThemeProvider, WithAuthenticatorProps } from '@aws-amplify/ui-react';
import AdminHeader from './AdminHeader';
import AdminUsageHistory from './AdminUsageHistory';


function AdminHome({ signOut, user }: WithAuthenticatorProps) {

  return (
    <>
      <ThemeProvider theme={{ name: 'darkTheme', overrides: [defaultDarkModeOverride] }} colorMode='dark'>
        <div style={{ backgroundColor: 'var(--amplify-colors-background-primary)', minHeight: '100vh' }}>
          <AdminHeader signOut={signOut} />
          <div style={{ padding: '32px' }}>
            <AdminUsageHistory />
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default AdminHome;
