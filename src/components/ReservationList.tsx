"use client"
import React, { useOptimistic } from 'react';
import ReservationCard from "@/components/ReservationCard";
import {deleteReservation} from "@/lib/action";

function ReservationList({bookings}) {
    const [optimisticBookings, optimisticDelete] = useOptimistic(
        bookings,
        (curBookings, bookingId) => {
            return curBookings.filter((booking) => booking.id !== bookingId);
        }
    );


    async function handleDelete(bookingId) {
        optimisticDelete(bookingId)
        await deleteReservation(bookingId);
    }
    return (
        <ul className="space-y-6">
            {optimisticBookings.map((booking) => (
                <ReservationCard
                    booking={booking}
                    onDelete={handleDelete}
                    key={booking.id}
                />
            ))}
        </ul>
    );
}

export default ReservationList;