"use client"
import React, {createContext, useContext, useState} from 'react';
const ReservationContext = createContext({})

const initialState = {from:undefined , to:undefined}

const ReservationProvider = ({ children }:{children:React.ReactNode}) => {
    const [range, setRange] = useState(initialState)


    const resetRange =() => setRange(initialState)

    return (
        <ReservationContext.Provider value={{range, setRange, resetRange}}>
            {children}
        </ReservationContext.Provider>
    )
}

//create a custom hook
function useReservation(){
    const context = useContext(ReservationContext)

    if(context === undefined) throw  new Error('Context was used outside the provider')
    return context
}

export {useReservation, ReservationProvider}