declare namespace _default {
    const input: string;
    const output: {
        file: string;
        format: string;
    }[];
    const external: string[];
    const plugins: import("rollup").Plugin[];
}
export default _default;
