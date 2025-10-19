import { getToken } from "next-auth/jwt";
import { RouteMatcher } from "next/dist/server/route-matchers/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

let token = await getToken({req :request })
 if(token){

  if(request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register' ){
    return NextResponse.redirect(new URL('/', request.url))
  }
  else{
       return NextResponse.next()

  }
 }   
 else{
    if(request.nextUrl.pathname === '/cart'){
      return NextResponse.redirect(new URL('/login', request.url))
    }
    else{
      return NextResponse.next()
    }
 }

 
}

export const config = {
 matcher: ['/Cart', "/login", "/register" ]   
 }