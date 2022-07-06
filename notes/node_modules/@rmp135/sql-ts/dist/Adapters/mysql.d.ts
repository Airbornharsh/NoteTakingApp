import { Knex } from 'knex';
import { AdapterInterface, TableDefinition, ColumnDefinition, EnumDefinition } from './AdapterInterface';
import { Config } from '..';
export default class implements AdapterInterface {
    getAllEnums(db: Knex, config: Config): Promise<EnumDefinition[]>;
    getAllTables(db: Knex, schemas: string[]): Promise<TableDefinition[]>;
    getAllColumns(db: Knex, config: Config, table: string, schema: string): Promise<ColumnDefinition[]>;
}
