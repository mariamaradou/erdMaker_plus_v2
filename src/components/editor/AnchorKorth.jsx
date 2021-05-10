import React from "react";
import { Group, Line, Arrow } from "react-konva";



//sxediasmos plithikothtwn sta relatioships

const AnchorKorth = (props) => {

  var mandatory = (props.minimum === "one" || props.minimum === "1" || props.minimum >1  )  ? ( //cardinality one
   <Group>
    <Line
    stroke={"black"}
    strokeWidth={5}
   
    points={[
       props.relx,
     props.rely, // LEFT
       props.x,
       props.y, // RIGHT
     ]}
  /> 
     <Line
       stroke={"white"}
       strokeWidth={4}
      
       points={[
          props.relx,
        props.rely, // LEFT
          props.x,
          props.y, // RIGHT
        ]}
     />
     </Group>
    
  ) : null;
      

  
 

  var one = (props.maximum==='1' || props.maximum==='one') ? ( //participation one
    <Arrow  stroke={"black"}
     strokeWidth={0}
     x={props.x} 
     y={props.y}
     fill={'black'}
     rotation={props.angle}
     points={[
       0,
       8, // TOP
       0,
       29, // BOTTOM
     ]}></Arrow>
      
    ) : null;


   
 

   
      

            

  return (
    
    <Group >
     
      <Line
        stroke={"black"}
        strokeWidth={(props.minimum === "one" || props.minimum === "1" || props.minimum >1  )?5: 0.5}
        x={props.x} 
        y={props.y}
        rotation={props.angle}
        points={[
          0,
          0, // TOP
          0,
          30, // BOTTOM
        ]}
      />
      <Line
        stroke={"white"}
       
        strokeWidth={(props.minimum === "one" || props.minimum === "1" || props.minimum >1  )?4: 0}
        x={props.x} 
        y={props.y}
        rotation={props.angle}
        points={[
          0,
          0, // TOP
          0,
          30, // BOTTOM
        ]}
      />
      
      {mandatory}
   
      {one}
      
     
    </Group>
  );
      }

export default AnchorKorth;
