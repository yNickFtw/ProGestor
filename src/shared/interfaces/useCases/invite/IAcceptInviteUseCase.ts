export interface IAcceptInviteUseCase {
  execute: (userId: number, companyId: number, inviteId: number) => Promise<void>;
}