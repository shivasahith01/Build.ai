import React, { useState, useCallback, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { fetchAccountGrowthData, fetchFinancialChartData } from 'src/services/businessService';
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
import useFetchData from '../../services/useFetchData';

interface LabelValue {
  label: string;
  value: number;
  total?: number;
  month?: string;
  category?: string;
  type?: string;
}

const topAccounts = [
  {
    name: 'TechCorp Solutions',
    segment: 'Enterprise',
    revenue: '$125,000',
    growth: '+15.2%',
    status: 'Growing',
  },
  {
    name: 'Global Manufacturing',
    segment: 'Enterprise',
    revenue: '$98,000',
    growth: '-2.1%',
    status: 'Declining',
  },
  {
    name: 'StartupXYZ',
    segment: 'SMB',
    revenue: '$45,000',
    growth: '+28.5%',
    status: 'Growing',
  },
  {
    name: 'RetailChain Inc',
    segment: 'Mid-Market',
    revenue: '$87,000',
    growth: '+8.3%',
    status: 'Growing',
  },
  {
    name: 'Healthcare Plus',
    segment: 'Enterprise',
    revenue: '$112,000',
    growth: '+0.5%',
    status: 'Stable',
  },
  {
    name: 'FinanceFirst',
    segment: 'Mid-Market',
    revenue: '$76,000',
    growth: '+12.1%',
    status: 'Growing',
  },
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
  { label: 'Active Accounts', value: '1,247', change: '+4.2%', changeColor: 'success.main' },
  { label: 'CoGS per Account (Avg)', value: '$189', change: '-2.8%', changeColor: 'success.main' },
  { label: 'OPEX per Account (Avg)', value: '$78', change: '+1.5%', changeColor: 'error.main' },
];

const totalOutstanding = '$500,000';
const avgDaysToPayment = 28;

export const BusinessOverviewComponent = () => {
  // State management
  const [financialData, setFinancialData] = useState<LabelValue[]>([]);
  const [accountGrowthData, setAccountGrowthData] = useState<LabelValue[]>([]);
  const [financialLoading, setFinancialLoading] = useState(true);
  const [accountGrowthLoading, setAccountGrowthLoading] = useState(true);
  const [financialError, setFinancialError] = useState<string | null>(null);
  const [accountGrowthError, setAccountGrowthError] = useState<string | null>(null);

  // Memoized fetch functions
  const fetchFinancialDataMemo = useCallback(() => fetchFinancialChartData(), []);
  const fetchAccountGrowthDataMemo = useCallback(() => fetchAccountGrowthData(), []);

  // Use the custom hook for financial data
  useFetchData(
      fetchFinancialDataMemo,
      setFinancialData,
      setFinancialLoading,
      setFinancialError,
      'Financial'
  );

  // Use the custom hook for account growth data
  useFetchData(
      fetchAccountGrowthDataMemo,
      setAccountGrowthData,
      setAccountGrowthLoading,
      setAccountGrowthError,
      'Account Growth'
  );

  // Transform LabelValue data to chart format
  const transformedFinancialData = useMemo(() => {
    const months = [...new Set(financialData.map(item => item.month))].filter(Boolean);
    return months.map(month => {
      const monthData = financialData.filter(item => item.month === month);
      return {
        month,
        revenue: monthData.find(item => item.category === 'revenue')?.value || 0,
        grossProfit: monthData.find(item => item.category === 'grossProfit')?.value || 0,
        netProfit: monthData.find(item => item.category === 'netProfit')?.value || 0,
        opex: monthData.find(item => item.category === 'opex')?.value || 0,
        cogs: monthData.find(item => item.category === 'cogs')?.value || 0,
      };
    });
  }, [financialData]);

  const transformedAccountGrowthData = useMemo(() => {
    const months = [...new Set(accountGrowthData.map(item => item.month))].filter(Boolean);
    return months.map(month => {
      const monthData = accountGrowthData.filter(item => item.month === month);
      return {
        month,
        newAccounts: monthData.find(item => item.category === 'newAccounts')?.value || 0,
        lostAccounts: monthData.find(item => item.category === 'lostAccounts')?.value || 0,
        netGrowth: monthData.find(item => item.category === 'netGrowth')?.value || 0,
      };
    });
  }, [accountGrowthData]);

  return (
      <Grid sx={{ padding: 3, backgroundColor: '#f5f5f5' }}>
        {/* Debug Info - Remove in production */}
        {process.env.NODE_ENV === 'development' && (
            <Box sx={{ mt: 2, p: 2, backgroundColor: '#f0f0f0', mb: 2 }}>
              <Typography variant="h6">Debug Info:</Typography>
              <Typography variant="body2">Financial Data Count: {financialData.length}</Typography>
              <Typography variant="body2">Account Growth Data Count: {accountGrowthData.length}</Typography>
              <Typography variant="body2">Transformed Financial Data:</Typography>
              <pre style={{ fontSize: '12px', overflow: 'auto' }}>
            {JSON.stringify(transformedFinancialData, null, 2)}
          </pre>
              <Typography variant="body2">Transformed Account Growth Data:</Typography>
              <pre style={{ fontSize: '12px', overflow: 'auto' }}>
            {JSON.stringify(transformedAccountGrowthData, null, 2)}
          </pre>
            </Box>
        )}

        {/* KPI Summary Cards */}
        <Grid container spacing={3}>
          {[
            { title: 'Gross Profit (YTD)', value: '$2.08M', change: '+12.5%' },
            { title: 'Net Profit (YTD)', value: '$982K', change: '+8.3%' },
            { title: 'Revenue (YTD)', value: '$3.33M', change: '+15.2%' },
            { title: 'Total OPEX (YTD)', value: '$561K', change: '-3.1%' },
          ].map((item, index) => (
              <Grid xs={12} sm={6} md={3} key={index}>
                <Box
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: 2,
                      boxShadow: 1,
                      p: 2,
                      textAlign: 'center',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                >
                  <Typography variant="h5" fontWeight={700}>
                    {item.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {item.change} vs last year
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mt: 1, fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                </Box>
              </Grid>
          ))}
        </Grid>

        {/* Financial Trends & Goals */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3 }}>
          <Box
              sx={{
                flex: '2 1 600px',
                backgroundColor: '#fff',
                borderRadius: 2,
                boxShadow: 1,
                p: 2,
                minWidth: 300,
              }}
          >
            <Typography variant="h6" gutterBottom>
              Financial Performance Trends
            </Typography>
            {financialLoading ? (
                <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography>Loading financial data...</Typography>
                </Box>
            ) : financialError ? (
                <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography color="error">Error: {financialError}</Typography>
                </Box>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={transformedFinancialData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#1e88e5" strokeWidth={2} dot name="Revenue" />
                    <Line type="monotone" dataKey="grossProfit" stroke="#43a047" strokeWidth={2} dot name="Gross Profit" />
                    <Line type="monotone" dataKey="netProfit" stroke="#e53935" strokeWidth={2} dot name="Net Profit" />
                    <Line type="monotone" dataKey="opex" stroke="#fb8c00" strokeWidth={2} dot name="OPEX" />
                    <Line type="monotone" dataKey="cogs" stroke="#8e24aa" strokeWidth={2} dot name="CoGS" />
                  </LineChart>
                </ResponsiveContainer>
            )}
          </Box>

          <Box
              sx={{
                flex: '1 1 300px',
                backgroundColor: '#fff',
                borderRadius: 2,
                boxShadow: 1,
                p: 2,
                minWidth: 250,
              }}
          >
            <Typography variant="h6" gutterBottom>
              YTD Performance vs Goals
            </Typography>
            {[
              { label: 'YTD Net Profit', value: '$982,000 / $1,200,000', percent: 81.8 },
              { label: 'Revenue Growth', value: '15.2% / 20%', percent: 76.0 },
              { label: 'Customer Retention', value: '94.3% / 95%', percent: 99.3 },
              { label: 'Cost Reduction', value: '8.5% / 12%', percent: 70.8 },
            ].map((goal, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="body2" fontWeight={500}>
                    {goal.label}: {goal.value}
                  </Typography>
                  <Box sx={{ backgroundColor: '#e0e0e0', height: 8, borderRadius: 4, mt: 0.5 }}>
                    <Box
                        sx={{
                          width: `${goal.percent}%`,
                          height: '100%',
                          backgroundColor: '#1a237e',
                          borderRadius: 4,
                        }}
                    />
                  </Box>
                  <Typography variant="caption">{goal.percent}% of target</Typography>
                </Box>
            ))}
          </Box>
        </Box>

        {/* Account Growth and SIM Orders */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid xs={12} md={6}>
            <Box sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 1, p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Account Growth/Decline
              </Typography>
              {accountGrowthLoading ? (
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography>Loading account growth data...</Typography>
                  </Box>
              ) : accountGrowthError ? (
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="error">Error: {accountGrowthError}</Typography>
                  </Box>
              ) : transformedAccountGrowthData.length === 0 ? (
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="warning.main">No account growth data available</Typography>
                  </Box>
              ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={transformedAccountGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="newAccounts" fill="#4caf50" name="New Accounts" />
                      <Bar dataKey="lostAccounts" fill="#f44336" name="Lost Accounts" />
                      <Bar dataKey="netGrowth" fill="#2196f3" name="Net Growth" />
                    </BarChart>
                  </ResponsiveContainer>
              )}
            </Box>
          </Grid>

          <Grid xs={12} md={6}>
            <Box sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 1, p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                SIM Order & Usage Trends
              </Typography>
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
                  <Area type="monotone" dataKey="simOrders" stroke="#8884d8" fillOpacity={1} fill="url(#colorSim)" name="SIM Orders" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>

        {/* Accounts Receivable Aging + Summary KPIs */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid xs={12} md={6}>
            <Box sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 1, p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Accounts Receivable Aging
              </Typography>
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
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Typography sx={{ mt: 1 }}>
                <strong>Average Days to Payment:</strong>{' '}
                <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  {avgDaysToPayment} days
                </Box>
              </Typography>
              <Typography>
                <strong>Total Outstanding:</strong>{' '}
                <Box component="span" sx={{ fontWeight: 600 }}>{totalOutstanding}</Box>
              </Typography>
            </Box>
          </Grid>

          <Grid xs={12} md={6}>
            <Grid container spacing={2}>
              {summaryKPIs.map((kpi, index) => (
                  <Grid xs={12} sm={4} key={index}>
                    <Box
                        sx={{
                          backgroundColor: '#fff',
                          borderRadius: 2,
                          boxShadow: 1,
                          p: 2,
                          height: '100%',
                          textAlign: 'center',
                        }}
                    >
                      <Typography variant="h5" fontWeight={700}>
                        {kpi.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: kpi.changeColor }}>
                        {kpi.change} vs last month
                      </Typography>
                      <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
                        {kpi.label}
                      </Typography>
                    </Box>
                  </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 1, p: 2, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Top Accounts by Segment
          </Typography>
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
                    <Box
                        sx={{
                          display: 'inline-block',
                          px: 1.2,
                          py: 0.4,
                          backgroundColor:
                              row.segment === 'Enterprise' ? '#e3f2fd' :
                                  row.segment === 'SMB' ? '#e8f5e9' :
                                      '#ede7f6',
                          borderRadius: '999px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                    >
                      {row.segment}
                    </Box>
                  </td>
                  <td style={{ padding: '12px' }}>{row.revenue}</td>
                  <td style={{ padding: '12px', color: row.growth.startsWith('-') ? '#e53935' : '#43a047' }}>
                    {row.growth}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Box
                        sx={{
                          display: 'inline-block',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '999px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor:
                              row.status === 'Growing' ? '#c8e6c9' :
                                  row.status === 'Declining' ? '#ffcdd2' :
                                      '#fff9c4',
                        }}
                    >
                      {row.status}
                    </Box>
                  </td>
                </tr>
            ))}
            </tbody>
          </Box>
        </Box>
      </Grid>
  );
};
