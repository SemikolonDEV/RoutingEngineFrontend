import { MapContainer, Marker, Popup, TileLayer, useMap, ZoomControl } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { height } from "@mui/system";
import { TextField } from "@mui/material";

export default function LeafletMap() {


    return (

        <MapContainer  center={[53.6943850, 9.9198327]} zoom={14}  scrollWheelZoom={true} style={{height:'100vh'}} zoomControl={false}>
             <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <ZoomControl position="bottomright" zoomInText="✈️" zoomOutText="🚀"/>
            
        </MapContainer>
    )
}