import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'

import CloseIcon from '@mui/icons-material/Close'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DescriptionIcon from '@mui/icons-material/Description'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import LockIcon from '@mui/icons-material/Lock'


import { useForm } from 'react-hook-form'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'

const CreatedBoard = ({ onClose, onSubmitBoard }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      visibility: 'public'
    }
  })

  const onSubmit = (data) => {

    if (onSubmitBoard) {
      onSubmitBoard(data)
    }
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      elevation={8}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        width: 'calc(100% - 32px)',
        maxWidth: 520,
        borderRadius: 2.5,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        backgroundImage: 'none',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 20px 60px rgba(0, 0, 0, 0.6)'
            : '0 20px 60px rgba(0, 0, 0, 0.15)'
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2.5,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)'
              : 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.06) 100%)',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: 'white'
            }}
          >
            <DashboardIcon sx={{ fontSize: 22 }} />
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'text.primary'
              }}
            >
              Create New Board
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                display: 'block',
                mt: 0.25
              }}
            >
              Set up your board and start organizing
            </Typography>
          </Box>
        </Box>

        <IconButton
          type="button"
          size="small"
          onClick={onClose}
          sx={{
            color: 'text.secondary',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
              color: 'error.main'
            }
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* FORM BODY */}
      <Box sx={{ p: 3 }}>
        <Stack spacing={3}>

          {/* TITLE SECTION */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mb: 1.5,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: 'text.secondary'
              }}
            >
              Board Details
            </Typography>

            <TextField
              id="title"
              fullWidth
              size="small"
              label="Board Title"
              placeholder="e.g., Project Management"
              autoFocus
              {...register('title', {
                required: 'Title is required',
                minLength: {
                  value: 3,
                  message: 'Min length is 3 characters'
                },
                maxLength: {
                  value: 100,
                  message: 'Maximum length is 100 characters'
                }
              })}
              error={Boolean(errors.title)}
              InputLabelProps={{
                shrink: true,
                sx: { fontSize: '0.9rem', px: 0.5 }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ mr: 1 }}>
                    <DashboardIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : '#f8f9fa',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  '& fieldset': {
                    borderColor: 'divider'
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main'
                  }
                },
                '& .MuiInputBase-input': {
                  py: 1.2
                }
              }}
            />

            <FieldErrorAlert
              errors={errors}
              fieldName="title"
            />
          </Box>

          {/* DESCRIPTION SECTION */}
          <Box sx={{ mt: 1 }}>
            <TextField
              id="description"
              fullWidth
              size="small"
              label="Board Description"
              placeholder="Add details about this board..."
              multiline
              minRows={3}
              {...register('description', {
                required: 'Description is required',
                minLength: {
                  value: 3,
                  message: 'Min length is 3 characters'
                },
                maxLength: {
                  value: 500,
                  message: 'Maximum length is 500 characters'
                }
              })}
              error={Boolean(errors.description)}
              InputLabelProps={{
                shrink: true,
                sx: { fontSize: '0.9rem', px: 0.5 }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      alignSelf: 'flex-start',
                      mt: 1,
                      mr: 1,
                      color: 'primary.main'
                    }}
                  >
                    <DescriptionIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : '#f8f9fa',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  '& fieldset': {
                    borderColor: 'divider'
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main'
                  }
                },
                '& .MuiInputBase-input': {
                  py: 1
                }
              }}
            />

            <FieldErrorAlert
              errors={errors}
              fieldName="description"
            />
          </Box>

          {/* DIVIDER */}
          <Divider />

          {/* VISIBILITY SECTION */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mb: 1.5,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: 'text.secondary'
              }}
            >
              Privacy Settings
            </Typography>

            <FormControl fullWidth>
              <RadioGroup
                {...register('visibility')}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2
                }}
              >
                <FormControlLabel
                  value="public"
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: 'primary.main',
                        '&.Mui-checked': {
                          color: 'primary.main'
                        }
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          Public
                        </Typography>
                      </Box>
                    </Box>
                  }
                  sx={{
                    p: 1.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '8px',
                    m: 0,
                    flex: 1,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.12)' : 'rgba(59, 130, 246, 0.05)',
                      borderColor: 'primary.main'
                    }
                  }}
                />

                <FormControlLabel
                  value="private"
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: 'primary.main',
                        '&.Mui-checked': {
                          color: 'primary.main'
                        }
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          Private
                        </Typography>
                      </Box>
                    </Box>
                  }
                  sx={{
                    p: 1.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '8px',
                    m: 0,
                    flex: 1,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.12)' : 'rgba(59, 130, 246, 0.05)',
                      borderColor: 'primary.main'
                    }
                  }}
                />
              </RadioGroup>
            </FormControl>

            {errors.visibility && (
              <Alert severity="error" sx={{ mt: 1.5 }}>
                {errors.visibility.message}
              </Alert>
            )}
          </Box>

          {/* DIVIDER */}
          <Divider />

          {/* ACTION BUTTONS */}
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              justifyContent: 'flex-end',
              pt: 1
            }}
          >
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={onClose}
              sx={{
                textTransform: 'none',
                px: 2.5,
                fontWeight: 600,
                color: 'text.primary',
                borderColor: 'divider',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                  borderColor: 'text.secondary'
                }
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{
                textTransform: 'none',
                px: 3,
                fontWeight: 600,
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Create Board
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  )
}

export default CreatedBoard