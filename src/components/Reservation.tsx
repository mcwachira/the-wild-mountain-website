import React from 'react';
import DateSelector from "@/components/DateSelector";
import ReservationForm from "@/components/ReservationForm";
import {getBookedDatesByCabinId, getSettings} from "@/lib/data-service";
import {auth} from "@/lib/auth";
import LoginMessage from "@/components/LoginMessage";

async function Reservation({cabin}) {
    const session = await auth()
    const [settings, bookedDates] = await Promise.all([  getSettings(),getBookedDatesByCabinId(cabin.id) ])
    return (
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
            <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin}/>
            {session?.user ? <ReservationForm cabin={cabin} user={session?.user}/>: <LoginMessage/>}
        </div>
    );
}

export default Reservation;