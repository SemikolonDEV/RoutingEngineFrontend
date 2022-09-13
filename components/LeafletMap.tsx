import { MapContainer, Marker, Popup, TileLayer, useMap, ZoomControl } from "react-leaflet";
import RoutingMachine from "./RoutingMachine";


export default function LeafletMap({startCoord, targetCoord} : {startCoord:any, targetCoord:any}) {

    return (

        <MapContainer  center={[53.6943850, 9.9198327]} zoom={14} maxZoom={19} scrollWheelZoom={true} style={{height:'100vh', width:'100%' ,position: 'fixed'}} zoomControl={false}>
             <TileLayer maxZoom={19} attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <ZoomControl position="bottomright" zoomInText="✈️" zoomOutText="🚀"/>
            
            {(targetCoord !== undefined && startCoord !== undefined ) && 
            <>
                <RoutingMachine startCoord={startCoord} targetCoord={targetCoord}/>
            </>
            }
            
        </MapContainer>
    )
}