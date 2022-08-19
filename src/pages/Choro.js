import React, { useEffect, useMemo, useState } from "react";
import Stack from '@mui/material/Stack';

import { useLeaflet } from "react-leaflet";
import L from "leaflet";
import "leaflet-choropleth";
import Detail from "./Detail";


const Choro = (props) => {
    const { map } = useLeaflet();
    const [choropleth, setChoropleth] = useState(null)
    const [block, setBlock] = useState({});
    const [open, setOpen] = useState(false);
    const { search, geojson } = props;
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
        if (Object.keys(geojson).length > 0) {
            if (choropleth) choropleth.clearLayers();

            const _chorop = L.choropleth(geojson, {
                valueProperty: "DIFF",
                scale: ["black", "red"],
                steps: 5,
                mode: "q",
                style: function (feature) { // Style option
                    if (search.indexOf(feature.properties.id) != -1) {
                        return {
                            'weight': 1.5,
                            'color': 'red',
                            'fillColor': 'blue',
                            'fillOpacity': 0.4
                        }
                    } else {
                        return {
                            'weight': 1,
                            'color': 'black',
                            'fillColor': 'green',
                            'fillOpacity': 0.3
                        }
                    }
                },
                onEachFeature: function (feature, layer) {
                    const handleClick = () => {
                        setBlock(feature.properties)
                        handleClickOpen()
                    }

                    layer.on({
                        click: handleClick
                    });

                    // layer.bindPopup(
                    //     `<div>` +
                    //     `<img src="${require(`../assets/img/${feature.properties.img}`).default}" width="250" height="160">` +
                    //     `<div class="contents">` +
                    //     `<h2>${feature.properties.name}</h2>` +
                    //     `<p>TOTAL : ${feature.properties.TOTAL}km<sup>2</sup></p>` +
                    //     `</div>` +
                    //     `</div>`
                    // );

                }
            }).addTo(map);
            setChoropleth(_chorop);
        }
    }, [geojson, search]);

    return (
        <Stack>
            <Detail open={open} data={blockInfo} close={handleClose} block={block} />
        </Stack>
    );
}

export default Choro;
