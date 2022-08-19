import React from "react";
import { Map, TileLayer, LayersControl } from "react-leaflet";
import classes from "./leaf.module.css";
import Choro from "./Choro";

const Leaf = (props) => {
    const { viewPort, geojson, search } = props;

    return (
        <Map
            center={[viewPort.latitude, viewPort.longitude]}
            zoom={viewPort.zoom}
            className={classes.map}
        >
            <LayersControl position="topright">
                <LayersControl.BaseLayer name="Default" checked={true}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Satellite">
                    <TileLayer
                        url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                        maxZoom={20}
                        subdomains={['mt1', 'mt2', 'mt3']}
                    />
                </LayersControl.BaseLayer>
            </LayersControl>
            <Choro search={search} geojson={geojson} />
        </Map>
    );
}

export default Leaf;
