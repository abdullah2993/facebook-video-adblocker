/* eslint-disable no-unused-vars */
import { browser, WebRequest } from 'webextension-polyfill-ts';

const RequestType = 'useInstreamAdsHaloFetcherQuery';
const RequestTypeKey = 'fb_api_req_friendly_name';
const NoAdsResponse = '{"data":{"scrubber":{"instream_video_ad_breaks":[],"post_roll_ad_break":null}},"extensions":{"is_final":true}}';

function listener(req: WebRequest.OnBeforeRequestDetailsType) {
  if (req.method !== 'POST') {
    return;
  }
  const reqBody = req.requestBody?.formData;

  if (!reqBody) {
    return;
  }

  const queryParams = reqBody[RequestTypeKey];

  if (!queryParams || queryParams.length < 1 || queryParams[0] !== RequestType) {
    return;
  }

  const filter = browser.webRequest.filterResponseData(req.requestId);

  filter.ondata = (e: WebRequest.StreamFilterEventData) => {
    const encoder = new TextEncoder();
    filter.write(encoder.encode(NoAdsResponse));
  };

  filter.onstop = () => {
    filter.close();
  };
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  { urls: ['https://www.facebook.com/api/graphql/'], types: ['xmlhttprequest'] },
  ['blocking', 'requestBody'],
);
