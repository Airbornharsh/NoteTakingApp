import { Construct } from "constructs";
import * as logs from "aws-cdk-lib/aws-logs";
import * as apig from "@aws-cdk/aws-apigatewayv2-alpha";
export interface AccessLogProps {
    format?: string;
    destinationArn?: string;
    retention?: Lowercase<keyof typeof logs.RetentionDays>;
}
export declare function buildAccessLogData(scope: Construct, accessLog: boolean | string | AccessLogProps | undefined, apiStage: apig.WebSocketStage | apig.HttpStage, isDefaultStage: boolean): logs.LogGroup | undefined;
export declare function cleanupLogGroupName(str: string): string;
