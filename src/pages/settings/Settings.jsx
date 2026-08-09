import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Link, useLocation } from 'react-router-dom'
import Account from './Account'
import Security from './Security'
import Appbar from '~/components/AppBar'
const TABS = {
  SECURITY_TAB: 'security',
  ACCOUNT_TAB: 'account'
}
export default function Settings() {
  const location = useLocation()
  // lay ra url hien tai
  const getDefaultURL = () => {
    if (location.pathname.includes(TABS.ACCOUNT_TAB)) return TABS.ACCOUNT_TAB
    return TABS.SECURITY_TAB
  }
  const [activeTab, setActiveTab] = React.useState(getDefaultURL)

  const handleChange = (event, selectTab) => {
    setActiveTab(selectTab)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Appbar/>
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="ACCOUNT" value={TABS.ACCOUNT_TAB} component ={Link} to ='/settings/account' />
            <Tab label="SECURITY" value={TABS.SECURITY_TAB} component ={Link} to ='/settings/security'/>
          </TabList>
        </Box>
        <TabPanel value={TABS.ACCOUNT_TAB}> <Account/> </TabPanel>
        <TabPanel value={TABS.SECURITY_TAB}> <Security/> </TabPanel>
      </TabContext>
    </Box>
  )
}
