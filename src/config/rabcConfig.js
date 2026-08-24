// Định nghĩa các roles của user

export const roles = {
  OWNER: 'owner',
  MEMBER: 'member'
}
// Định nghĩa các quyền của user
export const permission = {
  DELETE_CARD: 'delete_card',
  DELETE_COLUMN: 'delete_column',
  UPDATE_CARD: 'update_card',
  CREATE_CARD: 'create_card',
  CREATE_COLUMN: 'create_column',
  INVITE_MEMBER_TO_BOARD: 'invite_member_to_board'
}
// Định nghĩa quyền theo từng role
export const rolePermission = {
  [roles.OWNER]: Object.values(permission),
  [roles.MEMBER]: [
    permission.UPDATE_CARD
  ]
}
