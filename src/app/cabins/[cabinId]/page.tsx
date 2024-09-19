
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import {getBookedDatesByCabinId, getCabin, getCabins, getSettings} from "@/lib/data-service";
import Image from 'next/image'
import TextExpander from "@/components/TextExpander";
import DateSelector from "@/components/DateSelector";
import ReservationForm from "@/components/ReservationForm";
import Reservation from "@/components/Reservation";
import {Suspense} from "react";
import Spinner from "@/components/Spinner";
import Cabin from "@/components/Cabin";


export  async function generateMetadata({params}: {params:{cabinId:string}}) {

    const {name} =  await getCabin(params.cabinId)
    return {
        title: `Cabin ${name}`
    }
}


//use to  make dynamic pages static
export async function generateStaticParams() {
    const cabins = await getCabins()

    const ids = cabins.map((cabin) => ({
        cabinId:String(cabin.id)
    }))

    return ids;
}
export default async function Page({params}: {params:{cabinId:string}}) {
    // console.log(params.cabinId)


     const cabin = await getCabin(params.cabinId)

    //fetch data in parallel use promise.all to avoid blocking

    //const [cabin, settings, bookedDates] = await Promise.all([ getCabin(params.cabinId), getSettings(),getBookedDatesByCabinId(params.cabinId) ])
    console.log(cabin)


    return (
        <div className="max-w-6xl mx-auto mt-8">

            <Cabin cabin={cabin}/>
            <div>
                <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
                Reserve {cabin.name} today. Pay on arrival.
                </h2>

                <Suspense fallback={<Spinner/>}>
                    <Reservation cabin={cabin}/>
                </Suspense>

            </div>
        </div>
    );
}
