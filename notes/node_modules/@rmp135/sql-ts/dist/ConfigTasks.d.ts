import { Config } from './Typings';
/**
 * Applies configuration defaults to a given configuration object.
 *
 * @param config The raw configuration.
 * @returns The input configuration with missing fields defaulted.
 */
export declare function applyConfigDefaults(config: Config): Config;
