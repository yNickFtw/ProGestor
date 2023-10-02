import { IInvite } from "../schemas/IInvite";

export interface IInviteRepository {
  send: (userId: number, companyId: number, senderId: number) => Promise<void>;
  accept: (inviteId: number) => Promise<void>;
  reject: (inviteId: number) => Promise<void>;
  findByUserIdAndCompanyId: (userId: number, companyId: number) => Promise<IInvite | undefined>;
  findById: (inviteId: number) => Promise<IInvite | undefined>;
  unexpiredInvites: (userId: number) => Promise<IInvite[] | []>;
  expiredInvites: (userId: number) => Promise<IInvite[] | []>;
}
