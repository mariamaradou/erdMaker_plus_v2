import React from "react";
import { Group, Line, Circle, Arrow } from "react-konva";



//sxediasmos plithikothtwn sta relatioships

const AnchorBachman = (props) => {

   
  var mandatory = props.minimum === "one"  ? ( //cardinality one
  

    <Circle fill={'black'} 
           radius={3} 
           x={props.angle===90?props.x-24:props.angle===-90?props.x+24:props.x} 
           y={props.angle===180?props.y-26:props.angle===0?props.y+26:props.y}>
        
    </Circle>
    
  ) : null;
      
  var optional = props.minimum === "zero" ? ( //cardinality one
  

    <Circle fill={'white'}
            stroke={'black'} 
            strokeWidth={0.5}
           radius={3} 
           x={props.angle===90?props.x-24:props.angle===-90?props.x+24:props.x} 
           y={props.angle===180?props.y-26:props.angle===0?props.y+26:props.y}>
        
    </Circle>
    
  ) : null;
  


  var one = props.maximum === "one" ? ( //participation one
    null
    ) : null;


   
  var many = props.maximum === "many" ? ( //participation many
     <Arrow  stroke={"black"}
     strokeWidth={0}
     x={props.x} 
     y={props.y}
     fill={'black'}
     rotation={props.angle}
     points={[
       0,
       0, // TOP
       0,
       21, // BOTTOM
     ]}></Arrow>
      
    ) : null;

   
      

            

  return (
    
    <Group >
     
      <Line
        stroke={"black"}
        strokeWidth={0.5}
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
      {optional}
      {one}
      {many}
     
    </Group>
  );
    }

export default AnchorBachman;
