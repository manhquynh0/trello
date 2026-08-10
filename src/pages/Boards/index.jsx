import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import QueueIcon from '@mui/icons-material/Queue'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Divider from '@mui/material/Divider'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupIcon from '@mui/icons-material/Group'
import SettingsIcon from '@mui/icons-material/Settings'
import DeleteIcon from '@mui/icons-material/Delete'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import BoardsTab from '~/components/BoardTab/Boards'
import TabPanel from '@mui/lab/TabPanel'
import { Link } from 'react-router-dom'
import Appbar from '~/components/AppBar'
import CreatedBoard from './created'
import Modal from '@mui/material/Modal'
const TABS = {
  BOARDS_TAB: 'boards',
  MEMBER_TAB: 'members',
  SETTINGS_TAB: 'settings',
  TEMPLATE_TAB: 'templates',
  TRASH_TAB: 'trash'
}

const Boards = () => {
  const [activeTab, setActiveTab] = React.useState(TABS.BOARDS_TAB)
  const [openCreateBoard, setOpenCreateBoard] = React.useState(false)
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }


  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <Appbar />
      <TabContext value={activeTab}>
        <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
          {/* SIDEBAR */}
          <Box
            sx={{
              width: 250,
              padding: 3,
              borderRight: '1px solid',
              borderColor: 'divider',
              overflowY: 'auto',
              backgroundColor: 'background.paper'
            }}
          >
            {/* New Board Button */}
            <Button
              fullWidth
              onClick={() => setOpenCreateBoard(true)}
              startIcon={<QueueIcon />}
              variant="contained"
              sx={{
                backgroundColor: 'primary.main',
                marginBottom: 3,
                textTransform: 'none',
                fontSize: '1rem',
                padding: '10px'
              }}
            >
              New Board
            </Button>

            {/* Menu Items as Tabs */}

            <TabList
              orientation="vertical"
              onChange={handleTabChange}
              sx={{
                borderRight: 1,
                borderColor: 'divider',
                '& .MuiTab-root': {
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  padding: '12px 16px',
                  color: 'text.primary',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(168, 85, 247, 0.1)'
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(168, 85, 247, 0.15)',
                    color: 'primary.main',
                    fontWeight: 600
                  }
                },
                '& .MuiTabs-indicator': {
                  left: 0,
                  width: 4
                }
              }}
            >
              <Tab
                icon={<DashboardIcon />}
                iconPosition="start"
                label="Boards"
                value={TABS.BOARDS_TAB}
                component={Link} to='/boards'
              />

              <Tab
                icon={<GroupIcon />}
                iconPosition="start"
                label="Members"
                value={TABS.MEMBER_TAB}
              />

              <Tab
                icon={<SettingsIcon />}
                iconPosition="start"
                label="Settings"
                value={TABS.SETTINGS_TAB}
              />

              <Tab
                icon={<CollectionsBookmarkIcon />}
                iconPosition="start"
                label="Templates"
                value={TABS.TEMPLATE_TAB}
              />

              <Tab
                icon={<DeleteIcon />}
                iconPosition="start"
                label="Trash"
                value={TABS.TRASH_TAB}
              />
            </TabList>

          </Box>

          {/* MAIN CONTENT */}
          <Box sx={{ flex: 1 }}>
            <Modal
              open={openCreateBoard}
              onClose={() => setOpenCreateBoard(false)}
            >
              <CreatedBoard
                onClose={() => setOpenCreateBoard(false)}
              />
            </Modal>
            <TabPanel value={TABS.BOARDS_TAB}>
              <BoardsTab />
            </TabPanel>

            <TabPanel value={TABS.MEMBER_TAB}>
              Members
            </TabPanel>

            <TabPanel value={TABS.SETTINGS_TAB}>
              Settings
            </TabPanel>

            <TabPanel value={TABS.TEMPLATE_TAB}>
              Templates
            </TabPanel>

            <TabPanel value={TABS.TRASH_TAB}>
              Trash
            </TabPanel>
          </Box>
        </Box>
      </TabContext>
    </Box>
  )
}

export default Boards