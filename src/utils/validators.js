export const EMAIL_RULE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
export const EMAIL_RULE_MESSAGE = 'Email không hợp lệ ( example : manhquynhdev@gmail.com) '
export const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/
export const PASSWORD_RULE_MESSAGE = 'Mật khẩu phải chứa ít nhẩt 1 ký tự đặc biệt, 1 chữ cái in hoa và có ít nhất 8 ký tự'
export const FILED_REQUIRED_MESSAGE = 'Bạn chưa nhập dữ liệu !'

export const LIMIT_COMMON_FILE_SIZE = 10485760
export const ALLOW_COMMON_FILE_SIZE = ['image/png', 'image/jpg', 'image/jpeg']
export const ALLOW_UPLOAD_FILE_TYPE = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/zip'
]
export const singleFileValidator = (file) => {
  if (!file || !file.name || !file.type || !file.size) {
    return 'File cannot be blank'
  }
  if (file.size > LIMIT_COMMON_FILE_SIZE) {
    return 'Maximum file size excceded. (10mb) '
  }
  if (!ALLOW_COMMON_FILE_SIZE.includes(file.type)) {
    return 'File type is invalid, Only accept jpg, png or jpeg'
  }
  return null
}

export const upLoadFile = (file) => {
  if (!file || !file.name || !file.type || !file.size) {
    return 'File cannot be blank'
  }
  if (file.size > LIMIT_COMMON_FILE_SIZE) {
    return 'Maximum file size excceded. (10mb) '
  }
  if (!ALLOW_UPLOAD_FILE_TYPE.includes(file.type)) {
    return 'File type is invalid, Only accept jpg, png , jpeg,  pdf, doc, docx, xls, xlsx, zip'
  }
  return null
}