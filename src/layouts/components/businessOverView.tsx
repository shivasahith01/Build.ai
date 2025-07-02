import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const topAccounts = [
  { name: 'TechCorp Solutions', segment: 'Enterprise', revenue: '$125,000', growth: '+15.2%', status: 'Growing' },
  { name: 'Global Manufacturing', segment: 'Enterprise', revenue: '$98,000', growth: '-2.1%', status: 'Declining' },
  { name: 'StartupXYZ', segment: 'SMB', revenue: '$45,000', growth: '+28.5%', status: 'Growing' },
  { name: 'RetailChain Inc', segment: 'Mid-Market', revenue: '$87,000', growth: '+8.3%', status: 'Growing' },
  { name: 'Healthcare Plus', segment: 'Enterprise', revenue: '$112,000', growth: '+0.5%', status: 'Stable' },
  { name: 'FinanceFirst', segment: 'Mid-Market', revenue: '$76,000', growth: '+12.1%', status: 'Growing' },
];

const financialData = [
  { month: 'Jan', Revenue: 480000, GrossProfit: 300000, NetProfit: 135000, OPEX: 85000, CoGS: 185000 },
  { month: 'Feb', Revenue: 520000, GrossProfit: 325000, NetProfit: 145000, OPEX: 90000, CoGS: 195000 },
  { month: 'Mar', Revenue: 500000, GrossProfit: 310000, NetProfit: 140000, OPEX: 88000, CoGS: 190000 },
  { month: 'Apr', Revenue: 580000, GrossProfit: 360000, NetProfit: 160000, OPEX: 93000, CoGS: 200000 },
  { month: 'May', Revenue: 610000, GrossProfit: 375000, NetProfit: 175000, OPEX: 95000, CoGS: 210000 },
  { month: 'Jun', Revenue: 670000, GrossProfit: 420000, NetProfit: 200000, OPEX: 98000, CoGS: 225000 },
];

const accountGrowthData = [
  { month: 'Jan', newAccounts: 45, lostAccounts: 12, netGrowth: 33 },
  { month: 'Feb', newAccounts: 53, lostAccounts: 9, netGrowth: 44 },
  { month: 'Mar', newAccounts: 40, lostAccounts: 15, netGrowth: 25 },
  { month: 'Apr', newAccounts: 62, lostAccounts: 10, netGrowth: 52 },
  { month: 'May', newAccounts: 58, lostAccounts: 11, netGrowth: 47 },
  { month: 'Jun', newAccounts: 66, lostAccounts: 8, netGrowth: 58 },
];

const simOrderData = [
  { month: 'Jan', simOrders: 1280 },
  { month: 'Feb', simOrders: 1360 },
  { month: 'Mar', simOrders: 1220 },
  { month: 'Apr', simOrders: 1680 },
  { month: 'May', simOrders: 1620 },
  { month: 'Jun', simOrders: 1800 },
];

const agingData = [
  { name: 'Current (0-30 days)', value: 65, color: '#4CAF50' },
  { name: '30-60 days', value: 20, color: '#FBC02D' },
  { name: '60-90 days', value: 10, color: '#FB8C00' },
  { name: '90+ days', value: 5, color: '#E53935' },

];

const summaryKPIs = [
  {
    label: 'Active Accounts',
    value: '1,247',
    change: '+4.2%',
    changeColor: 'green',
    isPositive: true,
  },
  {
    label: 'CoGS per Account (Avg)',
    value: '$189',
    change: '-2.8%',
    changeColor: 'green',
    isPositive: true,
  },
  {
    label: 'OPEX per Account (Avg)',
    value: '$78',
    change: '+1.5%',
    changeColor: 'red',
    isPositive: false,
  },
];


const totalOutstanding = '$500,000';
const avgDaysToPayment = 28;

export const BusinessOverviewComponent = () => (
  <Grid container spacing={3} sx={{ padding: 3, backgroundColor: '#f5f5f5' }}>
    {/* KPI Summary */}
    <Grid item xs={12}>
      <Grid container spacing={3}>
        {[
          { title: 'Gross Profit (YTD)', value: '$2.08M', change: '+12.5%' },
          { title: 'Net Profit (YTD)', value: '$982K', change: '+8.3%' },
          { title: 'Revenue (YTD)', value: '$3.33M', change: '+15.2%' },
          { title: 'Total OPEX (YTD)', value: '$561K', change: '-3.1%' },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 1, p: 2, textAlign: 'center',transition: 'box-shadow 0.1s ease-in-out', '&:hover': { boxShadow: 6, }, }}>
              <Typography variant="h5" fontWeight={700}>{item.value}</Typography>
              <Typography variant="body2" color="text.secondary">{item.change} vs last year</Typography>
              <Typography variant="subtitle2" fontWeight={600}>{item.title}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Grid>

    {/* Financial Trends & Goals */}
    <Grid item xs={12}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ flex: '2 1 600px', backgroundColor: '#fff', borderRadius: 2, boxShadow: 1, p: 2 }}>
          <Typography variant="h6" gutterBottom>Financial Performance Trends</Typography>
          <Box >
            <ResponsiveContainer width="100%" height={300} >
              <LineChart
                  data={financialData}
                  margin={{ top: 10, right: 30, left: 60, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis
                    tickFormatter={(value) =>
                        value >= 1000000 ? `${value / 1000000}M` : value >= 1000 ? `${value / 1000}K` : value
                    }
                />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="Revenue" stroke="#1e88e5" />
                <Line type="monotone" dataKey="GrossProfit" stroke="#43a047" />
                <Line type="monotone" dataKey="NetProfit" stroke="#e53935" />
                <Line type="monotone" dataKey="OPEX" stroke="#fb8c00" />
                <Line type="monotone" dataKey="CoGS" stroke="#8e24aa" />
              </LineChart>
            </ResponsiveContainer>

          </Box>
        </Box>
        <Box sx={{ flex: '1 1 300px', backgroundColor: '#fff', borderRadius: 2, boxShadow: 1, p: 2 }}>
          <Typography variant="h6" gutterBottom>YTD Performance vs Goals</Typography>
          {[
            { label: 'YTD Net Profit', value: '$982,000 / $1,200,000', percent: 81.8 },
            { label: 'Revenue Growth', value: '15.2% / 20%', percent: 76.0 },
            { label: 'Customer Retention', value: '94.3% / 95%', percent: 99.3 },
            { label: 'Cost Reduction', value: '8.5% / 12%', percent: 70.8 },
          ].map((goal, i) => (
              <Box key={i} sx={{ mb: 2}}>
                <Typography variant="body2" fontWeight={500}>{goal.label}: {goal.value}</Typography>
                <Box sx={{ backgroundColor: '#e0e0e0', height: 8, borderRadius: 4, mt: 0.5 }}>
                  <Box sx={{ width: `${goal.percent}%`, height: '100%', backgroundColor: '#1a237e', borderRadius: 4 }} />
                </Box>
                <Typography variant="caption">{goal.percent}% of target</Typography>
              </Box>
          ))}
        </Box>
      </Box>
    </Grid>

    {/* Account Growth & SIM Orders */}
    <Grid item xs={12}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 1, p: 2 }}>
            <Typography variant="h6" gutterBottom>Account Growth/Decline</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={accountGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="newAccounts" fill="#4caf50" />
                <Bar dataKey="lostAccounts" fill="#f44336" />
                <Bar dataKey="netGrowth" fill="#2196f3" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 1, p: 2 }}>
            <Typography variant="h6" gutterBottom>SIM Order & Usage Trends</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={simOrderData}>
                <defs>
                  <linearGradient id="colorSim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="simOrders" stroke="#8884d8" fillOpacity={1} fill="url(#colorSim)" />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
    </Grid>

    {/* Accounts Receivable + Summary KPIs */}
    <Grid item xs={12}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 1, p: 2 }}>
            <Typography variant="h6" gutterBottom>Accounts Receivable Aging</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={agingData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {agingData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <Typography sx={{ mt: 1 }}>
              <strong>Average Days to Payment:</strong>{' '}
              <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>{avgDaysToPayment} days</Box>
            </Typography>
            <Typography>
              <strong>Total Outstanding:</strong>{' '}
              <Box component="span" sx={{ fontWeight: 600 }}>{totalOutstanding}</Box>
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {summaryKPIs.map((kpi, index) => (
              <Grid item xs={12} key={index}  >
                <Box
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    boxShadow: 1,
                    p: 1.3,
                    border: '1px solid #eee',
                    transition: 'box-shadow 0.1s ease-in-out',
                    '&:hover': { boxShadow: 6, }
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {kpi.label}
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                    {kpi.value}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {/* Optional: show up/down icon based on positive/negative */}
                    {kpi.isPositive ? (
                      <span style={{ color: kpi.changeColor }}>🔼</span>
                    ) : (
                      <span style={{ color: kpi.changeColor }}>🔽</span>
                    )}
                    <Typography variant="body2" sx={{ color: kpi.changeColor }}>
                      {kpi.change} vs last month
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>

      </Grid>
    </Grid>

    {/* Top Accounts by Segment */}
    <Grid item xs={12}>
      <Box sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 1, p: 2 }}>
        <Typography variant="h6" gutterBottom>Top Accounts by Segment</Typography>
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
          <tr>
            {['Account Name', 'Segment', 'Revenue', 'Growth', 'Status'].map((header, i) => (
              <th key={i} style={{ textAlign: 'left', padding: '10px', fontWeight: 600 }}>{header}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {topAccounts.map((row, index) => (
            <tr key={index} style={{ borderTop: '1px solid #eee' }}>
              <td style={{ padding: '12px' }}>{row.name}</td>
              <td style={{ padding: '12px' }}>
                <Box sx={{
                  display: 'inline-block',
                  px: 1.2, py: 0.4,
                  backgroundColor: row.segment === 'Enterprise' ? '#e3f2fd' : row.segment === 'SMB' ? '#e8f5e9' : '#ede7f6',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}>
                  {row.segment}
                </Box>
              </td>
              <td style={{ padding: '12px' }}>{row.revenue}</td>
              <td style={{ padding: '12px', color: row.growth.startsWith('-') ? '#e53935' : '#43a047' }}>{row.growth}</td>
              <td style={{ padding: '12px' }}>
                <Box sx={{
                  display: 'inline-block',
                  px: 1.5, py: 0.5,
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: row.status === 'Growing' ? '#c8e6c9' : row.status === 'Declining' ? '#ffcdd2' : '#fff9c4',
                }}>
                  {row.status}
                </Box>
              </td>
            </tr>
          ))}
          </tbody>
        </Box>
      </Box>
    </Grid>
  </Grid>
);
