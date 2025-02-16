import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Dashboard-old.css';

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    goal: "Sales Growth",
    customGoal: "",
    kpis: [],
    budget: {
      total: 0,
      dailyCap: 0,
      duration: 0,
    },
    audience: {
      demographics: {
        ageRange: [],
        gender: "All",
        location: "",
        language: "",
      },
      interests: [],
      lookalike: false,
      retargeting: false,
    },
    productDetails: {
      name: "",
      description: "",
      promoDetails: "",
      landingPageURL: "",
    },
    aiContent: {
      adCopy: {
        headlines: [],
        descriptions: [],
        ctas: [],
      },
      visuals: [],
    },
    deployment: {
      platformAllocation: {
        meta: 0,
        tiktok: 0,
        google: 0,
        linkedin: 0,
      },
      status: "Draft",
    },
    performanceMetrics: {
      ctr: 0,
      roas: 0,
      cpc: 0,
      conversions: 0,
    },
    aBTesting: {
      variants: [],
    },
    optimization: {
      budgetReallocation: [],
      bestPerformingCreative: {
        headline: "",
        visualUrl: "",
        cta: "",
      },
    },
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/campaigns");
      setCampaigns(response.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split('.');

    setNewCampaign(prevCampaign => {
      let updatedCampaign = { ...prevCampaign };
      let currentLevel = updatedCampaign;

      for (let i = 0; i < nameParts.length - 1; i++) {
        currentLevel = currentLevel[nameParts[i]];
      }
      currentLevel[nameParts[nameParts.length - 1]] = value;
      return updatedCampaign;
    });
  };

  const handleArrayInputChange = (e) => {
    const { name, value } = e.target;
    setNewCampaign((prevCampaign) => ({
      ...prevCampaign,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e, close) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/campaigns", newCampaign);
      fetchCampaigns();
      close();
      setNewCampaign({
        name: "",
        goal: "Sales Growth",
        customGoal: "",
        kpis: [],
        budget: {
          total: 0,
          dailyCap: 0,
          duration: 0,
        },
        audience: {
          demographics: {
            ageRange: [],
            gender: "All",
            location: "",
            language: "",
          },
          interests: [],
          lookalike: false,
          retargeting: false,
        },
        productDetails: {
          name: "",
          description: "",
          promoDetails: "",
          landingPageURL: "",
        },
        aiContent: {
          adCopy: {
            headlines: [],
            descriptions: [],
            ctas: [],
          },
          visuals: [],
        },
        deployment: {
          platformAllocation: {
            meta: 0,
            tiktok: 0,
            google: 0,
            linkedin: 0,
          },
          status: "Draft",
        },
        performanceMetrics: {
          ctr: 0,
          roas: 0,
          cpc: 0,
          conversions: 0,
        },
        aBTesting: {
          variants: [],
        },
        optimization: {
          budgetReallocation: [],
          bestPerformingCreative: {
            headline: "",
            visualUrl: "",
            cta: "",
          },
        },
      });
      alert("Campaign created successfully!");
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Failed to create campaign.");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <Popup
        trigger={<button className="create-campaign-button">Create Campaign</button>}
        modal
        closeOnDocumentClick
      >
        {close => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <h3 className="modal-header">Create New Campaign</h3>
            <div className="modal-content">
              <form className="campaign-form" onSubmit={(e) => handleSubmit(e, close)}>

                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newCampaign.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="goal">Goal:</label>
                  <select
                    id="goal"
                    name="goal"
                    value={newCampaign.goal}
                    onChange={handleInputChange}
                  >
                    <option value="Sales Growth">Sales Growth</option>
                    <option value="Lead Generation">Lead Generation</option>
                    <option value="Brand Awareness">Brand Awareness</option>
                    <option value="App Installations">App Installations</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>

                {newCampaign.goal === "Custom" && (
                  <div className="form-group">
                    <label htmlFor="customGoal">Custom Goal:</label>
                    <input
                      type="text"
                      id="customGoal"
                      name="customGoal"
                      value={newCampaign.customGoal}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="kpis">KPIs (comma-separated):</label>
                  <input
                    type="text"
                    id="kpis"
                    name="kpis"
                    value={newCampaign.kpis}
                    onChange={handleArrayInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="totalBudget">Total Budget:</label>
                  <input
                    type="number"
                    id="totalBudget"
                    name="budget.total"
                    value={newCampaign.budget.total}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dailyCap">Daily Cap:</label>
                  <input
                    type="number"
                    id="dailyCap"
                    name="budget.dailyCap"
                    value={newCampaign.budget.dailyCap}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="duration">Duration (days):</label>
                  <input
                    type="number"
                    id="duration"
                    name="budget.duration"
                    value={newCampaign.budget.duration}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="ageRange">Age Range (comma-separated):</label>
                  <input
                    type="text"
                    id="ageRange"
                    name="audience.demographics.ageRange"
                    value={newCampaign.audience.demographics.ageRange}
                    onChange={handleArrayInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender:</label>
                  <select
                    id="gender"
                    name="audience.demographics.gender"
                    value={newCampaign.audience.demographics.gender}
                    onChange={handleInputChange}
                  >
                    <option value="All">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location:</label>
                  <input
                    type="text"
                    id="location"
                    name="audience.demographics.location"
                    value={newCampaign.audience.demographics.location}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="language">Language:</label>
                  <input
                    type="text"
                    id="language"
                    name="audience.demographics.language"
                    value={newCampaign.audience.demographics.language}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="interests">Interests (comma-separated):</label>
                  <input
                    type="text"
                    id="interests"
                    name="audience.interests"
                    value={newCampaign.audience.interests}
                    onChange={handleArrayInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="productName">Product Name:</label>
                  <input
                    type="text"
                    id="productName"
                    name="productDetails.name"
                    value={newCampaign.productDetails.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="productDescription">Product Description:</label>
                  <textarea
                    id="productDescription"
                    name="productDetails.description"
                    value={newCampaign.productDetails.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="promoDetails">Promo Details:</label>
                  <input
                    type="text"
                    id="promoDetails"
                    name="productDetails.promoDetails"
                    value={newCampaign.productDetails.promoDetails}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="landingPageURL">Landing Page URL:</label>
                  <input
                    type="text"
                    id="landingPageURL"
                    name="productDetails.landingPageURL"
                    value={newCampaign.productDetails.landingPageURL}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="metaAllocation">Meta Allocation:</label>
                  <input
                    type="number"
                    id="metaAllocation"
                    name="deployment.platformAllocation.meta"
                    value={newCampaign.deployment.platformAllocation.meta}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tiktokAllocation">TikTok Allocation:</label>
                  <input
                    type="number"
                    id="tiktokAllocation"
                    name="deployment.platformAllocation.tiktok"
                    value={newCampaign.deployment.platformAllocation.tiktok}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="googleAllocation">Google Allocation:</label>
                  <input
                    type="number"
                    id="googleAllocation"
                    name="deployment.platformAllocation.google"
                    value={newCampaign.deployment.platformAllocation.google}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="linkedinAllocation">LinkedIn Allocation:</label>
                  <input
                    type="number"
                    id="linkedinAllocation"
                    name="deployment.platformAllocation.linkedin"
                    value={newCampaign.deployment.platformAllocation.linkedin}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-button">Create</button>
                  <button type="button" className="cancel-button" onClick={close}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Popup>

      <LineChart width={600} height={300} data={campaigns}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" />
        <Line type="monotone" dataKey="budget.total" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Dashboard;


