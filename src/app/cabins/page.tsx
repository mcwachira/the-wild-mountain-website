import CabinCard from "@/components/CabinCard";
import {getCabins} from "@/lib/data-service";
import CabinList from "@/components/CabinList";
import React, {Suspense} from "react";
import Spinner from "@/components/Spinner";
import Filter from "@/components/Filter";



export const revalidate = 3600;
export const metadata = {
  title: "Cabins",
};

export default  async function Page({searchParams}) {
  // CHANGE
    //searchParams makes page dynamic completely

    const filter = searchParams?.capacity ?? "all"

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>


        <div className="flex justify-end mb-8">
            <Filter/>
        </div>


        {/*//reason for the key is to show a spinner when the specific data based on the filter is loading*/}
        <Suspense fallback={<Spinner/>} key={filter}>
            <CabinList filter={filter}/>
        </Suspense>


    </div>
  );
}
