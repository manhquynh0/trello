import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
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
const ExpandMore = styled((props) => {
  const { expand: _expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

function Cards({ card }) {
  const [expanded, setExpanded] = React.useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
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

  const ShouldShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length || !!card?.description?.length
  }
  return (
    <Card
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
        {!!card?.description?.length && <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>}

      </CardActions>}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}
export default Cards