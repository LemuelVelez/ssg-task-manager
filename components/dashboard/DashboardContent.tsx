"use client";

import React from "react";
import { Paper, Grid, Typography, LinearProgress } from "@mui/material";

const tasks = [
  { id: 1, title: "Organize SSG Event", status: "In Progress", progress: 50 },
  { id: 2, title: "Create Budget Report", status: "Completed", progress: 100 },
  { id: 3, title: "Update Website", status: "Overdue", progress: 30 },
];

const DashboardContent = () => {
  return (
    <div>
      {/* Task Overview Section */}
      <Typography variant="h6" gutterBottom>
        Task Overview
      </Typography>
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Paper elevation={3} className="p-4">
              <Typography variant="subtitle1">{task.title}</Typography>
              <Typography variant="body2">{task.status}</Typography>
              <LinearProgress variant="determinate" value={task.progress} />
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Pending Proof of Duty Section */}
      <Typography variant="h6" className="mt-8" gutterBottom>
        Pending Proof of Duty Approvals
      </Typography>
      {/* Example: You can map through pending duty proofs and create cards for approval */}

      {/* Pending Task Submissions Section */}
      <Typography variant="h6" className="mt-8" gutterBottom>
        Pending Task Submissions
      </Typography>
      {/* Example: You can map through pending task submissions and create cards for approval */}

      {/* Overdue Notifications Section */}
      <Typography variant="h6" className="mt-8" gutterBottom>
        Overdue Notifications
      </Typography>
      {/* Example: Show list of overdue tasks */}
    </div>
  );
};

export default DashboardContent;
