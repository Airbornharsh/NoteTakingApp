/// <reference types="node" />
import * as https from "https";
import type { StepFunctions, Lambda } from "aws-sdk";
declare function defaultHttpRequest(options: https.RequestOptions, responseBody: string): Promise<unknown>;
declare function defaultStartExecution(req: StepFunctions.StartExecutionInput): Promise<StepFunctions.StartExecutionOutput>;
declare function defaultInvokeFunction(req: Lambda.InvocationRequest): Promise<Lambda.InvocationResponse>;
export declare const startExecution: typeof defaultStartExecution;
export declare const invokeFunction: typeof defaultInvokeFunction;
export declare const httpRequest: typeof defaultHttpRequest;
export {};
