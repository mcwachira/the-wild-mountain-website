"use server"

import {auth, signIn, signOut} from "@/lib/auth"
import {supabase} from "@/lib/supabase";
import {revalidatePath} from "next/cache";
import {getBookings} from "@/lib/data-service";
import {isPast} from "date-fns";

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
export async function deleteReservation(bookingId){
    const session = await auth();
    if(!session) throw new Error('You must be logged in')

    const guestBookings = await getBookings(session?.user.guestId)
    const guestBookingIds = guestBookings.map((booking) => booking.id)
    if(guestBookingIds.includes(bookingId)) throw new Error('Your not allowed to delete this booking')

       const { data, error } = await supabase.from('bookings').delete().eq('id', bookingId);

   if (error) {
     console.error(error);
     throw new Error('Booking could not be deleted');
   }

   revalidatePath("/account/reservations")

    //
    // const reservationsToDelete = reservations.filter((reservation) =>reservation.startDate < isPast(new Date(reservation.startDate)) )
    // console.log(reservationsToDelete)
}