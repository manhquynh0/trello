import { rolePermission, roles } from '~/config/rabcConfig'


export const usePermission = ({ board, user }) => {
  const getRole = () => {

    if (!board || !user) return

    const isOwner = board?.ownerIds?.includes(user?._id)
    if (isOwner) return roles.OWNER

    const isMember = board?.memberIds?.includes(user?._id)
    if (isMember) return roles.MEMBER
  }
  const currentRole = getRole()

  const hasPermission = (permission) => {
    const allowedPermission = rolePermission[currentRole]
    if (!allowedPermission || allowedPermission.length === 0) return false
    return allowedPermission.includes(permission)
  }

  return { hasPermission }


}