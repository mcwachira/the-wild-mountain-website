"use server"

import {signIn, signOut} from "@/lib/auth"

export const signInAction  = async () => {

await signIn("google", {redirectTo:"/account"});
}

export const signOutAction  = async () => {
    await signOut({redirectTo:"/"});
}