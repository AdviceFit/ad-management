import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Box,
  Typography,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageSelector from "./ImageSelector";
import axios from "axios";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

const AddCampaign = () => {
  const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),

    goal: z.enum(
      [
        "Sales Growth",
        "Lead Generation",
        "Brand Awareness",
        "App Installations",
        "Custom",
      ],
      { message: "Please select a valid goal" }
    ),

    // customGoal: z.string().min(1, { message: "Custom goal is required when 'Custom' is selected as the goal" }),

    kpis: z
      .array(
        z.string().min(1, { message: "Each KPI should be a non-empty string" })
      )
      .min(1, { message: "At least one KPI is required" }),

    budget: z.object({
      total: z
        .string()
        .transform((value) => parseFloat(value))
        .refine((value) => !isNaN(value) && value >= 0, {
          message: "Total budget cannot be less than 0",
        }),
      dailyCap: z
        .string()
        .transform((value) => parseFloat(value))
        .refine((value) => !isNaN(value) && value >= 0, {
          message: "Daily cap cannot be less than 0",
        }),
      duration: z
        .string()
        .transform((value) => parseInt(value, 10))
        .refine((value) => !isNaN(value) && value >= 1, {
          message: "Duration must be at least 1 day",
        }),
    }),

    audience: z.object({
      demographics: z.object({
        ageRange: z
          .array(z.string().min(1, { message: "Age range cannot be empty" }))
          .min(1, { message: "Age range is required" }),
        gender: z.enum(["Male", "Female", "Other"], {
          message: "Please select a valid gender",
        }),
        location: z.string().min(1, { message: "Location is required" }),
        language: z.string().min(1, { message: "Language is required" }),
      }),

      interests: z
        .array(
          z
            .string()
            .min(1, { message: "Each interest should be a non-empty string" })
        )
        .min(1, { message: "At least one interest is required" }),
      //   lookalike: z.boolean().refine(value => value === true || value === false, { message: "Lookalike must be a boolean value" }),
      //   retargeting: z.boolean().refine(value => value === true || value === false, { message: "Retargeting must be a boolean value" }),
    }),

    productDetails: z.object({
      name: z.string().min(1, { message: "Product name is required" }),
      description: z
        .string()
        .min(1, { message: "Product description is required" }),
      promoDetails: z
        .string()
        .min(1, { message: "Promo details are required" }),
      landingPageURL: z
        .string()
        .url({ message: "Invalid URL" })
        .min(1, { message: "Landing page URL is required" }),
    }),

    templateUrl: z.string().min(1, "Please select a template image."),

    // deployment: z.object({
    //   platformAllocation: z.object({
    //   metaAllocation: z.string().transform(value => parseFloat(value)).refine(value => !isNaN(value) && value >= 0, { message: "Meta Allocation must be a valid number and not negative" }),
    //   tiktokAllocation: z.string().transform(value => parseFloat(value)).refine(value => !isNaN(value) && value >= 0, { message: "TikTok Allocation must be a valid number and not negative" }),
    //   googleAllocation: z.string().transform(value => parseFloat(value)).refine(value => !isNaN(value) && value >= 0, { message: "Google Allocation must be a valid number and not negative" }),
    //   linkedinAllocation: z.string().transform(value => parseFloat(value)).refine(value => !isNaN(value) && value >= 0, { message: "LinkedIn Allocation must be a valid number and not negative" }),
    //     }),
    //   status: z.enum(["Draft", "Active"], { message: "Please select a valid status" }),
    // }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    trigger,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  console.log(errors);

  const navigate = useNavigate();

  const [showImageSelector, setShowImageSelector] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [templateUrlsResponse, setTemplateUrlsResponse] = useState([]);
  const [addCampaignLoading, setAddCampaignLoading] = useState(false);

  const selectedTemplate = watch("templateUrl");

  const handleTemplateCreationApi = async () => {
    const formData = getValues();

    const { productDetails } = formData;

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://44.201.129.4:8000/generate-template-sd/",
        productDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("handleTemplateCreationApi Response:", response.data);
      if (response?.data?.image_urls) {
        setTemplateUrlsResponse(response?.data?.image_urls);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("handleTemplateCreationApi Error:", error);
    }
  };

  const handleGenerateClick = async () => {
    const fieldsToValidate = [
      "productDetails.name",
      "productDetails.description",
      "productDetails.promoDetails",
      "productDetails.landingPageURL",
    ];

    const isValidForm = await trigger(fieldsToValidate);

    if (isValidForm) {
      handleTemplateCreationApi();
      setShowImageSelector(true);
    }
  };

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);

    try {
      setAddCampaignLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/campaigns",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("campaiagn data added successfully:", response.data);

      if (response?.status === 201) {
        Toast({
          message: "campaiagn created successfully.",
          variant: "success",
        });
        reset();
        navigate("/campaigns");
        setAddCampaignLoading(false);
      } else {
        setAddCampaignLoading(false);
      }
    } catch (error) {
      console.error("Error campaign saving data:", error);
      setAddCampaignLoading(false);
    }
  };

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Create New Campaign
      </Typography>

      <Box sx={{ py: "16px", overflow: "auto", height: "90%" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          {/* Grid container */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 4 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 4 }}>
              <Controller
                name="goal"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small" error={!!errors.goal}>
                    <InputLabel>Goal</InputLabel>
                    <Select {...field} label="Goal">
                      <MenuItem value="Sales Growth">Sales Growth</MenuItem>
                      <MenuItem value="Lead Generation">
                        Lead Generation
                      </MenuItem>
                      <MenuItem value="Brand Awareness">
                        Brand Awareness
                      </MenuItem>
                      <MenuItem value="App Installations">
                        App Installations
                      </MenuItem>
                      <MenuItem value="Custom">Custom</MenuItem>
                    </Select>
                    <FormHelperText>{errors.goal?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            {getValues("goal") === "Custom" && (
              <Grid size={{ xs: 4 }}>
                <Controller
                  name="customGoal"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      size="small"
                      label="Custom Goal"
                      variant="outlined"
                      fullWidth
                      {...field}
                      error={!!errors.customGoal}
                      helperText={errors.customGoal?.message}
                    />
                  )}
                />
              </Grid>
            )}

            <Grid size={{ xs: 4 }}>
              <Controller
                name="kpis"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="KPIs (comma-separated)"
                    variant="outlined"
                    fullWidth
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.split(","))}
                    error={!!errors.kpis}
                    helperText={errors.kpis?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 4 }}>
              <Controller
                name="budget.total"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Total Budget"
                    variant="outlined"
                    fullWidth
                    type="number"
                    {...field}
                    error={!!errors.budget?.total}
                    helperText={errors.budget?.total?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 4 }}>
              <Controller
                name="budget.dailyCap"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Daily Cap"
                    variant="outlined"
                    fullWidth
                    type="number"
                    {...field}
                    error={!!errors.budget?.dailyCap}
                    helperText={errors.budget?.dailyCap?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 4 }}>
              <Controller
                name="budget.duration"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Duration (days)"
                    variant="outlined"
                    fullWidth
                    type="number"
                    {...field}
                    error={!!errors.budget?.duration}
                    helperText={errors.budget?.duration?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 4 }}>
              <Controller
                name="audience.demographics.ageRange"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Age Range (comma-separated)"
                    variant="outlined"
                    fullWidth
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.split(","))}
                    error={!!errors.audience?.demographics?.ageRange}
                    helperText={
                      errors.audience?.demographics?.ageRange?.message
                    }
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 4 }}>
              <Controller
                name="audience.demographics.gender"
                control={control}
                render={({ field }) => (
                  <FormControl
                    size="small"
                    fullWidth
                    error={!!errors.audience?.demographics?.gender}
                  >
                    <InputLabel>Gender</InputLabel>
                    <Select {...field} label="Gender">
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    <FormHelperText>
                      {errors.audience?.demographics?.gender?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={{ xs: 4 }}>
              <Controller
                name="audience.demographics.location"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Location"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={!!errors.audience?.demographics?.location}
                    helperText={
                      errors.audience?.demographics?.location?.message
                    }
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 4 }}>
              <Controller
                name="audience.demographics.language"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Language"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={!!errors.audience?.demographics?.language}
                    helperText={
                      errors.audience?.demographics?.language?.message
                    }
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 4 }}>
              <Controller
                name="audience.interests"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Interests (comma-separated)"
                    variant="outlined"
                    fullWidth
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.split(","))}
                    error={!!errors.audience?.interests}
                    helperText={errors.audience?.interests?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 4 }}>
              <Controller
                name="productDetails.name"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Product Name"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={!!errors.productDetails?.name}
                    helperText={errors.productDetails?.name?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 4 }}>
              <Controller
                name="productDetails.description"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Product Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    {...field}
                    error={!!errors.productDetails?.description}
                    helperText={errors.productDetails?.description?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 4 }}>
              <Controller
                name="productDetails.promoDetails"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Promo Details"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={!!errors.productDetails?.promoDetails}
                    helperText={errors.productDetails?.promoDetails?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 4 }}>
              <Controller
                name="productDetails.landingPageURL"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Landing Page URL"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={!!errors.productDetails?.landingPageURL}
                    helperText={errors.productDetails?.landingPageURL?.message}
                  />
                )}
              />
            </Grid>
            {/* <Grid size={{ xs: 4 }}>
              <Controller
                name="deployment.platformAllocation.metaAllocation"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Meta Allocation"
                    variant="outlined"
                    fullWidth
                    type="number"
                    {...field}
                    error={
                      !!errors.deployment?.platformAllocation?.metaAllocation
                    }
                    helperText={
                      errors.deployment?.platformAllocation?.metaAllocation
                        ?.message
                    }
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 4 }}>
              <Controller
                name="deployment.platformAllocation.tiktokAllocation"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="TikTok Allocation"
                    variant="outlined"
                    fullWidth
                    type="number"
                    {...field}
                    error={
                      !!errors.deployment?.platformAllocation?.tiktokAllocation
                    }
                    helperText={
                      errors.deployment?.platformAllocation?.tiktokAllocation
                        ?.message
                    }
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 4 }}>
              <Controller
                name="deployment.platformAllocation.googleAllocation"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Google Allocation"
                    variant="outlined"
                    fullWidth
                    type="number"
                    {...field}
                    error={
                      !!errors.deployment?.platformAllocation?.googleAllocation
                    }
                    helperText={
                      errors.deployment?.platformAllocation?.googleAllocation
                        ?.message
                    }
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 4 }}>
              <Controller
                name="deployment.platformAllocation.linkedinAllocation"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="LinkedIn Allocation"
                    variant="outlined"
                    fullWidth
                    type="number"
                    {...field}
                    error={
                      !!errors.deployment?.platformAllocation
                        ?.linkedinAllocation
                    }
                    helperText={
                      errors.deployment?.platformAllocation?.linkedinAllocation
                        ?.message
                    }
                  />
                )}
              />
            </Grid> */}
          </Grid>
          {!showImageSelector && (
            <Grid container justifyContent="flex-end">
              <Grid size={{ xs: 4 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  endIcon={<ImageSearchIcon />}
                  sx={{
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={handleGenerateClick}
                >
                  Generate Template
                </Button>
              </Grid>
            </Grid>
          )}

          {isLoading && (
            <Grid container justifyContent="center">
              <Grid size={{ xs: 1 }}>
                <CircularProgress size={40} color="inherit" />
              </Grid>
            </Grid>
          )}
          {!isLoading &&
            showImageSelector &&
            templateUrlsResponse.length > 0 && (
              <Grid item xs={12}>
                <ImageSelector
                  control={control}
                  errors={errors}
                  templateUrlsResponse={templateUrlsResponse}
                />
              </Grid>
            )}

          {/* Submit Button */}
          <Grid container justifyContent="flex-end">
            <Grid size={{ xs: 4 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={!showImageSelector || isLoading}
              >
                {addCampaignLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Typography variant="body1">Create</Typography>
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default AddCampaign;
