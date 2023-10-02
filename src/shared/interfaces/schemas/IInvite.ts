export interface IInvite {
  id?: number;
  status: string;
  userId: number;
  senderId: number;
  companyId: number;
  expirationDay: string;
  createdAt: string;
  updatedAt: string;
}