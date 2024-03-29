export interface CreateAdminType {
  id: number
  name: string
  profilePicture?: string
  email: string
  walletAddress: string
}

export interface AdminType extends CreateAdminType {
  category: string
}
