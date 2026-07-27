import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import Tooltip from '@mui/material/Tooltip'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import ListCards from './ListCards/ListCards'
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '60px'
import { mapOrder } from '~/utils/sort'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
const ExpandMore = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'expand'
})(({ theme, expand }) => ({
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))
function Column({ column }) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })
  const dndKitColumnStyles = {

    // touchAction : 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined
  };
  const orderedCards = mapOrder(column?.cards, column?.carOrderIds, '_id')
  return (
    <div ref={setNodeRef}
      style={dndKitColumnStyles}
      {...attributes}
    >
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          ml: 2,
          borderRadius: '6px',
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }} >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            height: COLUMN_HEADER_HEIGHT + 24 // tăng chiều cao nếu cần
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            {new Date().toLocaleDateString('vi-VN')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant='h6' sx={{
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              {column.title}
            </Typography>
            <Box>
              <Tooltip title="More" placement="top">
                <ExpandMore
                  expand={open}
                  onClick={handleClick}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </Tooltip>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button-workspaces'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>ADD CARD</ListItemText>

                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>

                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>

                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>

                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Web Clipboard</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <DeleteRoundedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove Column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>

        {/* End Header */}

        {/* Main */}
        <ListCards cards={column.cards} />
        {/* End Main */}

        {/* Footer */}
        <Box sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: COLUMN_FOOTER_HEIGHT
        }}>
          <Button startIcon={<AddCardIcon />}>Add New Card </Button>
        </Box>
        {/* End Footer */}

      </Box >
    </div>

  )

}


export default Column