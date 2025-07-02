
//
// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: 'Global Reach AI',
  appVersion: "2.0.0",
};

const config = {
  // api_base_url: 'https://billing-ai.onrender.com'
  api_base_url: 'http://localhost:8000'
};

export default config;