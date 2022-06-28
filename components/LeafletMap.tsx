import { MapContainer, Marker, Popup, TileLayer, useMap, ZoomControl } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

export default function LeafletMap() {


    return (

        <MapContainer  center={[53.6943850, 9.9198327]} zoom={14} maxZoom={19} scrollWheelZoom={true} style={{height:'100vh', width:'100%' ,position: 'fixed'}} zoomControl={false}>
             <TileLayer maxZoom={19} attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <ZoomControl position="bottomright" zoomInText="✈️" zoomOutText="🚀"/>
        </MapContainer>
    )
}