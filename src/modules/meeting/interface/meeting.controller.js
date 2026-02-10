const meetingService = require('../service/meeting.service');

exports.handleCreateMeeting = async (req, res) => {
  try {
    const meeting = await meetingService.createMeeting(req.body);
    return res.status(201).json(meeting);
  } catch (error) {
    if (error.message.includes('CONFLICT')) {
      return res.status(400).json({ message: 'Time slot already booked' });
    }
    return res.status(400).json({ message: error.message });
  }
};

exports.handleGetMeetings = async (req, res) => {
  try {
    const meetings = await meetingService.listMeetings(req.query);
    return res.status(200).json(meetings);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.handleGetMeetingById = async (req, res) => {
  try {
    const meeting = await meetingService.getMeetingById(req.params.id);
    return res.status(200).json(meeting);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.handleUpdateMeeting = async (req, res) => {
  try {
    const updated = await meetingService.updateMeeting(req.params.id, req.body);
    return res.status(200).json(updated);
  } catch (error) {
    if (error.message.includes('CONFLICT')) {
      return res.status(400).json({ message: 'Time slot already booked' });
    }
    if (error.message.includes('NOT_FOUND')) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    return res.status(400).json({ message: error.message });
  }
};

exports.handleDeleteMeeting = async (req, res) => {
  try {
    await meetingService.deleteMeeting(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
