
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Checkbox from '@mui/material/Checkbox'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCardDetailsAPI, updateCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'
import { selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
function Cards({ card }) {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  const [isChecked, setIsChecked] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card?._id,
    data: { ...card },
    disabled: !!card?.FE_PlaceholderCard
  })

  const dndKitColumnStyles = {
    touchAction: 'none',
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #0F172A ' : undefined
  }
  const isActiveLabel = card?.labels?.filter(label => label.isActive === true)
  const dueDate = card?.dueDate || card?.dueDateAt || card?.deadline
  const cardMembers = (card?.memberIds || []).map(member => {
    if (typeof member === 'object') return member
    return board?.FE_allUser?.find(user => user._id === member) || { _id: member }
  })
  const formatMember = (member, index) => {
    const name = typeof member === 'object' ? (member.displayName || member.username || member.email || '') : ''
    return { name, initials: name ? name.slice(0, 2).toUpperCase() : String(index + 1) }
  }
  const ShouldShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length || !!card?.description?.length
  }
  const setActiveCard = () => {
    // 1. Cập nhật card tạm thời vào redux để mở Modal ngay tức thì cho giao diện mượt
    dispatch(updateCurrentActiveCard(card))
    // 2. Đồng thời gọi API fetchCardDetailsAPI để lấy dữ liệu mới nhất (bao gồm cả mảng members được populate từ backend)
    dispatch(fetchCardDetailsAPI(card._id))
  }

  return (
    <Card
      onClick={setActiveCard}
      ref={setNodeRef}
      style={dndKitColumnStyles}
      {...attributes}
      {...listeners}

      sx={{
        userSelect: 'none',
        display: card?.FE_PlaceholderCard ? 'none' : 'block',
        overflow: 'unset',
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#10264C' : '#FFFFFF',
        border: (theme) => theme.palette.mode === 'dark' ? '1px solid #1B3D70' : '1px solid #D8E3F2',
        borderRadius: '7px',
        width: '100%',
        transition: isDragging ? 'none' : 'all 0.2s ease-in-out',
        cursor: 'pointer',
        '&:hover': isDragging ? {} : {
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#142E59' : '#F4F8FF',
          borderColor: (theme) => theme.palette.mode === 'dark' ? '#3563A8' : '#8FB5EF',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 20px rgba(1, 12, 34, 0.42)'
        }
      }}
    >
      {card?.cover && (
        <CardMedia
          component="img"
          image={card.cover}
          alt={card.title}
          sx={{
            height: 160,
            objectFit: 'cover',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }}
        />
      )}
      {isActiveLabel?.length > 0 && (
        <Box sx={{ px: 1, pt: 1, pb: 0.25 }}>
          <Stack
            direction="row"
            spacing={0.5}
            flexWrap="wrap"
            useFlexGap
          >
            {isActiveLabel?.map(item => (
              <Chip
                key={item._id}
                label={item.name}
                size="small"
                sx={{
                  backgroundColor: item.color,
                  color: '#fff',
                  height: 18,
                  fontSize: '10px',
                  fontWeight: 700,
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',

                  '&:hover': {
                    backgroundColor: item.color,
                    filter: 'brightness(1.2)',
                    transform: 'translateY(-1px)',
                    boxShadow: `0 3px 10px ${item.color}66`
                  }
                }}
              />
            ))}
          </Stack>
        </Box>
      )}
      <CardContent sx={{ gap: 1, px: 1, pt: 0.75, pb: 0.75, '&:last-child': { pb: 0.75 } }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '&:hover .checkbox-card': {
              opacity: 1,
              width: '28px',
              marginRight: '5px'
            }
          }}
        >
          <Checkbox
            className="checkbox-card"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleIcon />}
            size="small"
            sx={{
              p: 0.5,
              opacity: 0,
              width: 0,
              marginRight: 0,
              transform: 'scale(0.8)',
              overflow: 'hidden',
              transition: 'opacity 0.2s ease-in-out, width 0.2s ease-in-out, margin-right 0.2s ease-in-out, transform 0.2s ease-in-out',
              '&.Mui-checked': {
                opacity: 1,
                color: 'success.main',
                transform: 'scale(1)',
                width: '28px',
                marginRight: '6px'
              }
            }}
          />
          <Typography
            variant="body2"
            data-no-dnd="true"
            sx={{
              color: (theme) => isChecked ? '#7890BB' : theme.palette.mode === 'dark' ? '#F1F5FF' : '#172B4D',
              fontSize: '12px',
              lineHeight: 1.4,
              fontWeight: 600,
              textDecoration: isChecked ? 'line-through' : 'none',
              transition: 'color 0.2s ease-in-out'
            }}

          >
            {card?.title}
          </Typography>
          {/* <Tooltip title="More" placement="top">
          </Tooltip> */}

        </Box>

      </CardContent>
      {(ShouldShowCardActions() || dueDate) && <CardActions disableSpacing sx={{ px: 1, pt: 0, pb: 1, minHeight: 28, justifyContent: 'space-between' }}>
        {!!cardMembers.length && <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 20, height: 20, fontSize: 8, border: '1px solid #10264C', bgcolor: '#657CA8' } }}>
          {cardMembers.map((member, index) => {
            const display = formatMember(member, index)
            return <Avatar key={member._id} alt={display.name} src={member?.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR_yi80uKEijqvut7Wq4j66q7Pgva_tQAgzPaBlSTDB0nsMvnfuR0e9g0E34yBoJJxntHaFAFWOUA7yAbaU22tZ3qOwI_BYQl65mHo7tNe&s=10'}>{display.initials}</Avatar>
          })}
        </AvatarGroup>}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, color: '#9AB1DA', ml: 'auto' }}>
          {dueDate && <Box sx={{ display: 'flex', alignItems: 'center', mr: 0.5, fontSize: 10 }}><CalendarMonthOutlinedIcon sx={{ fontSize: '13px !important', mr: 0.25 }} />{new Date(dueDate).toLocaleDateString('vi-VN')}</Box>}
          {!!card?.attachments?.length && <Box sx={{ display: 'flex', alignItems: 'center', fontSize: 10, mr: 0.5 }}><AttachmentOutlinedIcon sx={{ fontSize: '13px !important', mr: 0.25 }} />{card.attachments.length}</Box>}
          {!!card?.comments?.length && <Box sx={{ display: 'flex', alignItems: 'center', fontSize: 10 }}><ChatOutlinedIcon sx={{ fontSize: '13px !important', mr: 0.25 }} />{card.comments.length}</Box>}
        </Box>
      </CardActions>}

    </Card>
  )
}
export default Cards
