import { NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/
const DEFAULT_LOCALE = "en";

export function middleware(req) {
  let res = NextResponse.next();
  // console.log('Request', req)
  // console.log('Response', res)

  const shouldHandleLocale =
    !PUBLIC_FILE.test(req.nextUrl.pathname) &&
    !req.nextUrl.pathname.includes("/api/") &&
    req.nextUrl.locale === "default";

  if (shouldHandleLocale) {
    const url = req.nextUrl.clone();
    url.locale = DEFAULT_LOCALE;

    res = NextResponse.redirect(url);
  }

  return res;
}