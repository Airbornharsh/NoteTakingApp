import { Config, Column, Table, Database } from './Typings';
import { Knex } from 'knex';
/**
 * Generates a Database definition as a plain JavaScript object.
 *
 * @param {Config} rawConfig The configuration to generate this database with.
 * @param {Knex} db The optional Knex context to use.
 * @returns {Promise<Database>} The Database definition as a plain JavaScript object.
 */
declare function toObject(config: Config, db?: Knex): Promise<Database>;
/**
 * Generates a Database definition as a series of TypeScript interfaces.
 *
 * @param {Config} config The configuration to generate this database with.
 * @returns {Promise<string>} The Database definition as a series of TypeScript interfaces.
 */
declare function toTypeScript(config: Config, db?: Knex): Promise<string>;
/**
 * Generates TypeScript from an exported database definition.
 *
 * @param database The database object as exported from sql-ts
 * @param config The configuration to generate the TypeScript from.
 * @return {string}  The stringified database.
 */
declare function fromObject(database: Database, config: Config): string;
declare const _default: {
    toObject: typeof toObject;
    fromObject: typeof fromObject;
    toTypeScript: typeof toTypeScript;
};
export default _default;
export { toObject, fromObject, toTypeScript, Config, Column, Table, Database };
