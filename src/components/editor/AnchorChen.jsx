import React from "react";
import { Group, Line, Text, Circle } from "react-konva";



//sxediasmos plithikothtwn sta relatioships

const Anchor = (props) => {

  var mandatory = (props.minimum === "one" || props.minimum === "1" || props.minimum >1  ) && props.notation==='Chen Notation' ? ( //cardinality one
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
      
  var optional = (props.minimum==='0' || props.minimum==='null'|| props.minimum==='zero') && props.notation==='Teorey Notation'  ?
   (                 //cardinality zero
    <Circle x={props.x} y={props.y} rotation={props.angle} radius={5}  fill="white" stroke={"black"} strokeWidth={0.5} />)
   : null;
  
 

  var one = (props.maximum==='1' || props.maximum==='one') ? ( //participation one
    <Text  text={'1'} 
    x= {props.angle===180||props.angle===0?props.x+8 :props.x}
    y={Math.abs(props.angle)===90?props.y-18:props.y-(Math.abs(props.angle/10))}
    fontSize={13} ></Text>
    ) : null;


   
  var many = ( props.maximum>1 || props.maximum==='many' ||props.maximum==='N' || props.maximum==='n') ? ( //participation many
      <Text  text={'N'} 
      x= {props.angle===180||props.angle===0?props.x+8 :props.x}
      y={Math.abs(props.angle)===90?props.y-18:props.y-(Math.abs(props.angle/10))}
      fontSize={13} ></Text>
      
    ) : null;

   
      

            

  return (
    
    <Group >
     
      <Line
        stroke={"black"}
        strokeWidth={props.notation==='Chen Notation' && (props.minimum === "one" || props.minimum === "1" || props.minimum >1)?5: 0.5}
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
       
        strokeWidth={props.notation==='Chen Notation' && (props.minimum === "one" || props.minimum === "1" || props.minimum >1)?4: 0}
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

export default Anchor;
