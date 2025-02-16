const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController'); // Import the controller

// Route to create a new campaign
router.post('/campaigns', campaignController.createCampaign);

// Route to get all campaigns
router.get('/campaigns', campaignController.getAllCampaigns);

// Route to get a campaign by ID
router.get('/campaigns/:id', campaignController.getCampaignById);

// Route to update a campaign by ID
router.put('/campaigns/:id', campaignController.updateCampaign);

// Route to delete a campaign by ID
router.delete('/campaigns/:id', campaignController.deleteCampaign);

module.exports = router;
