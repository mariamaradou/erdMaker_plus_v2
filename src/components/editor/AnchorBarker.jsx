import React from "react";
import { Group, Line } from "react-konva";



//sxediasmos plithikothtwn sta relatioships

const AnchorBarker = (props) => {

  var mandatory = (props.minimum === "one" || props.minimum === "1" || props.minimum >1  )  ? ( //cardinality one
   
     null
  
  ) : null;
      
  

  var optional =(props.minimum==='0' || props.minimum==='null'|| props.minimum==='zero') ? ( 
      
    // NA VALW DIEKOKEMENH GRAMMI
     null)
     : null;

  var one = (props.maximum==='1' || props.maximum==='one') ? ( //participation one
      <Line
       stroke={"black"}
       strokeWidth={0.5}
        points={[
          0,
         0, // LEFT
          0,
          30, // RIGHT
        ]}
      />
    ) : null;


   
  var many = ( props.maximum>1 || props.maximum==='many' ||props.maximum==='N' || props.maximum==='n') ? ( //participation many
      <Group>
        <Line
          stroke={"black"}
          strokeWidth={0.5}
          points={[
            0,
            20, // TOP
            -10,
            30, // BOTTOM
          ]}
        />
        <Line
          stroke={"black"}
          strokeWidth={0.5}
          points={[
            0,
            20, // TOP
            10,
            30, // BOTTOM
          ]}
        />
      </Group>
    ) : null;

   
  

            

  return (
    
    <Group x={props.x} y={props.y} rotation={props.angle}>
      
      <Line                            //i mikri grammoula meta to line metaksy relationship kai entity
        stroke={"black"}
        strokeWidth={0.5}
        points={[
          0,
          0, // TOP
          0,
          30, // BOTTOM
        ]}
      />
      
      {mandatory}
      {optional}
      {one}
      {many}
    </Group>
  );
      }

export default AnchorBarker;
