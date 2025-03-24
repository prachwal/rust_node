import { ErrorObject } from "../state/types";

export async function fetchAndDispatch(
  store: any,
  url: string,
  successType: string,
  failureType: string,
  options: {
    method?: string;
    headers?: Record<string, string>;
    pathParams?: Record<string, string>;
    queryParams?: Record<string, string>;
    postParams?: Record<string, string>;
    body?: any;
    contentType?: string;
    credentials?: RequestCredentials;
    mode?: RequestMode;
    cache?: RequestCache;
  } = {}
) {
  const {
    method = "GET",
    headers = {},
    pathParams = {},
    queryParams = {},
    postParams = {},
    body,
    contentType,
    credentials = "same-origin",
    mode = "cors",
    cache = "no-cache",
  } = options;

  // Replace placeholders in the URL with pathParams
  let fullUrl = Object.keys(pathParams).reduce(
    (acc, key) => acc.replace(`:${key}`, encodeURIComponent(pathParams[key])),
    url
  );

  // Append query string if queryParams are provided
  const queryString = Object.keys(queryParams)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
    )
    .join("&");
  if (queryString) {
    fullUrl += `?${queryString}`;
  }

  // Handle form-encoded POST parameters
  let finalBody = body;
  if (Object.keys(postParams).length > 0) {
    finalBody = new URLSearchParams(postParams).toString();
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  // Set content type if provided
  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  store.dispatch({ type: "setLoading", payload: true });
  let errorMessage = "Unknown error"; // Default error message

  try {
    const response = await fetch(fullUrl, {
      method,
      headers,
      body: finalBody
        ? typeof finalBody === "string"
          ? finalBody
          : JSON.stringify(finalBody)
        : undefined,
      credentials,
      mode,
      cache,
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    store.dispatch({ 
      type: successType, 
      payload: data.payload, 
      errorState: null 
    });
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : String(err);
    
    console.error(`Failed to fetch data for ${successType}:`, err);
    
    const errorObj = { 
      message: `API Error: ${errorMessage}`, 
      Error: err instanceof Error ? err : new Error(errorMessage) 
    };
    
    // ONLY dispatch the failure action, not SET_ERROR 
    store.dispatch({
      type: failureType,
      payload: null,
      errorState: errorObj
    });
  } finally {
    store.dispatch({ type: "setLoading", payload: false });
  }
}
