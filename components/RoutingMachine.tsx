import L from 'leaflet'
import { createControlComponent } from '@react-leaflet/core'
import 'leaflet-routing-machine'
import 'lrm-graphhopper'

const createRoutineMachineLayer = (props : any) => {
    
    const instance = L.Routing.control({
        router: L.Routing.graphHopper('55f4d516-09b7-4bc0-bc8a-76a07455b883', {urlParameters: {locale: 'de', vehicle: 'bike', instructions: false}}),
        waypoints: [
            L.latLng(props.startCoord['lat'],props.startCoord['lng']),
            L.latLng(props.targetCoord['lat'],props.targetCoord['lng'])
        ],
        lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }]
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false,
        
    })
    return instance
}

const RoutingMachine = createControlComponent(createRoutineMachineLayer)

export default RoutingMachine