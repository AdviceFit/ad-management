const campaignService = require('../services/campaignService'); // Import the service

// Create a new campaign
const createCampaign = async (req, res) => {
    try {
        const campaign = await campaignService.createCampaign(req.body);
        res.status(201).json(campaign);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all campaigns
const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await campaignService.getAllCampaigns();
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get campaign by ID
const getCampaignById = async (req, res) => {
    try {
        const campaign = await campaignService.getCampaignById(req.params.id);
        res.status(200).json(campaign);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Update a campaign
const updateCampaign = async (req, res) => {
    try {
        const campaign = await campaignService.updateCampaign(req.params.id, req.body);
        res.status(200).json(campaign);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a campaign
const deleteCampaign = async (req, res) => {
    try {
        const campaign = await campaignService.deleteCampaign(req.params.id);
        res.status(200).json({ message: 'Campaign deleted successfully', campaign });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign
};
