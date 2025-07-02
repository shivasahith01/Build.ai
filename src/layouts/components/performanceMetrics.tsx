import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
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
import {
  fetchPerformanceOverviewMetrics,
  fetchRevenuePerSimTrend,
  fetchCustomerProfitabilityBySegment,
  fetchDiscountCreditUtilization,
  fetchDiscountSensitivityAnalysis,
  fetchRevenueForecastData
} from '../../services/performanceService';

// TypeScript Interfaces
interface KPIMetrics {
  payment_performance_value: number;
  payment_performance_change: number;
  payment_performance_type: string;
  churn_risk_value: string;
  churn_risk_change: number;
  churn_risk_type: string;
  avg_revenue_per_sim_value: string;
  avg_revenue_per_sim_change: number;
  avg_revenue_per_sim_type: string;
  dispute_resolution_value: string;
  dispute_resolution_change: number;
  dispute_resolution_type: string;
}

interface RevenueTrendData {
  month: string;
  revenue: number;
}

interface ProfitabilityData {
  segment: string;
  score: number;
}

interface DiscountCreditData {
  credit_utilization_percent: number;
  discount_usage_percent: number;
  avg_discount_rate: number;
}

interface DiscountSensitivityData {
  high_sensitivity_percent: number;
  medium_sensitivity_percent: number;
  low_sensitivity_percent: number;
  optimal_discount_rate: number;
}

interface RevenueForecastData {
  q3_forecast_display: string;
  q4_forecast_display: string;
  yoy_growth_display: string;
  confidence_level_display: string;
}

const MetricsDashboard = () => {
  // KPI Metrics State
  const [kpiMetrics, setKpiMetrics] = useState<KPIMetrics | null>(null);
  const [kpiLoading, setKpiLoading] = useState<boolean>(true);
  const [kpiError, setKpiError] = useState<string | null>(null);

  // Revenue Trend State
  const [revenueTrendData, setRevenueTrendData] = useState<RevenueTrendData[]>([]);
  const [revenueTrendLoading, setRevenueTrendLoading] = useState<boolean>(true);
  const [revenueTrendError, setRevenueTrendError] = useState<string | null>(null);

  // Profitability State
  const [profitabilityData, setProfitabilityData] = useState<ProfitabilityData[]>([]);
  const [profitabilityLoading, setProfitabilityLoading] = useState<boolean>(true);
  const [profitabilityError, setProfitabilityError] = useState<string | null>(null);

  // Discount Credit State
  const [discountCreditData, setDiscountCreditData] = useState<DiscountCreditData | null>(null);
  const [discountCreditLoading, setDiscountCreditLoading] = useState<boolean>(true);
  const [discountCreditError, setDiscountCreditError] = useState<string | null>(null);

  // Discount Sensitivity State
  const [discountSensitivityData, setDiscountSensitivityData] = useState<DiscountSensitivityData | null>(null);
  const [discountSensitivityLoading, setDiscountSensitivityLoading] = useState<boolean>(true);
  const [discountSensitivityError, setDiscountSensitivityError] = useState<string | null>(null);

  // Revenue Forecast State
  const [revenueForecastData, setRevenueForecastData] = useState<RevenueForecastData | null>(null);
  const [revenueForecastLoading, setRevenueForecastLoading] = useState<boolean>(true);
  const [revenueForecastError, setRevenueForecastError] = useState<string | null>(null);

  useEffect(() => {
    // Load KPI Metrics
    const loadKPIMetrics = async () => {
      try {
        setKpiLoading(true);
        const result = await fetchPerformanceOverviewMetrics();
        
        if (result.error) {
          setKpiError(result.message);
          setKpiMetrics(null);
        } else {
          setKpiMetrics(result.data[0] || null);
        }
      } catch (err) {
        console.error('Failed to load KPI metrics:', err);
        setKpiError('Failed to load KPI metrics');
        setKpiMetrics(null);
      } finally {
        setKpiLoading(false);
      }
    };

    // Load Revenue Trend Data
    const loadRevenueTrendData = async () => {
      try {
        setRevenueTrendLoading(true);
        const result = await fetchRevenuePerSimTrend();
        
        if (result.error) {
          setRevenueTrendError(result.message);
          setRevenueTrendData(result.data || []);
        } else {
          setRevenueTrendData(result.data);
        }
      } catch (err) {
        console.error('Failed to load revenue trend data:', err);
        setRevenueTrendError('Failed to load revenue trend data');
        setRevenueTrendData([]);
      } finally {
        setRevenueTrendLoading(false);
      }
    };

    // Load Profitability Data
    const loadProfitabilityData = async () => {
      try {
        setProfitabilityLoading(true);
        const result = await fetchCustomerProfitabilityBySegment();
        
        if (result.error) {
          setProfitabilityError(result.message);
          setProfitabilityData(result.data || []);
        } else {
          setProfitabilityData(result.data);
        }
      } catch (err) {
        console.error('Failed to load profitability data:', err);
        setProfitabilityError('Failed to load profitability data');
        setProfitabilityData([]);
      } finally {
        setProfitabilityLoading(false);
      }
    };

    // Load Discount Credit Data
    const loadDiscountCreditData = async () => {
      try {
        setDiscountCreditLoading(true);
        const result = await fetchDiscountCreditUtilization();
        
        if (result.error) {
          setDiscountCreditError(result.message);
          setDiscountCreditData(null);
        } else {
          setDiscountCreditData(result.data[0] || null);
        }
      } catch (err) {
        console.error('Failed to load discount credit data:', err);
        setDiscountCreditError('Failed to load discount credit data');
        setDiscountCreditData(null);
      } finally {
        setDiscountCreditLoading(false);
      }
    };

    // Load Discount Sensitivity Data
    const loadDiscountSensitivityData = async () => {
      try {
        setDiscountSensitivityLoading(true);
        const result = await fetchDiscountSensitivityAnalysis();
        
        if (result.error) {
          setDiscountSensitivityError(result.message);
          setDiscountSensitivityData(null);
        } else {
          setDiscountSensitivityData(result.data[0] || null);
        }
      } catch (err) {
        console.error('Failed to load discount sensitivity data:', err);
        setDiscountSensitivityError('Failed to load discount sensitivity data');
        setDiscountSensitivityData(null);
      } finally {
        setDiscountSensitivityLoading(false);
      }
    };

    // Load Revenue Forecast Data
    const loadRevenueForecastData = async () => {
      try {
        setRevenueForecastLoading(true);
        const result = await fetchRevenueForecastData();
        
        if (result.error) {
          setRevenueForecastError(result.message);
          setRevenueForecastData(null);
        } else {
          setRevenueForecastData(result.data[0] || null);
        }
      } catch (err) {
        console.error('Failed to load revenue forecast data:', err);
        setRevenueForecastError('Failed to load revenue forecast data');
        setRevenueForecastData(null);
      } finally {
        setRevenueForecastLoading(false);
      }
    };

    // Load all data
    loadKPIMetrics();
    loadRevenueTrendData();
    loadProfitabilityData();
    loadDiscountCreditData();
    loadDiscountSensitivityData();
    loadRevenueForecastData();
  }, []);

  // Helper function to get KPI card data
  const getKPICardData = () => {
    if (!kpiMetrics) return [];
    
    return [
      {
        title: 'Payment Performance Score',
        value: kpiMetrics.payment_performance_value.toString(),
        change: `${kpiMetrics.payment_performance_change > 0 ? '+' : ''}${kpiMetrics.payment_performance_change}%`,
        description: 'vs last month',
        color: kpiMetrics.payment_performance_type === 'positive' ? 'green' : 'red',
        up: kpiMetrics.payment_performance_type === 'positive',
      },
      {
        title: 'Churn Risk Score',
        value: kpiMetrics.churn_risk_value,
        change: `${kpiMetrics.churn_risk_change > 0 ? '+' : ''}${kpiMetrics.churn_risk_change}%`,
        description: 'vs last month',
        color: kpiMetrics.churn_risk_type === 'positive' ? 'green' : 'red',
        up: kpiMetrics.churn_risk_type === 'positive',
      },
      {
        title: 'Avg Revenue per SIM',
        value: kpiMetrics.avg_revenue_per_sim_value,
        change: `${kpiMetrics.avg_revenue_per_sim_change > 0 ? '+' : ''}${kpiMetrics.avg_revenue_per_sim_change}%`,
        description: 'vs last month',
        color: kpiMetrics.avg_revenue_per_sim_type === 'positive' ? 'green' : 'red',
        up: kpiMetrics.avg_revenue_per_sim_type === 'positive',
      },
      {
        title: 'Dispute Resolution Time',
        value: kpiMetrics.dispute_resolution_value,
        change: `${kpiMetrics.dispute_resolution_change > 0 ? '+' : ''}${kpiMetrics.dispute_resolution_change}%`,
        description: 'vs last month',
        color: kpiMetrics.dispute_resolution_type === 'positive' ? 'green' : 'red',
        up: kpiMetrics.dispute_resolution_type === 'positive',
      },
    ];
  };

  const kpiData = getKPICardData();

  return (
    <Box sx={{ p: 3, backgroundColor: '#f9fafb' }}>
      {/* KPI Cards */}
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
                '&:hover': { boxShadow: 6 },
                position: 'relative'
              }}
            >
              {kpiLoading && (
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <CircularProgress size={20} />
                </Box>
              )}
              
              <Typography variant="subtitle2" color="text.secondary">
                {kpi.title}
              </Typography>
              <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5 }}>
                {kpi.value || 'Loading...'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                {kpi.up ? (
                  <ArrowUpwardIcon fontSize="small" sx={{ color: kpi.color, mr: 0.5 }} />
                ) : (
                  <ArrowDownwardIcon fontSize="small" sx={{ color: kpi.color, mr: 0.5 }} />
                )}
                <Typography variant="body2" sx={{ color: kpi.color }}>
                  {kpi.change || 'Loading...'}
                </Typography>
                <Typography variant="body2" sx={{ ml: 0.5 }} color="text.secondary">
                  {kpi.description}
                </Typography>
              </Box>
              
              {kpiError && (
                <Typography variant="caption" color="error" sx={{ display: 'block', mt: 0.5 }}>
                  {kpiError}
                </Typography>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {/* Revenue per SIM Trend Chart */}
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              Revenue per SIM/User Trend
            </Typography>
            
            {revenueTrendError && (
              <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                {revenueTrendError}
              </Typography>
            )}

            <Box sx={{ position: 'relative' }}>
              {revenueTrendLoading && (
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1
                }}>
                  <CircularProgress />
                </Box>
              )}

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={revenueTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue per SIM']} />
                  <Line type="monotone" dataKey="revenue" stroke="#3f51b5" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Grid>

        {/* Customer Profitability Chart */}
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              Customer Profitability Score by Segment
            </Typography>
            
            {profitabilityError && (
              <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                {profitabilityError}
              </Typography>
            )}

            <Box sx={{ position: 'relative' }}>
              {profitabilityLoading && (
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1
                }}>
                  <CircularProgress />
                </Box>
              )}

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
          </Box>
        </Grid>
      </Grid>

      {/* Bottom Cards Row */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {/* Discount & Credit Utilization */}
        <Grid item xs={12} md={4}>
          <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="subtitle1" gutterBottom>Discount & Credit Utilization</Typography>
            
            {discountCreditError && (
              <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                {discountCreditError}
              </Typography>
            )}

            <Box sx={{ position: 'relative' }}>
              {discountCreditLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                  <CircularProgress size={30} />
                </Box>
              )}

              <Typography variant="body2" sx={{ mt: 1 }}>Credit Utilization</Typography>
              <Box sx={{ backgroundColor: '#e0e0e0', borderRadius: 1, height: 10 }}>
                <Box sx={{ 
                  width: `${discountCreditData?.credit_utilization_percent || 0}%`, 
                  backgroundColor: '#000', 
                  height: '100%', 
                  borderRadius: 1 
                }} />
              </Box>
              <Typography variant="caption" color="text.secondary">
                {discountCreditData?.credit_utilization_percent || 0}%
              </Typography>

              <Typography variant="body2" sx={{ mt: 1 }}>Discount Usage</Typography>
              <Box sx={{ backgroundColor: '#e0e0e0', borderRadius: 1, height: 10 }}>
                <Box sx={{ 
                  width: `${discountCreditData?.discount_usage_percent || 0}%`, 
                  backgroundColor: '#000', 
                  height: '100%', 
                  borderRadius: 1 
                }} />
              </Box>
              <Typography variant="caption" color="text.secondary">
                {discountCreditData?.discount_usage_percent || 0}%
              </Typography>

              <Typography variant="h6" sx={{ mt: 2 }}>
                Avg Discount Rate: {' '}
                <Box component="span" fontWeight={700} color="primary.main">
                  {discountCreditData?.avg_discount_rate || 0}%
                </Box>
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Discount Sensitivity Analysis */}
        <Grid item xs={12} md={4}>
          <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="subtitle1" gutterBottom>Discount Sensitivity Analysis</Typography>
            
            {discountSensitivityError && (
              <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                {discountSensitivityError}
              </Typography>
            )}

            <Box sx={{ position: 'relative' }}>
              {discountSensitivityLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                  <CircularProgress size={30} />
                </Box>
              )}

              <Typography variant="body2" sx={{ mt: 1, color: 'red' }}>
                High Sensitivity - {discountSensitivityData?.high_sensitivity_percent || 0}%
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: '#ffa000' }}>
                Medium Sensitivity - {discountSensitivityData?.medium_sensitivity_percent || 0}%
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: 'green' }}>
                Low Sensitivity - {discountSensitivityData?.low_sensitivity_percent || 0}%
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Optimal Discount Rate: {' '}
                <Box component="span" fontWeight={700} color="primary.main">
                  {discountSensitivityData?.optimal_discount_rate || 0}%
                </Box>
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Revenue Forecast per Account */}
        <Grid item xs={12} md={4}>
          <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="subtitle1" gutterBottom>Revenue Forecast per Account</Typography>
            
            {revenueForecastError && (
              <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                {revenueForecastError}
              </Typography>
            )}

            <Box sx={{ position: 'relative' }}>
              {revenueForecastLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                  <CircularProgress size={30} />
                </Box>
              )}

              <Typography variant="body2" sx={{ mt: 1 }}>
                Q3 2025 Forecast: {' '}
                <Box component="span" fontWeight={700} color="primary.main">
                  {revenueForecastData?.q3_forecast_display || 'Loading...'}
                </Box>
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Q4 2025 Forecast: {' '}
                <Box component="span" fontWeight={700} color="primary.main">
                  {revenueForecastData?.q4_forecast_display || 'Loading...'}
                </Box>
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                YoY Growth Forecast: {' '}
                <Box component="span" fontWeight={700} color="green">
                  {revenueForecastData?.yoy_growth_display || 'Loading...'}
                </Box>
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Confidence Level: {' '}
                <Box component="span" fontWeight={700} color="green">
                  {revenueForecastData?.confidence_level_display || 'Loading...'}
                </Box>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MetricsDashboard;