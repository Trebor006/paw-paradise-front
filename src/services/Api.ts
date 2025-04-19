
// Helper function to safely get environment variables
function getEnv(variable: string): string {
    const value = import.meta.env[variable];
    if (!value) {
        console.error(`Environment variable ${variable} is not defined or empty`);
        throw new Error(`Environment variable ${variable} is not defined`);
    }
    console.log(`Environment variable ${variable} loaded with value: ${value}`);
    return value;
}

// Use getEnv to retrieve the API URL
export const baseUrl = getEnv('VITE_API_URL');
