export const preset: string;
export const testEnvironment: string;
export const setupFilesAfterEnv: string[];
export namespace coverageThreshold {
    namespace global {
        const branches: number;
        const functions: number;
        const lines: number;
        const statements: number;
    }
}
