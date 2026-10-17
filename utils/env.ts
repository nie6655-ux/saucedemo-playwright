export const ENV = {
    BASE_URL: getRequiredEnvVar('BASE_URL'),
    PASSWORD: getRequiredEnvVar('SAUCEDEMO_PASSWORD'),
};

function getRequiredEnvVar(varName: string): string {
    const value = process.env[varName];
    if (!value) {
        throw new Error(`Environment variable ${varName} is required but not set.`);
    }
    return value;
}