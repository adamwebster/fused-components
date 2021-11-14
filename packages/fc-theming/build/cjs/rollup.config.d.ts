declare namespace _default {
    namespace input {
        const index: string;
    }
    const preserveModules: boolean;
    const treeshake: boolean;
    const output: {
        dir: string;
        format: string;
        globals: {
            react: string;
            'react-dom': string;
            'prop-types': string;
            dayjs: string;
            'dayjs/plugin/advancedFormat': string;
            'dayjs/plugin/duration': string;
            'dayjs/plugin/localeData': string;
            'styled-components': string;
            '@fortawesome/react-fontawesome': string;
            polished: string[];
            '@popperjs/core': string[];
            'react-popper': string;
        };
        sourcemap: boolean;
        preferConst: boolean;
    }[];
    const plugins: any[];
    function external(id: any): boolean;
}
export default _default;
