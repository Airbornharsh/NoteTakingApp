"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSchemaName = void 0;
/**
 * Generates the schema name, removing invalid values.
 *
 * @export
 * @param {string} name Schema name.
 * @returns
 */
function generateSchemaName(name) {
    if (name == null)
        return name;
    return name
        .replace(/\W/g, '')
        .replace(/^\d+/g, '');
}
exports.generateSchemaName = generateSchemaName;
