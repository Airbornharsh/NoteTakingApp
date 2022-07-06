import * as logs from "aws-cdk-lib/aws-logs";
import * as apig from "aws-cdk-lib/aws-apigateway";
export function buildAccessLogData(scope, accessLog) {
    if (accessLog === false) {
        return;
    }
    // note: Access log configuration is not supported by L2 constructs as of CDK v1.85.0. We
    //       need to define it at L1 construct level.
    // create log group
    let logGroup;
    let destination;
    if (accessLog && accessLog.destinationArn) {
        // note: do not set "LogGroupLogDestination" as "logGroup" because we only
        //       want to set "logGroup" if it is newly created. If we decide to
        //       change this behavior at a later date, make sure we change it for
        //       both v1 and v2 API constructs.
        const destinationArn = accessLog
            .destinationArn;
        const destinationLogGroup = logs.LogGroup.fromLogGroupArn(scope, "LogGroup", destinationArn);
        destination = new apig.LogGroupLogDestination(destinationLogGroup);
    }
    else {
        const retention = (accessLog && accessLog.retention) || "INFINITE";
        const retentionValue = logs.RetentionDays[retention.toUpperCase()];
        // validate retention
        if (!retentionValue) {
            throw new Error(`Invalid access log retention value "${retention}".`);
        }
        logGroup = new logs.LogGroup(scope, "LogGroup", {
            retention: retentionValue,
        });
        destination = new apig.LogGroupLogDestination(logGroup);
    }
    // get log format
    let format;
    if (accessLog && accessLog.format) {
        format = accessLog.format;
    }
    else if (typeof accessLog === "string") {
        format = accessLog;
    }
    else {
        format =
            "{" +
                [
                    // request info
                    `"requestTime":"$context.requestTime"`,
                    `"requestId":"$context.requestId"`,
                    `"httpMethod":"$context.httpMethod"`,
                    `"path":"$context.path"`,
                    `"resourcePath":"$context.resourcePath"`,
                    `"status":$context.status`,
                    `"responseLatency":$context.responseLatency`,
                    `"xrayTraceId":"$context.xrayTraceId"`,
                    // integration info
                    `"integrationRequestId":"$context.integration.requestId"`,
                    `"functionResponseStatus":"$context.integration.status"`,
                    `"integrationLatency":"$context.integration.latency"`,
                    `"integrationServiceStatus":"$context.integration.integrationStatus"`,
                    // caller info
                    `"ip":"$context.identity.sourceIp"`,
                    `"userAgent":"$context.identity.userAgent"`,
                    `"principalId":"$context.authorizer.principalId"`,
                ].join(",") +
                "}";
    }
    const accessLogData = {
        logGroup,
        format: apig.AccessLogFormat.custom(format),
        destination,
    };
    return accessLogData;
}
export function cleanupLogGroupName(str) {
    return str.replace(/[^.\-_/#A-Za-z0-9]/g, "");
}
