export interface RequestContextData {
  loggedIn: boolean;
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
