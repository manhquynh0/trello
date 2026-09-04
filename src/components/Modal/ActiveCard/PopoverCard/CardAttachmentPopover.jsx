import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import Button from '@mui/material/Button'
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput'

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import LinkIcon from '@mui/icons-material/Link'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { upLoadFile } from '~/utils/validators'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useDispatch } from 'react-redux'
import { updateCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'
import { updateCardDetaislApi } from '~/apis'
import { toast } from 'react-toastify'
import moment from 'moment'
import 'moment/locale/vi'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import DescriptionIcon from '@mui/icons-material/Description'
import TableChartIcon from '@mui/icons-material/TableChart'
import SlideshowIcon from '@mui/icons-material/Slideshow'
import ArchiveIcon from '@mui/icons-material/Archive'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { updateCardInCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { deleteAttachmentApi } from '~/apis'
import { confirm } from '~/utils/ConfirmDialog'
import { useForm } from 'react-hook-form'
import { FILED_REQUIRED_MESSAGE, URL_REGEX } from '~/utils/validators'
import { createdAttachmentApi } from '~/apis'
const getFileIcon = (filetype, url) => {
  if (filetype === 'link') {
    return <a href={url} target="_blank" rel="noopener noreferrer"><LinkIcon sx={{ color: '#EF4444', fontSize: 30 }} /></a>
  }
  if (filetype === 'application/pdf') {
    return <a href={url} target="_blank" rel="noopener noreferrer"><PictureAsPdfIcon sx={{ color: '#EF4444', fontSize: 30 }} /></a>
  }

  if (
    filetype === 'application/msword' ||
    filetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return <a href={url} target="_blank" rel="noopener noreferrer"><DescriptionIcon sx={{ color: '#3B82F6', fontSize: 30 }} /></a>
  }

  if (
    filetype === 'application/vnd.ms-excel' ||
    filetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    return <a href={url} target="_blank" rel="noopener noreferrer"><TableChartIcon sx={{ color: '#22C55E', fontSize: 30 }} /></a>
  }

  if (
    filetype === 'application/vnd.ms-powerpoint' ||
    filetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ) {
    return <a href={url} target="_blank" rel="noopener noreferrer"><SlideshowIcon sx={{ color: '#F97316', fontSize: 30 }} /></a>
  }

  if (filetype === 'application/zip') {
    return <a href={url} target="_blank" rel="noopener noreferrer"><ArchiveIcon sx={{ color: '#EAB308', fontSize: 30 }} /></a>
  }

  return <a href={url} target="_blank" rel="noopener noreferrer"><InsertDriveFileIcon sx={{ color: '#9CA3AF', fontSize: 30 }} /></a>
}

function CardAttachmentPopover({ card, anchorEl, isOpen, onClose }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [value, setValue] = useState('1')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const dispatch = useDispatch()
  const callAPI = async (data) => {
    const updatedCard = await updateCardDetaislApi(card._id, data)
    dispatch(updateCurrentActiveCard(updatedCard))
    dispatch(updateCardInCurrentActiveBoard(updatedCard))
    return updatedCard
  }

  const onUploadFile = (event) => {
    const error = upLoadFile(event.target.files[0])
    if (error) {
      toast.error(error)
      return
    }
    const data = new FormData()
    data.append('attachments', event.target.files[0])
    toast.promise(callAPI(data), {
      pending: 'Đang tải lên...'
    }).then(() => {
      toast.success('Upload thành công!')
    }).catch(() => {
      toast.error('Upload thất bại!')
    })
  }
  const onDowloadFile = () => {
    console.log('Download file')
  }
  const handleDeleteAttachment = async (attachmentId) => {
    const result = await confirm(
      'Bạn có chắc muốn xóa tệp đính kèm này?', 'Xóa'
    )
    if (result.isConfirmed) {
      toast.promise(deleteAttachmentApi(card._id, attachmentId), {
        pending: 'Đang xóa...'
      }).then((updatedCard) => {
        toast.success('Xóa tệp đính kèm thành công!')
        dispatch(updateCurrentActiveCard(updatedCard))
        dispatch(updateCardInCurrentActiveBoard(updatedCard))
      }).catch(() => {
        toast.error('Xóa tệp đính kèm thất bại!')
      })
    }
  }
  const onSubmit = (data) => {
    const { link, name } = data
    toast.promise(
      createdAttachmentApi(card._id, {
        attachments: [{
          filetype: 'link',
          url: link,
          name: name
        }
        ]
      }),
      {
        pending: 'Đang thêm liên kết...'
      }
    ).then((data) => {
      reset()
      toast.success('Thêm liên kết thành công!')
      dispatch(updateCurrentActiveCard(data))
      dispatch(updateCardInCurrentActiveBoard(data))
    }).catch(() => {
      toast.error('Thêm liên kết thất bại!')
    })
  }

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      sx={{ '& .MuiPaper-root': { backgroundColor: '#111827', color: 'white', borderRadius: '12px', width: '420px', border: '1px solid #374151' } }}
    >
      <TabContext value={value}>
        <Box sx={{ p: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Upload" value="1" icon={<FileUploadOutlinedIcon />} iconPosition="start" />
              <Tab label="Link" value="2" icon={<LinkIcon />} iconPosition="start" />

            </TabList>
          </Box>
          <TabPanel value="1"> <Box sx={{ border: '1px dashed #4B5563', borderRadius: '8px', p: 4, textAlign: 'center', mb: 3, backgroundColor: '#1F2937' }}>
            <CloudUploadIcon sx={{ color: '#9CA3AF', fontSize: '40px', mb: 1 }} />
            <Typography sx={{ fontSize: '14px', mb: 1 }}>Drag and drop files here<br />or</Typography>

            <Button component='label' variant="contained" sx={{ backgroundColor: '#0EA5E9', textTransform: 'none', mb: 2, '&:hover': { backgroundColor: '#0284C7' } }}>
              Chọn tệp
              <VisuallyHiddenInput type="file" onChange={onUploadFile} />
            </Button>
            <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>
              Hỗ trợ PDF, tài liệu, hình ảnh và nhiều định dạng khác (tối đa 10MB mỗi tệp)
            </Typography>
          </Box></TabPanel>
          <TabPanel value="2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: 'center', justifyContent: 'center' }}>
                <TextField
                  fullWidth
                  label="Thêm liên kết"
                  placeholder="Ví dụ: https://qllo.com"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: '40px',
                      borderRadius: '4px',
                      backgroundColor: '#1F2937',

                      '& fieldset': {
                        borderColor: '#4B5563',
                      },

                      '&:hover fieldset': {
                        borderColor: '#4B5563',
                      },

                      '&.Mui-focused fieldset': {
                        borderColor: '#0EA5E9',
                      },
                    },

                    '& .MuiInputBase-input': {
                      padding: '10px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#9CA3AF',
                    },

                    '& .MuiInputLabel-root': {
                      color: '#9CA3AF'
                    },

                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#0EA5E9'
                    }
                  }}
                  {...register('link', {
                    required: FILED_REQUIRED_MESSAGE,
                    pattern: {
                      value: URL_REGEX,
                      message: 'Vui lòng nhập URL hợp lệ'
                    }
                  })}
                  error={!!errors.link}
                  helperText={errors.link?.message}
                />
                <TextField
                  fullWidth
                  label="Tên thay thế"

                  placeholder="Ví dụ: https://qllo.com"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: '40px',
                      borderRadius: '4px',
                      backgroundColor: '#1F2937',

                      '& fieldset': {
                        borderColor: '#4B5563'
                      },

                      '&:hover fieldset': {
                        borderColor: '#4B5563'
                      },

                      '&.Mui-focused fieldset': {
                        borderColor: '#0EA5E9'
                      },
                    },

                    '& .MuiInputBase-input': {
                      padding: '10px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#9CA3AF'
                    },

                    '& .MuiInputLabel-root': {
                      color: '#9CA3AF'
                    },

                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#0EA5E9'
                    }
                  }}
                  {...register('name', {
                    required: FILED_REQUIRED_MESSAGE
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
                <Button variant='contained' type='submit' sx={{ backgroundColor: '#0EA5E9', textTransform: 'none', '&:hover': { backgroundColor: '#0284C7' }, width: 'fit-content' }}>Thêm vào thẻ</Button>
              </Box>
            </form>
          </TabPanel>
          <Typography sx={{ color: '#9CA3AF', fontSize: '14px', mb: 2 }}>
            Thêm tệp, link hoặc ảnh vào thẻ của bạn.
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Tệp đính kèm</Typography>
          </Box>
          {!card?.attachments?.length && <Typography sx={{ color: '#9CA3AF', fontSize: '14px' }}>Không có tệp đính kèm</Typography>}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {card?.attachments?.map((attachment) => (
              <Box key={attachment.publicId} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, backgroundColor: '#1F2937', p: 1.5, borderRadius: '8px' }}>
                <Box sx={{ width: '48px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {attachment?.filetype.startsWith('image/') ?
                    <a href={attachment.url} target="_blank" rel="noopener noreferrer"><img src={attachment.url} alt="thumb" style={{ width: '100%', height: '100%', borderRadius: '4px', objectFit: 'cover' }} /> </a> : getFileIcon(attachment?.filetype, attachment?.url)}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{attachment?.name}</Typography>
                  <Typography sx={{ fontSize: '12px', color: '#9CA3AF', mb: 0.5 }}> {moment(attachment?.createdAt).format('llll')}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar src={attachment?.userAvatar} sx={{ width: 16, height: 16 }} />
                    <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>{attachment?.userDisplayName}</Typography>
                  </Box>
                </Box>
                {attachment.type !== 'link' && <IconButton size="small" onClick={onDowloadFile} sx={{ color: '#9CA3AF' }}>
                  <FileDownloadOutlinedIcon
                  /></IconButton>}
                <IconButton size="small" onClick={() => handleDeleteAttachment(attachment?.publicId)} sx={{ color: '#9CA3AF' }}><DeleteOutlineIcon fontSize="small" /></IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      </TabContext>
    </Popover>
  )
}

export default CardAttachmentPopover
