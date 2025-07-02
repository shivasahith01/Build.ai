import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const kpiData = [
  {
    title: 'Payment Performance Score',
    value: '87.3',
    change: '+2.1%',
    description: 'vs last month',
    color: 'green',
    up: true,
  },
  {
    title: 'Churn Risk Score',
    value: '12.4%',
    change: '-1.8%',
    description: 'vs last month',
    color: 'green',
    up: false,
  },
  {
    title: 'Avg Revenue per SIM',
    value: '$49.20',
    change: '+4.2%',
    description: 'vs last month',
    color: 'green',
    up: true,
  },
  {
    title: 'Dispute Resolution Time',
    value: '2.4 days',
    change: '-0.3%',
    description: 'vs last month',
    color: 'green',
    up: false,
  },
];

const revenueTrendData = [
  { month: 'Jan', revenue: 45 },
  { month: 'Feb', revenue: 47 },
  { month: 'Mar', revenue: 43 },
  { month: 'Apr', revenue: 49 },
  { month: 'May', revenue: 48 },
  { month: 'Jun', revenue: 55 },
];

const profitabilityData = [
  { segment: 'Mid-Market', score: 95 },
  { segment: 'SMB', score: 78 },
  { segment: 'Startup', score: 62 },
];

const MetricsDashboard = () => (
  <Box sx={{ p: 3, backgroundColor: '#f9fafb' }}>
    <Grid container spacing={2}>
      {kpiData.map((kpi, idx) => (
        <Grid item xs={12} sm={6} md={3} key={idx}>
          <Box
            sx={{
              backgroundColor: '#fff',
              borderRadius: 2,
              p: 2,
              boxShadow: 1,
              transition: 'box-shadow 0.1s ease-in-out',
              '&:hover': { boxShadow: 6, }
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              {kpi.title}
            </Typography>
            <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5 }}>
              {kpi.value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              {kpi.up ? (
                <ArrowUpwardIcon fontSize="small" sx={{ color: kpi.color, mr: 0.5 }} />
              ) : (
                <ArrowDownwardIcon fontSize="small" sx={{ color: kpi.color, mr: 0.5 }} />
              )}
              <Typography variant="body2" sx={{ color: kpi.color }}>
                {kpi.change}
              </Typography>
              <Typography variant="body2" sx={{ ml: 0.5 }} color="text.secondary">
                {kpi.description}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>

    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12} md={6}>
        <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            Revenue per SIM/User Trend
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#3f51b5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            Customer Profitability Score by Segment
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={profitabilityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="segment" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#4caf50" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
    </Grid>

    {/* NEW SECTION: Image content cards */}
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {/* Discount & Credit Utilization */}
      <Grid item xs={12} md={4}>
        <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="subtitle1" gutterBottom>Discount & Credit Utilization</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>Credit Utilization</Typography>
          <Box sx={{ backgroundColor: '#e0e0e0', borderRadius: 1, height: 10 }}>
            <Box sx={{ width: '73%', backgroundColor: '#000', height: '100%', borderRadius: 1 }} />
          </Box>
          <Typography variant="body2" sx={{ mt: 1 }}>Discount Usage</Typography>
          <Box sx={{ backgroundColor: '#e0e0e0', borderRadius: 1, height: 10 }}>
            <Box sx={{ width: '45%', backgroundColor: '#000', height: '100%', borderRadius: 1 }} />
          </Box>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Avg Discount Rate: <Box component="span" fontWeight={700} color="primary.main">8.5%</Box>
          </Typography>
        </Box>
      </Grid>

      {/* Discount Sensitivity Analysis */}
      <Grid item xs={12} md={4}>
        <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="subtitle1" gutterBottom>Discount Sensitivity Analysis</Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'red' }}>High Sensitivity - 28%</Typography>
          <Typography variant="body2" sx={{ mt: 1, color: '#ffa000' }}>Medium Sensitivity - 45%</Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'green' }}>Low Sensitivity - 27%</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Optimal Discount Rate: <Box component="span" fontWeight={700} color="primary.main">6.2%</Box>
          </Typography>
        </Box>
      </Grid>

      {/* Revenue Forecast per Account */}
      <Grid item xs={12} md={4}>
        <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="subtitle1" gutterBottom>Revenue Forecast per Account</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Q3 2024 Forecast: <Box component="span" fontWeight={700} color="primary.main">$890K</Box>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Q4 2024 Forecast: <Box component="span" fontWeight={700} color="primary.main">$920K</Box>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            YoY Growth Forecast: <Box component="span" fontWeight={700} color="green">+18.5%</Box>
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Confidence Level: <Box component="span" fontWeight={700} color="green">94%</Box>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default MetricsDashboard;
