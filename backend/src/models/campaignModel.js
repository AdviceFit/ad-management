const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    goal: {
        type: String,
        enum: ['Sales Growth', 'Lead Generation', 'Brand Awareness', 'App Installations', 'Custom'],
        required: true
    },
    customGoal: { type: String },
    kpis: [{ type: String }],
    
    budget: {
        total: { type: Number, required: true },
        dailyCap: { type: Number, required: true },
        duration: { type: Number, required: true } // in days
    },
    
    audience: {
        demographics: {
            ageRange: { type: [Number] },
            gender: { type: String, enum: ['Male', 'Female', 'All'] },
            location: { type: String },
            language: { type: String }
        },
        interests: [{ type: String }],
        lookalike: { type: Boolean, default: false },
        retargeting: { type: Boolean, default: false }
    },
    
    productDetails: {
        name: { type: String },
        description: { type: String },
        promoDetails: { type: String },
        landingPageURL: { type: String }
    },
    
    aiContent: {
        adCopy: {
            headlines: [{ type: String }],
            descriptions: [{ type: String }],
            ctas: [{ type: String }]
        },
        visuals: [{
            url: { type: String },
            platform: { type: String }
        }]
    },
    
    deployment: {
        platformAllocation: {
            meta: { type: Number, default: 0 },
            tiktok: { type: Number, default: 0 },
            google: { type: Number, default: 0 },
            linkedin: { type: Number, default: 0 }
        },
        status: { type: String, enum: ['Draft', 'Live', 'Paused', 'Completed'], default: 'Draft' }
    },
    
    performanceMetrics: {
        ctr: { type: Number, default: 0 },
        roas: { type: Number, default: 0 },
        cpc: { type: Number, default: 0 },
        conversions: { type: Number, default: 0 }
    },
    
    aBTesting: {
        variants: [{
            headline: { type: String },
            visualUrl: { type: String },
            cta: { type: String },
            performance: {
                ctr: { type: Number },
                conversions: { type: Number }
            }
        }]
    },
    
    optimization: {
        budgetReallocation: [{
            platform: { type: String },
            previousAllocation: { type: Number },
            newAllocation: { type: Number }
        }],
        bestPerformingCreative: {
            headline: { type: String },
            visualUrl: { type: String },
            cta: { type: String }
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
