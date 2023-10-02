export interface ISendInviteUseCase {
  execute: (loggedUserId: number, companyId: number, userId: number) => Promise<void>;
}