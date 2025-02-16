import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const Campaigns = () => {
    const [open, setOpen] = useState(false);

    // Function to open the dialog
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    // Function to close the dialog
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body1">Campaigns</Typography>
        <Button
          type="submit"
          variant="outlined"
          sx={{
            padding: "8px",
            textTransform: "none",
          }}
          onClick={handleClickOpen}
        >
          <Typography variant="body1" color="rgb(88, 145, 243)">
            Create Campaign
          </Typography>
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Campaign</DialogTitle>
        <DialogContent  >
          {/* Form with 9 fields in a 3x3 layout */}
          <Box
            component="form"
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)", // 3 columns for the form
              gap: 2, // Space between the fields
            }}
          >
            {/* 9 Fields */}
            {[...Array(9)].map((_, index) => (
              <TextField
                key={index}
                label={`Field ${index + 1}`}
                variant="outlined"
                fullWidth
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default Campaigns;
