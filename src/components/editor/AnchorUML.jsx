import React from "react";
import { Group, Line, Text, Rect } from "react-konva";

//sxediasmos plithikothtwn sta relatioships

const AnchorUML = (props) => {
  var mandatory =
    props.minimum === "zero" ? ( //cardinality one
      <Text
        text={props.maximum ? "(0.. " : "(0..)"}
        x={
          props.angle === 180 || props.angle === 0
            ? props.x + 5
            : props.angle === -90
            ? props.x - 18
            : props.x - 4
        }
        y={
          Math.abs(props.angle) === 90
            ? props.y - 18
            : props.y - Math.abs(props.angle / 10)
        }
        fontSize={13}
      ></Text>
    ) : null;

  var optional =
    props.minimum === "one" ? ( //cardinality one
      <Text
        text={props.maximum ? "(1.. " : "(1..)"}
        x={
          props.angle === 180 || props.angle === 0
            ? props.x + 5
            : props.angle === -90
            ? props.x - 18
            : props.x - 4
        }
        y={
          Math.abs(props.angle) === 90
            ? props.y - 18
            : props.y - Math.abs(props.angle / 10)
        }
        fontSize={13}
      ></Text>
    ) : null;

 

  var one =
    props.maximum === "one" ? ( //participation one
      <Text
        text={props.minimum ? "   1)" : "(..1)"}
         x={
          props.angle === 180 || props.angle === 0
            ? props.x + 8
            : props.angle === -90
            ? props.x - 15
            : props.x
        }
        y={
          Math.abs(props.angle) === 90
            ? props.y - 18
            : props.y - Math.abs(props.angle / 10)
        }
        fontSize={13}
      ></Text>
    ) : null;

  var many =
    (props.maximum === "many"  ) ? ( //participation many
      <Text
        text={props.minimum ? "    *)" : "(..*)"}
        x={
          props.angle === 180 || props.angle === 0
            ? props.x + 8
            : props.angle === -90
            ? props.x - 15
            : props.x
        }
        y={
          Math.abs(props.angle) === 90
            ? props.y - 18
            : props.y - Math.abs(props.angle / 10)
        }
        fontSize={13}
      ></Text>
    ) : null;

    var specificValuesText = (
      <Text
        text={
          
          (props.exactMin === "" ? "-" : props.exactMin==='zero'?"0": props.exactMin==='one'?'1': props.exactMin) +
          ".." +
          (props.exactMax === "" ? "-" : (props.exactMax==='many'|| props.maximum === "n" || props.maximum === "N")?'*': props.exactMax==="one"?"1": props.exactMax) 
          
        }
        x={
          props.angle === 180 || props.angle === 0
            ? props.x + 12
            : props.angle === -90
            ? props.x - 18
            : props.x - 4
        }
        y={
          Math.abs(props.angle) === 90
            ? props.y - 18
            : props.y - Math.abs(props.angle / 10)
        }
      />
    );

  if (props.exactMin || props.exactMax)
  return (
    <Group>
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
   
      {specificValuesText}
      
    </Group>
  );

  else return  (
    <Group>
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
  
  
};

export default AnchorUML;
