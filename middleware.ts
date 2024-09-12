// import {NextResponse} from 'next/server'
//
// export const middleware = (request) => {
//     console.log(request)
//     return NextResponse.redirect(new URL("/about", request.url))
// }

import { auth } from "@/lib/auth"

export const middleware = auth;

export const config = {
    matcher: ["/account"],
};