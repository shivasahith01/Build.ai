import axios from 'axios';

import { handleApiError } from './analyticsService';
import config from "../config-global"; // Adjust the import based on your project structure

const API_BASE_URL = config.api_base_url;// Adjust as per your setup

const getFallbackFinancialData = (): any[] => [
    { month: 'Jan', revenue: 350000, grossProfit: 227500, netProfit: 105000, opex: 70000, cogs: 122500 },
    { month: 'Feb', revenue: 380000, grossProfit: 247000, netProfit: 114000, opex: 76000, cogs: 133000 },
    { month: 'Mar', revenue: 420000, grossProfit: 273000, netProfit: 126000, opex: 84000, cogs: 147000 }
];

const getFallbackGrowthData = (): any[] => [
    { month: 'Jan', newAccounts: 45, lostAccounts: 12, netGrowth: 33 },
    { month: 'Feb', newAccounts: 53, lostAccounts: 9, netGrowth: 44 },
    { month: 'Mar', newAccounts: 40, lostAccounts: 15, netGrowth: 25 },
    { month: 'Apr', newAccounts: 62, lostAccounts: 10, netGrowth: 52 },
    { month: 'May', newAccounts: 58, lostAccounts: 11, netGrowth: 47 },
    { month: 'Jun', newAccounts: 66, lostAccounts: 8, netGrowth: 58 },
];

export const fetchFinancialChartData = async (): Promise<any[]> => {
    // console.log(`Fetching financial chart data from: ${API_BASE_URL}/financial-chart-data`);
    try {
        const response = await axios.get(`${API_BASE_URL}/financial-chart-data`);
        // console.log('Raw financial chart response:', response.data);

        if (!Array.isArray(response.data)) {
            console.warn('Expected array for financial chart data, received:', typeof response.data, response.data);
            return getFallbackFinancialData();
        }
        const transformedData = response.data.map((item: any, index: number) => ({
            month: item.month || `Month_${index + 1}`,
            revenue: item.revenue || 0,
            grossProfit: Number(item.grossprofit) || 0,
            netProfit: Number(item.netprofit) || 0,
            opex: Number(item.opex) || 0,
            cogs: Number(item.cogs) || 0
        }));

        // console.log('Transformed Financial Chart Data:', transformedData);

        if (transformedData.length === 0) {
            console.warn('No data returned, using fallback financial chart data');
            return getFallbackFinancialData();
        }

        return transformedData;

    } catch (error) {
        return handleApiError(error, 'financial chart data');
    }
};

export const fetchAccountGrowthData = async (): Promise<any[]> => {
    try{
        const response = await axios.get(`${API_BASE_URL}/account-growth-chart-data`);
        if (!Array.isArray(response.data)) {
            console.warn('Expected array for financial chart data, received:', typeof response.data, response.data);
            return getFallbackFinancialData();
        }
        const transformedData = response.data.map((item: any, index: number) => ({
            month: item.month || `Month_${index + 1}`,
            newAccounts: Number(item.newAccounts) || 0,
            lostAccounts: Number(item.lostAccounts) || 0,
            netGrowth: Number(item.netGrowth) || 0,
        }));

        console.log('Transformed Financial Chart Data:', transformedData);

        if (transformedData.length === 0) {
            console.warn('No data returned, using fallback financial chart data');
            return getFallbackGrowthData();
        }

        return transformedData;
    }
    catch (error) {
        return handleApiError(error, 'account growth data');
    }
}



