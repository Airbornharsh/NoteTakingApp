import { Knex } from 'knex';
import { Config } from '..';
import { EnumDefinition } from './AdapterInterface';
/**
 * Retrieves all table defined enums from the database.
 *
 * @export
 * @param {Knex} db The database context to use.
 * @param {Config} config The configuration to use.
 * @returns {Promise<EnumDefinition[]>}
 */
export declare function getTableEnums(db: Knex, config: Config): Promise<EnumDefinition[]>;
