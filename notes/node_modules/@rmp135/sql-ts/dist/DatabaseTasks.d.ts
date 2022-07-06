import { Config, Database } from './Typings';
import { Knex } from 'knex';
/**
 * Converts a Database definition to TypeScript.
 *
 * @export
 * @param {Database} database The Database definition.
 * @param {Config} config The configuration to use.
 * @returns A TypeScript definition, optionally wrapped in a namespace.
 */
export declare function stringifyDatabase(database: Database, config: Config): string;
/**
 * Constructs a database by fetching the tables and enums.
 *
 * @export
 * @param {Config} config The sql-ts config to use.
 * @param {Knex} db The database context to use.
 * @returns {Promise<Database>} The constructed Database.
 */
export declare function generateDatabase(config: Config, db: Knex): Promise<Database>;
