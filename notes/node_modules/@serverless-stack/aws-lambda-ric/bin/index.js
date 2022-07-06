#!/usr/bin/env node
/** Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved. */

import * as lambda from "../lib/index.js";

if (process.argv.length < 3) {
  throw new Error("No handler specified");
}

const appRoot = process.cwd();
const handler = process.argv[2];

lambda.run(appRoot, handler);
