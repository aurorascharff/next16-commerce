export interface RequestContextData {
  loggedIn: boolean;
  // Examples of other data you could include:
  // locale?: string; // 'en', 'no', 'sv' - for internationalization
  // theme?: 'light' | 'dark'; // user theme preference
  // userType?: 'b2c' | 'b2b'; // business vs consumer
  // debugMode?: boolean; // for development/testing
  // featureFlags?: string[]; // ['newCheckout', 'betaFeatures']
  // region?: string; // 'eu', 'us', 'asia' - for regional content
  // currency?: string; // 'USD', 'EUR', 'NOK' - for pricing
  // experiments?: Record<string, string>; // A/B testing variants
}
export function encodeRequestContext(data: RequestContextData): string {
  const jsonString = JSON.stringify(data);
  return Buffer.from(jsonString).toString('base64url');
}

export function decodeRequestContext(encoded: string): RequestContextData {
  try {
    const jsonString = Buffer.from(encoded, 'base64url').toString();
    const data = JSON.parse(jsonString);

    return {
      loggedIn: typeof data.loggedIn === 'boolean' ? data.loggedIn : false,
    };
  } catch {
    return { loggedIn: false };
  }
}

export function getRequestContext(params: { requestContext: string }): RequestContextData {
  return decodeRequestContext(params.requestContext);
}
