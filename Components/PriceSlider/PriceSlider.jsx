import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const PriceSlider = (props) => {
    const useStyles = makeStyles({
        root: {
            width: 100,
        },
    });

    function valuetext(value) {
        return `${value}`;
    }


    const classes = useStyles();

    const handleChange = (event, newValue) => {
        props.setValue(newValue);
    }

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                Price
            </Typography>
            <Slider
                value={props.value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
    );
}

export default PriceSlider;