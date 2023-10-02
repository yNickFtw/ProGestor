import { IInvite } from "../../schemas/IInvite";

export interface IFetchAllInvitesUnexpired {
  execute: (userId: number) => Promise<IInvite[] | []>;
}