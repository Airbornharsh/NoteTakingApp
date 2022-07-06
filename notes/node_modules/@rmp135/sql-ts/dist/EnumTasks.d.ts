import { Knex } from 'knex';
import { Config, Enum } from './Typings';
export declare function getAllEnums(db: Knex, config: Config): Promise<Enum[]>;
/**
 * Generates an enum name, removing invalid characters.
 *
 * @export
 * @param {string} name The name of the enum.
 * @param {Config} config The configuration to use.
 * @returns
 */
export declare function generateEnumName(name: string, config: Config): string;
/**
 * Generates an enum name, removing invalid characters.
 *
 * @export
 * @param {string} name The name of the enum.
 * @param {Config} config The configuration to use.
 * @returns
 */
export declare function generateEnumKey(name: string, config: Config): string;
