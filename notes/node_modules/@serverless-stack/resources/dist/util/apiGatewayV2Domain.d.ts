import { Construct } from "constructs";
import * as apig from "@aws-cdk/aws-apigatewayv2-alpha";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
export interface CustomDomainProps {
    /**
     * The domain to be assigned to the API endpoint (ie. api.domain.com)
     */
    domainName?: string;
    /**
     * The hosted zone in Route 53 that contains the domain. By default, SST will look for a hosted zone by stripping out the first part of the domainName that's passed in. So, if your domainName is api.domain.com. SST will default the hostedZone to domain.com.
     */
    hostedZone?: string;
    /**
     * The base mapping for the custom domain.
     *
     * For example, by setting the domainName to api.domain.com and the path to v1, the custom domain URL of the API will become https://api.domain.com/v1/. If the path is not set, the custom domain URL will be https://api.domain.com. Note the additional trailing slash in the former case.
     */
    path?: string;
    /**
     * Set this option if the domain is not hosted on Amazon Route 53.
     */
    isExternalDomain?: boolean;
    cdk?: {
        /**
         * Override the internally created domain name
         */
        domainName?: apig.IDomainName;
        /**
         * Override the internally created hosted zone
         */
        hostedZone?: route53.IHostedZone;
        /**
         * Override the internally created certificate
         */
        certificate?: acm.ICertificate;
    };
}
export interface CustomDomainData {
    readonly apigDomain: apig.IDomainName;
    readonly mappingKey?: string;
    readonly certificate?: acm.ICertificate;
    readonly isApigDomainCreated: boolean;
    readonly isCertificatedCreated: boolean;
    readonly url: string;
}
export declare function buildCustomDomainData(scope: Construct, customDomain: string | CustomDomainProps | undefined): CustomDomainData | undefined;
