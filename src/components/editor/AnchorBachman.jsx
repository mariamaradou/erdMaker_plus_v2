import React from "react";
import { Group, Line, Circle, Arrow } from "react-konva";



//sxediasmos plithikothtwn sta relatioships

const AnchorBachman = (props) => {

   
  var mandatory = (props.minimum === "one" || props.minimum === "1" || props.minimum >1  ) ? ( //cardinality one
  

    <Circle fill={'black'} 
           radius={3} 
           x={props.angle===90?props.x-24:props.angle===-90?props.x+24:props.x} 
           y={props.angle===180?props.y-26:props.angle===0?props.y+26:props.y}>
        
    </Circle>
    
  ) : null;
      
  var optional =(props.minimum==='0' || props.minimum==='null'|| props.minimum==='zero')  ? ( //cardinality one
  

    <Circle fill={'white'}
            stroke={'black'} 
            strokeWidth={0.5}
           radius={3} 
           x={props.angle===90?props.x-24:props.angle===-90?props.x+24:props.x} 
           y={props.angle===180?props.y-26:props.angle===0?props.y+26:props.y}>
        
    </Circle>
    
  ) : null;
  


  var one = (props.maximum==='1' || props.maximum==='one')  ? ( //participation one
    null
    ) : null;


   
  var many = ( props.maximum>1 || props.maximum==='many' ||props.maximum==='N' || props.maximum==='n') ? ( //participation many
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
