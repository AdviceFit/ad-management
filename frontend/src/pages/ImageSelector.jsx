import React from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
// import { Grid } from "@mui/material/Grid";
import { Controller } from "react-hook-form";

const ImageSelector = ({ control, errors }) => {
  if (!control) return null;

  // Images data
  const images = [
    { id: "image1", src: "../ad-logo.png", alt: "Image 1" },
    { id: "image2", src: "../ad-logo.png", alt: "Image 2" },
    { id: "image3", src: "../ad-logo.png", alt: "Image 3" },
  ];

  console.log(errors);

  const onSubmit = (data) => {
    console.log("Selected template URL:", data.templateUrl);
  };

  return (
    <Box>
      <Typography variant="h6">Select a Template</Typography>
      <Controller
        name="templateUrl"
        control={control}
        render={({ field }) => (
          <Grid container spacing={2} justifyContent="center">
            {images.map((image) => (
              <Grid item xs={4} key={image.id}>
                <Box
                  sx={{
                    border: "2px solid",
                    borderColor:
                      field.value === image.id ? "primary.main" : "grey.400",
                    padding: 1,
                    cursor: "pointer",
                    "&:hover": { opacity: 0.8 },
                  }}
                  onClick={() => field.onChange(image.id)}
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
