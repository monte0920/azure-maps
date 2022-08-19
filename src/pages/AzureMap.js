import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AzureMapsContext } from 'react-azure-maps';
import Stack from '@mui/material/Stack';
import { layer, source, control } from 'azure-maps-control';
import MapComponent from './MapComponent';
import Detail from './Detail';

const dataSourceRef = new source.DataSource();
const layerRef = new layer.PolygonLayer(dataSourceRef, null, {
    fillColor: 'green',
    fillOpacity: 0.4,
});

const selecteddataSourceRef = new source.DataSource();
const selectedLayer = new layer.PolygonLayer(selecteddataSourceRef, null, {
    fillColor: 'blue',
    fillOpacity: 0.6,
});

const MapController = (props) => {
    const { geojson, search, wkt } = props;
    const { mapRef, isMapReady } = useContext(AzureMapsContext);
    const [open, setOpen] = useState(false);
    const [block, setBlock] = useState({});

    const blockInfo = useMemo(() => {
        return block.data?.map((item, index) => ({ id: index, ...item }));
    }, [block])

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (isMapReady && mapRef) {
            mapRef.sources.add(dataSourceRef);
            mapRef.layers.add(layerRef);

            mapRef.sources.add(selecteddataSourceRef);
            mapRef.layers.add(selectedLayer);

            mapRef.setStyle({ style: 'satellite' });

            mapRef.events.add('click', function (e) {
                if (e.shapes && e.shapes.length > 0) {
                    let properties = e.shapes[0].properties;
                    if (properties.id) {
                        properties.data = JSON.parse(properties.data);
                        setBlock(properties)
                        handleClickOpen()
                    }
                }
            });


            mapRef.controls.add(new control.StyleControl({
                mapStyles: ['satellite', 'road_shaded_relief'],
            }), {
                position: 'top-left'
            })


        }
        return () => {
            dataSourceRef.clear();
            selecteddataSourceRef.clear()
        }
    }, [isMapReady, geojson]);

    useEffect(() => {
        if (isMapReady && mapRef) {
            dataSourceRef.clear();
            selecteddataSourceRef.clear()

            const _unSelected = geojson.features.filter(item => search.indexOf(item.properties.id) == -1);
            const _selected = geojson.features.filter(item => search.indexOf(item.properties.id) != -1);

            if (_selected.length) {
                mapRef.setCamera({
                    bounds: window.atlas.data.BoundingBox.fromData(_selected),
                    padding: 100
                });
            } else {
                mapRef.setCamera({
                    bounds: window.atlas.data.BoundingBox.fromData(_unSelected),
                    padding: 100
                });
            }

            dataSourceRef.add(_unSelected);
            selecteddataSourceRef.add(_selected);

            // WKT MAP

            // if (wkt) { 
            //     dataSourceRef.setShapes(wkt);
            //     dataSourceRef.add(wkt);
            //     mapRef.setCamera({
            //         bounds: window.atlas.data.BoundingBox.fromData(wkt),
            //         padding: 100
            //     });
            // }

        }
    }, [search, geojson, isMapReady, wkt])

    return (
        <Stack sx={{ width: '100%', height: '104%' }}>
            <MapComponent />
            <Detail open={open} data={blockInfo} close={handleClose} block={block} />
        </Stack>
    );
};

export default MapController;