"use server"

import {auth, signIn, signOut} from "@/lib/auth"
import {supabase} from "@/lib/supabase";
import {revalidatePath} from "next/cache";

export const signInAction  = async () => {

await signIn("google", {redirectTo:"/account"});
}

export const signOutAction  = async () => {
    await signOut({redirectTo:"/"});
}

export  async function updateGuest(formData){

    const session = await auth();
    if(!session) throw new Error('You must be logged in')

    const nationalID = formData.get("nationalID");
    const [nationality, countryFlag]= formData.get("nationality").split("%");

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw  new Error("PLease provide a valid national Id")

    const updateData = {nationalID, countryFlag, nationality};


    const { data, error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.guestId)

    if (error) {
        console.error(error);
        throw new Error('Guest could not be updated');
    }
    revalidatePath("/account/profile")
    // return data;

}