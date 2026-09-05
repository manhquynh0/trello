
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import Button from '@mui/material/Button'
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Checkbox from '@mui/material/Checkbox'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCardDetailsAPI, updateCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
function Cards({ card }) {
  const dispatch = useDispatch()

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
        bgcolor: '#1A2540',
        border: '1px solid #2A3655',
        borderRadius: 2,
        width: '100%',
        transition: isDragging ? 'none' : 'all 0.2s ease-in-out',
        cursor: 'pointer',
        '&:hover': isDragging ? {} : {
          bgcolor: '#22304F',
          borderColor: '#3A4A72',
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.45)'
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
        <Box sx={{ p: 1 }}>
          <Stack
            direction="row"
            spacing={1}
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
                  fontSize: 'small',
                  fontWeight: 600,
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
      <CardContent sx={{ gap: 1, p: 0.5, '&:last-child': { pb: 1.5 } }}>
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
              color: isChecked ? 'text.disabled' : 'text.primary',
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
      {ShouldShowCardActions() && <CardActions disableSpacing>
        {!!card?.memberIds?.length && <Button size='small' startIcon={<PeopleOutlineIcon />} aria-label="add to favorites">
          {card?.memberIds?.length}
        </Button>}
        {!!card?.comments?.length && <Button size='small' startIcon={<ChatOutlinedIcon />} aria-label="add to favorites">
          {card?.comments?.length}
        </Button>}
        {!!card?.attachments?.length && <Button size='small' startIcon={<AttachmentOutlinedIcon />} aria-label="add to favorites">
          {card?.attachments?.length}
        </Button>}
      </CardActions>}

    </Card>
  )
}
export default Cards