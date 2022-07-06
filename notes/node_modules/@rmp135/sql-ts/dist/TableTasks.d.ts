import { Knex } from 'knex';
import { Config, Table } from './Typings';
/**
 * Returns all tables from a given database using a configuration.
 *
 * @export
 * @param {knex} db The knex context to use.
 * @param {Config} config The configuration to use.
 * @returns {Promise<Table[]>}
 */
export declare function getAllTables(db: Knex, config: Config): Promise<Table[]>;
/**
 * Returns the additional properties to add to the interface.
 *
 * @export
 * @param {string} tableName The name of the table.
 * @param {string} schemaName The schema of the table.
 * @param {Config} config The configuration to use.
 */
export declare function getAdditionalProperties(tableName: string, schemaName: string, config: Config): string[];
/**
 * Returns any extension that should be applied to the interface.
 *
 * @export
 * @param {string} tableName
 * @param {string} schemaName
 * @param {Config} config
 * @returns {string}
 */
export declare function getExtends(tableName: string, schemaName: string, config: Config): string;
/**
 * Converts a table name to an interface name given a configuration.
 *
 * @export
 * @param {string} name The name of the table.
 * @param {Config} config The configuration to use.
 * @returns
 */
export declare function generateInterfaceName(name: string, config: Config): string;
