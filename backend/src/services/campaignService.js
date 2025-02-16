const Campaign = require('../models/campaignModel'); // Import the Campaign model

// Create a new campaign
const createCampaign = async (campaignData) => {
    try {
        const campaign = new Campaign(campaignData);
        await campaign.save();
        return campaign;
    } catch (error) {
        throw new Error('Error creating campaign: ' + error.message);
    }
};

// Get all campaigns
const getAllCampaigns = async () => {
    try {
        const campaigns = await Campaign.find();
        return campaigns;
    } catch (error) {
        throw new Error('Error fetching campaigns: ' + error.message);
    }
};

// Get campaign by ID
const getCampaignById = async (campaignId) => {
    try {
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            throw new Error('Campaign not found');
        }
        return campaign;
    } catch (error) {
        throw new Error('Error fetching campaign: ' + error.message);
    }
};

// Update a campaign
const updateCampaign = async (campaignId, updatedData) => {
    try {
        const campaign = await Campaign.findByIdAndUpdate(campaignId, updatedData, { new: true });
        if (!campaign) {
            throw new Error('Campaign not found');
        }
        return campaign;
    } catch (error) {
        throw new Error('Error updating campaign: ' + error.message);
    }
};

// Delete a campaign
const deleteCampaign = async (campaignId) => {
    try {
        const campaign = await Campaign.findByIdAndDelete(campaignId);
        if (!campaign) {
            throw new Error('Campaign not found');
        }
        return campaign;
    } catch (error) {
        throw new Error('Error deleting campaign: ' + error.message);
    }
};

module.exports = {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign
};
