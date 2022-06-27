import dynamic from "next/dynamic"
import Head from "next/head"

export default function Map() {

    const LeafletMap = dynamic(() => import("../components/Map"), { ssr: false })



    return (
        <>
            <LeafletMap></LeafletMap>
        </>)
}