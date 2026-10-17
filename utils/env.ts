export const ENV = {
    BASE_URL: getRequiredEnvVar('BASE_URL'),
    PASSWORD: getRequiredEnvVar('SAUCEDEMO_PASSWORD'),
};

function getRequiredEnvVar(varName: string): string {
    let value = process.env[varName];

    if (varName !== 'SAUCEDEMO_PASSWORD') {
        value = value?.trim();
    }

    if (!value) {
        throw new Error(`Environment variable ${varName} is required but not set.`);
    }
    return value;
}