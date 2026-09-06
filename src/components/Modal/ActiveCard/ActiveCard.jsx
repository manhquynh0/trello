
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import CancelIcon from '@mui/icons-material/Cancel'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined'
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded'
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import LinearProgress from '@mui/material/LinearProgress'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'

import ToggleFocusInput from '~/components/Form/ToggleFocusInput'
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput'
import { singleFileValidator } from '~/utils/validators'
import { toast } from 'react-toastify'
import CardUserGroup from './CardUserGroup'
import CardDescriptionMdEditor from './CardDescriptionMdEditor'
import CardActivitySection from './CardActivitySection'
import { clearCurrentActiveCard, selectCurrentActiveCard, updateCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'
import { updateCardInCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { updateCardDetaislApi } from '~/apis'
import { socketIoInstance } from '~/socketClient'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { usePopover } from '~/customHooks/usePopover'
import CardLabelsPopover from './PopoverCard/CardLabelsPopover'
import CardChecklistPopover from './PopoverCard/CardChecklistPopover'
import CardAttachmentPopover from './PopoverCard/CardAttachmentPopover'
import CardDatesPopover from './PopoverCard/CardDatesPopover'
import CardCustomFieldsPopover from './PopoverCard/CardCustomFieldsPopover'
import { archiveCardApi } from '~/apis'
import { confirm } from '~/utils/ConfirmDialog'
const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  color: theme.palette.mode === 'dark' ? '#B9CCF3' : '#172b4d',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(29, 64, 119, 0.32)' : '#091e420f',
  border: theme.palette.mode === 'dark' ? '1px solid rgba(72, 119, 190, 0.24)' : '1px solid transparent',
  padding: '9px 10px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#1B3C70' : theme.palette.grey[300],
    '&.active': {
      color: theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4',
      backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff'
    }
  }
}))

/**
 * Note: Modal là một low-component mà bọn MUI sử dụng bên trong những thứ như Dialog,
 * Drawer, Menu, Popover. Ở đây dĩ nhiên chúng ta có thể sử dụng Dialog cũng không thành vấn đề gì,
 * nhưng sẽ sử dụng Modal để dễ linh hoạt tùy biến giao diện từ con số 0 cho phù hợp với mọi nhu cầu nhé.
 */
function ActiveCard() {
  const dispatch = useDispatch()
  const card = useSelector(selectCurrentActiveCard)
  const currentUser = useSelector(selectCurrentUser)

  // Mở Popover attachment
  const { anchorPopoverElement: anchorAttachment, isOpenPopover: isOpenAttachment, handleTogglePopover: handleToggleAttachment } = usePopover()
  const { anchorPopoverElement: anchorLabel, isOpenPopover: isOpenLabel, handleTogglePopover: handleToggleLabel } = usePopover()
  const { anchorPopoverElement: anchorChecklist, isOpenPopover: isOpenChecklist, handleTogglePopover: handleToggleChecklist } = usePopover()
  const { anchorPopoverElement: anchorDate, isOpenPopover: isOpenDate, handleTogglePopover: handleToggleDate } = usePopover()
  const { anchorPopoverElement: anchorCustomField, isOpenPopover: isOpenCustomField, handleTogglePopover: handleToggleCustomField } = usePopover()

  const attachmentPopoverId = isOpenAttachment ? 'attachment-popover' : undefined
  const labelPopoverId = isOpenLabel ? 'label-popover' : undefined
  const checklistPopoverId = isOpenChecklist ? 'checklist-popover' : undefined
  const datePopoverId = isOpenDate ? 'date-popover' : undefined
  const customFieldPopoverId = isOpenCustomField ? 'custom-field-popover' : undefined

  // Kiểm tra xem currentUser đã là member của Card hay chưa
  const isCurrentUserCardMember = card?.memberIds?.includes(currentUser?._id)

  const handleCloseModal = () => {
    dispatch(clearCurrentActiveCard())
  }
  const callAPI = async (updateData) => {
    const updatedCard = await updateCardDetaislApi(card._id, updateData)
    dispatch(updateCurrentActiveCard(updatedCard))
    dispatch(updateCardInCurrentActiveBoard(updatedCard))
    return updatedCard
  }
  const onUpdateCardTitle = async (newTitle) => {
    callAPI({
      title: newTitle.trim()
    })
  }
  const onUpdateCardDescription = async (newDes) => {
    callAPI({
      description: newDes
    })
  }
  const onUploadCardCover = (event) => {
    const error = singleFileValidator(event.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }
    let reqData = new FormData()
    reqData.append('cardCover', event.target?.files[0])

    toast.promise(
      callAPI(reqData).finally(() => event.target.value = ''), {
      pending: 'Updating...'
    }
    )

    // Gọi API...
  }
  const onUpdateComment = async (commentToAdd) => {
    await callAPI({ commentToAdd })

  }
  const onUpdateCardMember = (incomingMemberInfo) => {
    callAPI({ incomingMemberInfo }).then((updatedCard) => {
      // Bắn sự kiện Socket Realtime thông báo khi có user Join / Leave Card
      socketIoInstance.emit('FE_USER_JOINED_CARD', {
        cardId: card._id,
        user: currentUser,
        action: incomingMemberInfo.action,
        updatedCard
      })
    })
  }

  useEffect(() => {
    // Lắng nghe sự kiện BE_USER_JOINED_CARD từ Server gửi về cho các client khác
    const onReceiveUserJoinedCard = (data) => {
      // Cập nhật giao diện realtime cho người khác đang mở Card hoặc trên Board
      if (data?.updatedCard) {
        dispatch(updateCardInCurrentActiveBoard(data.updatedCard))
        if (data?.cardId === card?._id) {
          dispatch(updateCurrentActiveCard(data.updatedCard))
        }
      }

      if (data?.cardId === card?._id) {
        if (data.action === 'ADD') {
          toast.info(`${data.user?.displayName || 'Someone'} joined this card!`)
        } else if (data.action === 'REMOVE') {
          toast.info(`${data.user?.displayName || 'Someone'} left this card!`)
        }
      }
    }

    socketIoInstance.on('BE_USER_JOINED_CARD', onReceiveUserJoinedCard)

    return () => {
      socketIoInstance.off('BE_USER_JOINED_CARD', onReceiveUserJoinedCard)
    }
  }, [card?._id, dispatch])

  const handleArchiveCard = async (cardId) => {
    const result = await confirm(
      'Bạn có chắc muốn lưu trữ thẻ này?', 'Lưu trữ'
    )
    if (result.isConfirmed) {
      toast.promise(archiveCardApi(cardId), {
        pending: 'Đang lưu trữ...'
      }).then((updatedCard) => {
        toast.success('Lưu trữ thành công!')
        handleCloseModal()
        dispatch(updateCurrentActiveCard(updatedCard))
        dispatch(updateCardInCurrentActiveBoard(updatedCard))
      }).catch(() => {
        toast.error('Lưu trữ thất bại!')
      })
    }
  }

  const handleUnavailableFeature = () => {
    toast.info('Chức năng này đang được cập nhật')
  }

  return (
    <Modal
      disableScrollLock
      open={true}
      onClose={handleCloseModal} // Sử dụng onClose trong trường hợp muốn đóng Modal bằng nút ESC hoặc click ra ngoài Modal
      sx={{ overflowY: 'auto' }}>
      <Box sx={{
        position: 'relative',
        width: 1300,
        maxWidth: 'calc(100vw - 48px)',
        bgcolor: 'white',
        borderRadius: '16px',
        border: '1px solid #294A80',
        outline: 0,
        padding: '28px',
        margin: '42px auto',
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#091A38' : '#fff',
        boxShadow: '0 24px 70px rgba(0, 8, 25, 0.65)'
      }}>
        <Box sx={{
          position: 'absolute',
          top: '22px',
          right: '24px',
          cursor: 'pointer'
        }}>
          <CancelIcon sx={{ color: '#AFC5ED', '&:hover': { color: '#FFFFFF' } }} onClick={handleCloseModal} />
        </Box>

        {card?.cover &&
          <Box sx={{ mb: 4 }}>
            <img
              style={{ width: '100%', height: '320px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #294A80' }}
              src={card?.cover}
              alt="card-cover"
            />
          </Box>}

        <Box sx={{ mb: 3, pr: 8, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ display: 'grid', placeItems: 'center', width: 42, height: 42, borderRadius: '9px', bgcolor: '#183B70', color: '#AFCBFF' }}><CreditCardIcon /></Box>

          {/* Feature 01: Xử lý tiêu đề của Card */}
          <ToggleFocusInput
            inputFontSize='28px'
            value={card?.title}
            onChangedValue={onUpdateCardTitle} />
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, ml: 7, mt: -2, mb: 2.5 }}>
          {(card?.labels || []).filter(label => label.isActive).map(label => (
            <Box key={label._id} sx={{ px: 1.75, py: 0.55, borderRadius: '8px', color: '#fff', fontSize: 13, fontWeight: 700, backgroundColor: label.color, boxShadow: `0 4px 12px ${label.color}55` }}>{label.name}</Box>
          ))}
          <Box onClick={handleToggleLabel} sx={{ width: 28, height: 28, display: 'grid', placeItems: 'center', borderRadius: '8px', color: '#AFCBFF', border: '1px solid #315B98', cursor: 'pointer' }}><AddOutlinedIcon fontSize="small" /></Box>
        </Box>

        <Grid container spacing={2.5} sx={{ mb: 0 }}>
          {/* Left side */}
          <Grid xs={12} md={8}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 1.25, mb: 2.5 }}>
              <Box sx={{ p: 1.5, border: '1px solid #244879', borderRadius: '10px', bgcolor: 'rgba(16, 42, 83, 0.58)' }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', color: '#9CB8EC' }}><CalendarMonthOutlinedIcon fontSize="small" /><Typography fontSize={12}>Ngày tạo</Typography></Box>
                <Typography sx={{ mt: 0.65, fontSize: 14, fontWeight: 700, color: '#DCE9FF' }}>{card?.createdAt ? new Date(card.createdAt).toLocaleDateString('vi-VN') : 'Chưa thiết lập'}</Typography>
              </Box>
              <Box sx={{ p: 1.5, border: '1px solid #63335B', borderRadius: '10px', bgcolor: 'rgba(83, 24, 70, 0.22)' }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', color: '#F09BCE' }}><AccessTimeOutlinedIcon fontSize="small" /><Typography fontSize={12}>Hạn chót</Typography></Box>
                <Typography sx={{ mt: 0.65, fontSize: 14, fontWeight: 700, color: '#FF83C2' }}>{card?.dueDate ? new Date(card.dueDate).toLocaleDateString('vi-VN') : 'Chưa thiết lập'}</Typography>
              </Box>
              <Box sx={{ p: 1.5, border: '1px solid #735A25', borderRadius: '10px', bgcolor: 'rgba(78, 52, 13, 0.27)' }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', color: '#F4C35E' }}><TaskAltOutlinedIcon fontSize="small" /><Typography fontSize={12}>Checklist</Typography></Box>
                <Typography sx={{ mt: 0.65, fontSize: 14, fontWeight: 700, color: '#FFE1A0' }}>{card?.checkList?.length || 0} danh sách</Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 3, p: 2.25, border: '1px solid #234778', borderRadius: '11px', bgcolor: 'rgba(9, 31, 68, 0.48)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SubjectRoundedIcon />
                <Typography variant="span" sx={{ fontWeight: 700, fontSize: '18px', color: '#DDE9FF' }}>Mô tả</Typography>
              </Box>

              {/* Feature 03: Xử lý mô tả của Card */}
              <CardDescriptionMdEditor
                cardDescriptionProp={card?.description}
                handleUpdateCardDes={onUpdateCardDescription}

              />
            </Box>

            <Box sx={{ mb: 3, p: 2.25, border: '1px solid #234778', borderRadius: '11px', bgcolor: 'rgba(9, 31, 68, 0.48)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><TaskAltOutlinedIcon sx={{ color: '#AFCBFF' }} /><Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#DDE9FF' }}>Checklist</Typography></Box>
                <Box onClick={handleToggleChecklist} sx={{ px: 1.25, py: 0.55, borderRadius: '7px', border: '1px solid #315B98', color: '#B9D1FC', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>+ Thêm</Box>
              </Box>
              {(card?.checkList || []).map(list => (
                <Box key={list._id} sx={{ cursor: 'pointer', p: 1.25, mb: 1, borderRadius: '8px', bgcolor: 'rgba(16, 42, 83, 0.55)', border: '1px solid rgba(49, 91, 152, 0.55)', '&:hover': { borderColor: '#4E7FC2' } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}><Typography sx={{ color: '#D5E3FF', fontWeight: 700, fontSize: 14 }}>{list.name}</Typography><Typography sx={{ color: '#9CB8EC', fontSize: 12 }}>{list?.subItems?.filter(item => item.isSuccess).length || 0}/{list?.subItems?.length || 0}</Typography></Box>
                  <LinearProgress variant="determinate" value={list?.subItems?.length ? (list.subItems.filter(item => item.isSuccess).length / list.subItems.length) * 100 : 0} sx={{ height: 6, borderRadius: 4, bgcolor: '#1B3766', '& .MuiLinearProgress-bar': { borderRadius: 4, bgcolor: '#36D982' } }} />
                  {(list?.subItems || []).slice(0, 4).map(item => <Box key={item._id} sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, color: item.isSuccess ? '#8FE3BA' : '#C7D8F5', fontSize: 13 }}><Box sx={{ width: 17, height: 17, borderRadius: '4px', display: 'grid', placeItems: 'center', border: item.isSuccess ? 'none' : '1px solid #7FA5E3', bgcolor: item.isSuccess ? '#36D982' : 'transparent', color: '#082046', fontWeight: 900 }}>{item.isSuccess ? '✓' : ''}</Box>{item.name}</Box>)}
                </Box>
              ))}
              {!card?.checkList?.length && <Box onClick={handleToggleChecklist} sx={{ p: 1.25, borderRadius: '8px', border: '1px dashed #315B98', color: '#9CB8EC', fontSize: 13, cursor: 'pointer' }}>Chưa có checklist — tạo checklist đầu tiên</Box>}
            </Box>

            <Box sx={{ mb: 3, p: 2.25, border: '1px solid #234778', borderRadius: '11px', bgcolor: 'rgba(9, 31, 68, 0.48)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><AttachFileOutlinedIcon sx={{ color: '#AFCBFF' }} /><Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#DDE9FF' }}>Tệp đính kèm</Typography><Typography sx={{ px: 0.8, py: 0.15, borderRadius: 3, bgcolor: '#1D427C', color: '#B9D1FC', fontSize: 12 }}>{card?.attachments?.length || 0}</Typography></Box>
                <Box onClick={handleToggleAttachment} sx={{ px: 1.25, py: 0.55, borderRadius: '7px', border: '1px solid #315B98', color: '#B9D1FC', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>+ Thêm tệp</Box>
              </Box>
              {(card?.attachments || []).map((attachment) => <Box key={attachment?.publicId} sx={{ display: 'flex', alignItems: 'center', gap: 1.25, p: 1, mb: 0.75, borderRadius: '8px', border: '1px solid rgba(49, 91, 152, 0.55)', cursor: 'pointer', '&:hover': { borderColor: '#4E7FC2', bgcolor: 'rgba(16, 42, 83, 0.55)' } }}><Box sx={{ width: 32, height: 32, display: 'grid', placeItems: 'center', borderRadius: '7px', bgcolor: '#1B467F', color: '#ACCCFF' }}><InsertDriveFileOutlinedIcon fontSize="small" /></Box><Typography sx={{ flex: 1, color: '#D5E3FF', fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{attachment?.name || attachment}</Typography><Typography sx={{ color: '#7FA1D3', fontSize: 12 }}>{attachment?.size || ''}</Typography></Box>)}
              {!card?.attachments?.length && <Box onClick={handleToggleAttachment} sx={{ p: 1.25, borderRadius: '8px', border: '1px dashed #315B98', color: '#9CB8EC', fontSize: 13, cursor: 'pointer' }}>Chưa có tệp đính kèm</Box>}
            </Box>

            <Box sx={{ mb: 0, p: 2.25, border: '1px solid #234778', borderRadius: '11px', bgcolor: 'rgba(9, 31, 68, 0.48)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <DvrOutlinedIcon />
                <Typography variant="span" sx={{ fontWeight: 700, fontSize: '18px', color: '#DDE9FF' }}>Hoạt động</Typography>
              </Box>

              {/* Feature 04: Xử lý các hành động, ví dụ comment vào Card */}
              <CardActivitySection
                comments={card?.comments}
                onUpdateComment={onUpdateComment}

              />
            </Box>
          </Grid>

          {/* Right side */}
          <Grid xs={12} md={4}>
            <Box sx={{ height: '100%', p: 2, border: '1px solid #294A80', borderRadius: '11px', bgcolor: 'rgba(7, 25, 55, 0.74)' }}>
              <Box sx={{ pb: 2, mb: 2, borderBottom: '1px solid rgba(97, 142, 214, 0.25)' }}>
                <Typography sx={{ fontWeight: 700, color: '#DDE9FF', mb: 1.25, fontSize: 16 }}>Thành viên</Typography>
                <CardUserGroup cardMemberIds={card?.memberIds} onUpdateCardMember={onUpdateCardMember} />
              </Box>
              <Box onClick={handleToggleDate} sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2, p: 1.25, border: '1px solid #63335B', borderRadius: '9px', bgcolor: 'rgba(98, 31, 78, 0.3)', cursor: 'pointer' }}>
                <AccessTimeOutlinedIcon sx={{ color: '#FF8BC5' }} />
                <Box><Typography sx={{ color: '#B9CCF3', fontSize: 12 }}>Ngày hết hạn</Typography><Typography sx={{ color: '#FF8BC5', fontWeight: 700, fontSize: 14 }}>{card?.dueDate ? new Date(card.dueDate).toLocaleDateString('vi-VN') : 'Thiết lập ngày hạn'}</Typography></Box>
              </Box>
              <Typography sx={{ fontWeight: 700, color: '#DDE9FF', mb: 1.25, fontSize: 16 }}>Thêm vào thẻ</Typography>
              <Stack direction="column" spacing={1}>
                {/* Feature 05: Xử lý hành động bản thân user tự join vào card */}
                <SidebarItem
                  className={isCurrentUserCardMember ? 'active' : ''}
                  onClick={() => onUpdateCardMember({
                    userId: currentUser?._id,
                    action: isCurrentUserCardMember ? 'REMOVE' : 'ADD'
                  })}
                >
                  <PersonOutlineOutlinedIcon fontSize="small" />
                  {isCurrentUserCardMember ? 'Rời khỏi' : 'Tham gia'}
                </SidebarItem>

                {/* Feature 06: Xử lý hành động cập nhật ảnh Cover của Card */}
                <SidebarItem className="active" component="label" sx={{ cursor: 'pointer' }}>
                  <ImageOutlinedIcon fontSize="small" />
                  Ảnh bìa
                  <VisuallyHiddenInput type="file" onChange={onUploadCardCover} />
                </SidebarItem>

                <SidebarItem
                  aria-describedby={attachmentPopoverId}
                  onClick={handleToggleAttachment}>
                  <AttachFileOutlinedIcon fontSize="small" /> File đính kèm</SidebarItem>
                <CardAttachmentPopover
                  card={card}
                  anchorEl={anchorAttachment}
                  isOpen={isOpenAttachment}
                  onClose={handleToggleAttachment}
                />
                <SidebarItem
                  card={card}
                  aria-describedby={labelPopoverId}
                  onClick={handleToggleLabel}>
                  <LocalOfferOutlinedIcon fontSize="small" />Nhãn</SidebarItem>
                <CardLabelsPopover
                  card={card}
                  anchorEl={anchorLabel}
                  isOpen={isOpenLabel}
                  onClose={handleToggleLabel}
                />
                <SidebarItem
                  card={card}
                  aria-describedby={checklistPopoverId}
                  onClick={handleToggleChecklist}>
                  <TaskAltOutlinedIcon fontSize="small" />Danh sách</SidebarItem>
                <CardChecklistPopover
                  card={card}
                  anchorEl={anchorChecklist}
                  isOpen={isOpenChecklist}
                  onClose={handleToggleChecklist}
                />
                <SidebarItem
                  card={card}
                  aria-describedby={datePopoverId}
                  onClick={handleToggleDate}>
                  <WatchLaterOutlinedIcon fontSize="small" />Thời gian</SidebarItem>
                <CardDatesPopover
                  card={card}
                  anchorEl={anchorDate}
                  isOpen={isOpenDate}
                  onClose={handleToggleDate}
                />
                <SidebarItem
                  card={card}
                  aria-describedby={customFieldPopoverId}
                  onClick={handleToggleCustomField}>
                  <AutoFixHighOutlinedIcon fontSize="small" /> Tùy chỉnh</SidebarItem>
                <CardCustomFieldsPopover
                  card={card}
                  anchorEl={anchorCustomField}
                  isOpen={isOpenCustomField}
                  onClose={handleToggleCustomField}
                />
              </Stack>

              <Divider sx={{ my: 2, borderColor: 'rgba(97, 142, 214, 0.25)' }} />

              <Typography sx={{ fontWeight: 700, color: '#DDE9FF', mb: 1.25, fontSize: 16 }}>Power-Ups</Typography>
              <Stack direction="column" spacing={1}>
                <SidebarItem onClick={handleUnavailableFeature}><AspectRatioOutlinedIcon fontSize="small" />Kích thước thẻ</SidebarItem>
                <SidebarItem onClick={handleUnavailableFeature}><AddToDriveOutlinedIcon fontSize="small" />Google Drive</SidebarItem>
                <SidebarItem onClick={handleUnavailableFeature}><AddOutlinedIcon fontSize="small" /> Thêm Power-Ups</SidebarItem>
              </Stack>

              <Divider sx={{ my: 2, borderColor: 'rgba(97, 142, 214, 0.25)' }} />

              <Typography sx={{ fontWeight: 700, color: '#DDE9FF', mb: 1.25, fontSize: 16 }}>Thao tác</Typography>
              <Stack direction="column" spacing={1}>
                <SidebarItem onClick={handleUnavailableFeature}><ArrowForwardOutlinedIcon fontSize="small" />Di chuyển</SidebarItem>
                <SidebarItem onClick={handleUnavailableFeature}><ContentCopyOutlinedIcon fontSize="small" />Sao chép</SidebarItem>
                <SidebarItem onClick={handleUnavailableFeature}><AutoAwesomeOutlinedIcon fontSize="small" /> Tạo mẫu</SidebarItem>
                <SidebarItem onClick={() => handleArchiveCard(card._id)}><ArchiveOutlinedIcon fontSize="small" />Lưu trữ</SidebarItem>
                <SidebarItem onClick={handleUnavailableFeature}><ShareOutlinedIcon fontSize="small" /> Chia sẻ</SidebarItem>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ActiveCard
