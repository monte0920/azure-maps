import React, { useEffect, useMemo, useState } from "react";
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import FilterListIcon from '@mui/icons-material/FilterList';
import { AzureMapsProvider } from 'react-azure-maps';

import { Container } from "react-bootstrap";

import GEOS from '../config/data.json';
import { CInput } from "../components/Styled";
import AzureMap from "./AzureMap";
import { WKTDATA } from "../config";

const Home = () => {
    const [searchKey, setSearchKey] = useState('');
    const [checked, setChecked] = useState([]);
    const [showAll, setShowAll] = useState(true)
    const [wkt, setWkt] = useState(null)

    const searchedItem = useMemo(() => {
        setChecked([]);

        if (!searchKey) {
            if (showAll) {
                const _item = GEOS.features.map(item => item);
                return _item;
            } else {
                return [];
            }
        }

        const _item = GEOS.features.filter(item => String(item.properties.name).toLowerCase().search(String(searchKey).toLowerCase()) != -1);
        return _item;
    }, [searchKey, showAll])

    const handleCheck = (id) => {
        setChecked(prev => {
            const index = prev.indexOf(id);
            if (index != -1) {
                prev.splice(index, 1);
                return [...prev];
            } else {
                prev.push(id);
                return [...prev];
            }
        })
    }

    useEffect(() => {
        const s = WKTDATA.split(/[\r\n]+/g);
        let geoms = [];
        for (let i = 0; i < s.length; i++) {
            const g = window.atlas.io.ogc.WKT.read(s[0]);
            if (g !== null) {
                geoms = geoms.concat(g);
            }
        }
        if (geoms.length > 0) {
            setWkt(geoms)
        } else {
            alert('Unable to parse WKT.');
        }
    }, [])


    return (
        <Container fluid="md" style={{ height: '100%' }}>
            <Stack direction="row" sx={{ height: '100%', overflow: 'hidden' }}>
                <Stack sx={{ width: 300 }}>
                    <Stack flexGrow={1}>
                        <Stack sx={{ p: 2 }} spacing={2}>
                            <Typography fontWeight={500}>
                                Block Search
                            </Typography>
                            <CInput placeholder="Search" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
                            <Stack direction='row' justifyContent="space-between">
                                <IconButton>
                                    <FilterListIcon />
                                </IconButton>
                                <IconButton>
                                    <BlurOnIcon />
                                </IconButton>
                            </Stack>
                        </Stack>
                        <List component="nav" aria-label="mailbox folders">
                            <Divider />
                            {
                                searchedItem.map((item, index) => (
                                    <Stack key={index}>
                                        <ListItem button onClick={() => handleCheck(item.properties.id)}>
                                            <Checkbox checked={Boolean(checked.indexOf(item.properties.id) != -1)} />
                                            <Typography sx={{ mt: '1px' }}>{item.properties.name}</Typography>
                                        </ListItem>
                                        <Divider />
                                    </Stack>

                                ))
                            }
                        </List>

                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent='space-between'
                        sx={{
                            p: 2,
                            '& button': {
                                color: 'green'
                            }
                        }}
                    >
                        <Button variant="text" onClick={() => setShowAll(false)}>HIDE ALL</Button>
                        <Button variant="text" onClick={() => setShowAll(true)}>SHOW ALL</Button>
                    </Stack>
                </Stack>
                {GEOS && (
                    <AzureMapsProvider>
                        <AzureMap
                            search={checked}
                            geojson={GEOS}
                            wkt={wkt}
                        />
                    </AzureMapsProvider>
                )}
            </Stack>
        </Container >
    );
}

export default Home;
