import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CTextField } from '../components/Styled';

export default function TemporaryDrawer({ state, onClose }) {
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
    const [instance, setInstance] = React.useState('');

    const handleChangeInstance = (event) => {
        setInstance(event.target.value);
    };

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const list = () => (
        <Box
            role="presentation"
            sx={{
                width: 300,
            }}
        >
            <Stack sx={{ px: 2, py: 2.5 }}>
                <Typography fontSize={18} fontWeight={500}>
                    Add Crop Measure
                </Typography>
            </Stack>
            <Divider />
            <Stack sx={{ mt: 2, px: 2, py: 2.5 }} spacing={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label="Measure Date"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField size='small' {...params} />}
                    />
                </LocalizationProvider>
                <FormControl size="small">
                    <InputLabel id="demo-select-small">Measure Instance</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={instance}
                        label="Measure Instance"
                        onChange={handleChangeInstance}
                        size="small"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <CTextField label="Value" />
                <CTextField label="Note" multiline rows={4} />
                <FormControlLabel sx={{ mt: '10px !important', ml: '-8px !important' }} control={<Switch defaultChecked />} label="Internal use only" />
                <Stack alignItems='center'>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" />
                        <AddPhotoAlternateIcon />
                    </IconButton>
                </Stack>
                <Stack alignItems='center'>
                    <Button
                        variant="contained"
                        onClick={onClose}
                        color="success"
                        sx={{
                            width: 'fit-content',
                            mt: 2
                        }}
                    >
                        Save
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );

    return (
        <Drawer
            anchor={'right'}
            open={state}
            onClose={onClose}
            sx={{
                zIndex: 1300,
            }}
        >
            {list()}
        </Drawer>
    );
}
