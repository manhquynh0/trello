import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import QueueIcon from '@mui/icons-material/Queue'
import * as React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupIcon from '@mui/icons-material/Group'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DeleteIcon from '@mui/icons-material/Delete'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import BoardsTab from '~/components/BoardTab/Boards'
import MembersTab from '~/components/BoardTab/MembersTab'
import RecentlyTab from '~/components/BoardTab/RecentlyTab'
import TemplatesTab from '~/components/BoardTab/TemplatesTab'
import TrashTab from '~/components/BoardTab/TrashTab'
import TabPanel from '@mui/lab/TabPanel'
import { Link, useLocation } from 'react-router-dom'
import Appbar from '~/components/AppBar'
import CreatedBoard from './created'
import Modal from '@mui/material/Modal'
import { fetchBoardsAPI } from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch } from 'react-redux'

const TABS = {
  BOARDS_TAB: 'boards',
  MEMBER_TAB: 'members',
  RECENTLY_TAB: 'recently',
  TEMPLATE_TAB: 'templates',
  TRASH_TAB: 'trash'
}

const Boards = () => {
  const location = useLocation()
  console.log(location)
  const dispatch = useDispatch()
  const getDefaultURL = () => {
    if (location.pathname.includes(TABS.RECENTLY_TAB)) return TABS.RECENTLY_TAB
    if (location.pathname.includes(TABS.TEMPLATE_TAB)) return TABS.TEMPLATE_TAB
    if (location.pathname.includes(TABS.TRASH_TAB)) return TABS.TRASH_TAB
    return TABS.BOARDS_TAB
  }
  const [activeTab, setActiveTab] = React.useState(getDefaultURL)
  const [openCreateBoard, setOpenCreateBoard] = React.useState(false)
  // const [boardsRefreshKey, setBoardsRefreshKey] = React.useState(0)
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }
  const afterCreate = () => {
    dispatch(fetchBoardsAPI(location.search))
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
                label="Bảng"
                value={TABS.BOARDS_TAB}
                component={Link} to='/boards'
              />

              <Tab
                icon={<GroupIcon />}
                iconPosition="start"
                label="Thành viên"
                value={TABS.MEMBER_TAB}
                component={Link} to='/boards/members'
              />

              <Tab
                icon={<AccessTimeIcon />}
                iconPosition="start"
                label="Gần đây"
                value={TABS.RECENTLY_TAB}
                component={Link} to='/boards/recently'
              />

              <Tab
                icon={<CollectionsBookmarkIcon />}
                iconPosition="start"
                label="Mẫu"
                value={TABS.TEMPLATE_TAB}
                component={Link} to='/boards/templates'
              />

              <Tab
                icon={<DeleteIcon />}
                iconPosition="start"
                label="Thùng rác"
                value={TABS.TRASH_TAB}
                component={Link} to='/boards/trash'
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
                afterCreate={afterCreate}
              />
            </Modal>
            <TabPanel value={TABS.BOARDS_TAB}>
              <BoardsTab
              // refreshKey={boardsRefreshKey}
              />
            </TabPanel>

            <TabPanel value={TABS.MEMBER_TAB}>
              <MembersTab />
            </TabPanel>

            <TabPanel value={TABS.RECENTLY_TAB}>
              <RecentlyTab />
            </TabPanel>

            <TabPanel value={TABS.TEMPLATE_TAB}>
              <TemplatesTab />
            </TabPanel>

            <TabPanel value={TABS.TRASH_TAB}>
              <TrashTab />
            </TabPanel>
          </Box>
        </Box>
      </TabContext>
    </Box>
  )
}

export default Boards