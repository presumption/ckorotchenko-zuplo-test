import {CustomRateLimitDetails, ZuploContext, ZuploRequest,} from "@zuplo/runtime";

interface PolicyOptions {
  requestsAllowed?: number;
  timeWindowMinutes?: number;
}

export function rateLimitKey(
  request: ZuploRequest,
  context: ZuploContext,
  options: PolicyOptions,
  policyName: string,
): CustomRateLimitDetails | undefined {
  const apiKey = request.headers.get("api-key");
  if (apiKey && apiKey === "my-valid-key") {
    context.log.info(`Increasing rate limits for authenticated user as per policy ${policyName}`);
    return {
      key: apiKey,
      requestsAllowed: 5,
      timeWindowMinutes: 1,
    };
  } else {
    const ip = request.headers.get("true-client-ip");
    return {
      key: ip || "",
      requestsAllowed: options.requestsAllowed,
      timeWindowMinutes: options.timeWindowMinutes
    }
  }
}
