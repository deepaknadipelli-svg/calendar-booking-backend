const { Op } = require('sequelize');
const Meeting = require('../model/meeting.model');

class MeetingService {
  async checkConflict(userId, startTime, endTime, excludeId = null) {
    const conflict = await Meeting.findOne({
      where: {
        userId,
        ...(excludeId && { id: { [Op.ne]: excludeId } }),
        [Op.and]: [
          { startTime: { [Op.lt]: new Date(endTime) } },
          { endTime: { [Op.gt]: new Date(startTime) } }
        ]
      }
    });
    return !!conflict;
  }

  async createMeeting(data) {
    const { userId, startTime, endTime } = data;

    if (!userId || !startTime || !endTime) {
      throw new Error('VALIDATION_ERROR: userId, startTime and endTime are required');
    }

    if (new Date(startTime) >= new Date(endTime)) {
      throw new Error('VALIDATION_ERROR: startTime must be before endTime');
    }

    const hasConflict = await this.checkConflict(userId, startTime, endTime);
    if (hasConflict) {
      throw new Error('CONFLICT: Time slot already booked');
    }

    return await Meeting.create(data);
  }

  async listMeetings(filters) {
    const { userId, startDate, endDate } = filters;
    const whereClause = {};

    if (userId) whereClause.userId = userId;

    if (startDate || endDate) {
      whereClause.startTime = {};
      if (startDate) whereClause.startTime[Op.gte] = new Date(startDate);
      if (endDate) whereClause.startTime[Op.lte] = new Date(endDate);
    }

    return await Meeting.findAll({
      where: whereClause,
      order: [['startTime', 'ASC']]
    });
  }

  async getMeetingById(id) {
    const meeting = await Meeting.findByPk(id);
    if (!meeting) throw new Error('NOT_FOUND: Meeting not found');
    return meeting;
  }

  async updateMeeting(id, updateData) {
    const meeting = await this.getMeetingById(id);

    const finalStart = updateData.startTime || meeting.startTime;
    const finalEnd = updateData.endTime || meeting.endTime;
    const finalUser = updateData.userId || meeting.userId;

    if (new Date(finalStart) >= new Date(finalEnd)) {
      throw new Error('VALIDATION_ERROR: startTime must be before endTime');
    }

    const hasConflict = await this.checkConflict(finalUser, finalStart, finalEnd, id);
    if (hasConflict) {
      throw new Error('CONFLICT: Time slot already booked');
    }

    return await meeting.update(updateData);
  }

  async deleteMeeting(id) {
    const meeting = await this.getMeetingById(id);
    await meeting.destroy();
    return true;
  }
}

module.exports = new MeetingService();
