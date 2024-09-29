
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

 function DiscreteSliderSteps(props) {
   let obj = props;

  return (

          <div className="homevalue bar-section">
                <p className='label'>{obj.name}</p>
                <p className='current-value'>{obj.symbol} {obj.currentVal}</p>
                <div className="bar">
                  <Box sx={{ width: "100%" }}>
                    <Slider
                      aria-label="Temperature"
                      defaultValue={obj.default}
                      getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                      shiftStep={30}
                      step={(obj.step) ? obj.step : 100}
                      marks
                      min={obj.min}
                      max={obj.max}
                      onChange={(e) => {
                        obj.setVal(e.target.value)
                      }}
                    />
                    
                  </Box> 
                  <div className="values">
                    <p className="min">{obj.symbol} {obj.min}</p>
                    <p className="max">{obj.symbol} {obj.max}</p>
                  </div>
                </div>
          </div>
   
  );
}

export default DiscreteSliderSteps;


 