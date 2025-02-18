import React from "react";
import { Grid, Box, Typography } from "@mui/material";
// import { Grid } from "@mui/material/Grid";
import { Controller } from "react-hook-form";

const ImageSelector = ({ control, errors, templateUrlsResponse }) => {
  if (!control) return null;

  // Images data
  const images = templateUrlsResponse?.map((url, index) => ({
    id: `image${index + 1}`,
    src: url,
    alt: `Image ${index + 1}`,
  }));

  return (
    <Box>
      <Typography variant="h6">Select a Template</Typography>
      <Controller
        name="templateUrl"
        control={control}
        render={({ field }) => (
          <Grid container spacing={2} justifyContent="center">
            {images?.map((image) => (
              <Grid item xs={4} key={image.id}>
                <Box
                  sx={{
                    border: "2px solid",
                    borderColor:
                      field.value === image.src ? "primary.main" : "grey.400",
                    padding: 1,
                    cursor: "pointer",
                    "&:hover": { opacity: 0.8 },
                  }}
                  onClick={() => field.onChange(image.src)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      />
      {errors?.templateUrl && (
        <Typography color="error" variant="body2">
          {/* {errors.templateUrl.message} */}
          Please select a template image
        </Typography>
      )}
    </Box>
  );
};

export default ImageSelector;
