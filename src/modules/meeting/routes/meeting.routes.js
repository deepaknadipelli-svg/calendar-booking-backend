const express = require('express');
const router = express.Router();
const meetingController = require('../interface/meeting.controller');

router.post('/', meetingController.handleCreateMeeting);
router.get('/', meetingController.handleGetMeetings);
router.get('/:id', meetingController.handleGetMeetingById);
router.put('/:id', meetingController.handleUpdateMeeting);
router.delete('/:id', meetingController.handleDeleteMeeting);

module.exports = router;
