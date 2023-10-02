import { Op } from 'sequelize'
import { IInviteRepository } from "../../../../shared/interfaces/repositories/IInviteRepository";
import { IInvite } from "../../../../shared/interfaces/schemas/IInvite";
import { Invite } from "../entities/invite.schema";

export default class InviteRepository implements IInviteRepository {
  public async send(userId: number, companyId: number, senderId: number): Promise<void> {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 3);
  
    const expirationDay = new Date(expirationDate.getFullYear(), expirationDate.getMonth(), expirationDate.getDate());
  
    await Invite.create({
      userId,
      companyId,
      senderId,
      status: "waiting",
      expirationDay,
    });
  
    return;
  };

  public async unexpiredInvites(userId: number): Promise<IInvite[] | []> {
    const invites = await Invite.findAll({ where: { userId: userId, expirationDay: { [Op.gte]: new Date() }, status: "waiting" } });

    return invites as unknown as IInvite[];
  }

  public async expiredInvites(userId: number): Promise<IInvite[] | []> {
    const invites = await Invite.findAll({ where: { userId: userId, expirationDay: { [Op.lt]: new Date() }, status: "waiting" } });

    return invites as unknown as IInvite[];
  }

  public async accept(inviteId: number): Promise<void> {
    await Invite.update({ status: "accepted" }, { where: { id: inviteId } });

    return;
  };

  public async reject(inviteId: number): Promise<void> {
    await Invite.update({ status: "rejected" }, { where: { id: inviteId } });

    return;
  };

  public async findByUserIdAndCompanyId(userId: number, companyId: number): Promise<IInvite | undefined> {
    const invite = await Invite.findOne({ where: { userId: userId, companyId: companyId } });

    return invite as unknown as IInvite;
  };

  public async findById(inviteId: number): Promise<IInvite | undefined> {
    const invite = await Invite.findOne({ where: { id: inviteId } });

    return invite as unknown as IInvite;
  }

}
