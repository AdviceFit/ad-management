import React from "react";
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
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const AddCampaign = () => {
    const schema = z.object({
        name: z.string().min(1, { message: "Name is required" }),
      
        goal: z.enum(
          ["Sales Growth", "Lead Generation", "Brand Awareness", "App Installations", "Custom"],
          { message: "Please select a valid goal" }
        ),
      
        // customGoal: z.string().min(1, { message: "Custom goal is required when 'Custom' is selected as the goal" }),
      
        kpis: z.array(z.string().min(1, { message: "Each KPI should be a non-empty string" })).min(1, { message: "At least one KPI is required" }),
      
        budget: z.object({
          total: z.string().transform(value => parseFloat(value)).refine(value => !isNaN(value) && value >= 0, { message: "Total budget cannot be less than 0" }),
          dailyCap: z.string().transform(value => parseFloat(value)).refine(value => !isNaN(value) && value >= 0, { message: "Daily cap cannot be less than 0" }),
          duration: z.string().transform(value => parseInt(value, 10)).refine(value => !isNaN(value) && value >= 1, { message: "Duration must be at least 1 day" }),
        }),
      
        audience: z.object({
          demographics: z.object({
            ageRange: z.array(z.string().min(1, { message: "Age range cannot be empty" })).min(1, { message: "Age range is required" }),
            gender: z.enum(["Male", "Female", "Other"], { message: "Please select a valid gender" }),
            location: z.string().min(1, { message: "Location is required" }),
            language: z.string().min(1, { message: "Language is required" }),
          }),
      
          interests: z.array(z.string().min(1, { message: "Each interest should be a non-empty string" })).min(1, { message: "At least one interest is required" }),
        //   lookalike: z.boolean().refine(value => value === true || value === false, { message: "Lookalike must be a boolean value" }),
        //   retargeting: z.boolean().refine(value => value === true || value === false, { message: "Retargeting must be a boolean value" }),
        }),
      
        productDetails: z.object({
          name: z.string().min(1, { message: "Product name is required" }),
          description: z.string().min(1, { message: "Product description is required" }),
          promoDetails: z.string().min(1, { message: "Promo details are required" }),
          landingPageURL: z.string().url({ message: "Invalid URL" }).min(1, { message: "Landing page URL is required" }),
        }),
      
        deployment: z.object({
          platformAllocation: z.object({
          metaAllocation: z.string().transform(value => parseFloat(value)).refine(value => !isNaN(value) && value >= 0, { message: "Meta Allocation must be a valid number and not negative" }),
          tiktokAllocation: z.string().transform(value => parseFloat(value)).refine(value => !isNaN(value) && value >= 0, { message: "TikTok Allocation must be a valid number and not negative" }),
          googleAllocation: z.string().transform(value => parseFloat(value)).refine(value => !isNaN(value) && value >= 0, { message: "Google Allocation must be a valid number and not negative" }),
          linkedinAllocation: z.string().transform(value => parseFloat(value)).refine(value => !isNaN(value) && value >= 0, { message: "LinkedIn Allocation must be a valid number and not negative" }),
            }),
        //   status: z.enum(["Draft", "Active"], { message: "Please select a valid status" }),
        }),
      });
      

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
  });
  
  console.log(errors);

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Create New Campaign
      </Typography>

      <Box sx={{ py: "16px", overflow: "auto", height: '90%' }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          {/* Grid container */}
          <Grid container spacing={2}>
            {/* Name Field */}
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

            {/* Goal Field */}
            <Grid size={{ xs: 4 }}>
              <Controller
                name="goal"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small" error={!!errors.goal}>
                    <InputLabel>Goal</InputLabel>
                    <Select {...field} label="Goal">
                      <MenuItem value="Sales Growth">Sales Growth</MenuItem>
                      <MenuItem value="Lead Generation">Lead Generation</MenuItem>
                      <MenuItem value="Brand Awareness">Brand Awareness</MenuItem>
                      <MenuItem value="App Installations">App Installations</MenuItem>
                      <MenuItem value="Custom">Custom</MenuItem>
                    </Select>
                    <FormHelperText>{errors.goal?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            {/* Custom Goal Field */}
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

            {/* KPIs Field */}
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

            {/* Total Budget Field */}
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

            {/* Daily Cap Field */}
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

            {/* Duration Field */}
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

            {/* Age Range Field */}
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
                    helperText={errors.audience?.demographics?.ageRange?.message}
                  />
                )}
              />
            </Grid>

            {/* Gender Field */}
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

            {/* Location Field */}
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
                    helperText={errors.audience?.demographics?.location?.message}
                  />
                )}
              />
            </Grid>

            {/* Language Field */}
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
                    helperText={errors.audience?.demographics?.language?.message}
                  />
                )}
              />
            </Grid>

            {/* Interests Field */}
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

            {/* Product Name Field */}
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

            {/* Product Description Field */}
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

            {/* Promo Details Field */}
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

            {/* Landing Page URL Field */}
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
          <Grid size={{ xs: 4 }}>
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
        error={!!errors.deployment?.platformAllocation?.metaAllocation}
        helperText={errors.deployment?.platformAllocation?.metaAllocation?.message}
      />
    )}
  />
</Grid>

{/* TikTok Allocation Field */}
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
        error={!!errors.deployment?.platformAllocation?.tiktokAllocation}
        helperText={errors.deployment?.platformAllocation?.tiktokAllocation?.message}
      />
    )}
  />
</Grid>

{/* Google Allocation Field */}
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
        error={!!errors.deployment?.platformAllocation?.googleAllocation}
        helperText={errors.deployment?.platformAllocation?.googleAllocation?.message}
      />
    )}
  />
</Grid>

{/* LinkedIn Allocation Field */}
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
        error={!!errors.deployment?.platformAllocation?.linkedinAllocation}
        helperText={errors.deployment?.platformAllocation?.linkedinAllocation?.message}
      />
    )}
  />
</Grid>
          </Grid>


          {/* Submit Button */}
          <Grid container justifyContent="flex-end">
            <Grid size={{ xs: 4 }}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default AddCampaign;
