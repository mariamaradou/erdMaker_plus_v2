import React from "react";
import EntityChen from "./Entity";

import Relationship from "./Relationship";
import Attribute from "./Attribute";
import EntityCrows from "./EntityCrows";
import ExtensionElmasri from "./ExtensionElmasri";
import ExtensionBatCerNav from "./ExtensionBatCerNav";
import Label from "./Label";
import SpecificValues from "./SpecificValues";
import Anchor from "./Anchor";
import AnchorChen from "./AnchorChen";
import AnchorMinMax from "./AnchorMinMax";
import AnchorBachman from "./AnchorBachman";
import AnchorBarker from "./AnchorBarker";
import AnchorKorth from "./AnchorKorth";
import { ExtensionSpline } from "./ExtensionElmasri";
import { Stage, Layer, Line, Rect, Arrow, Group, Text } from "react-konva";
import Properties from "./Properties";
import { Provider, ReactReduxContext, connect } from "react-redux";
//import AlertDialog from "./alertDialog";

import {
  deselect,
  select,
  addEntity,
  addRelationship,
  modifyExtension,
  addLabel,
} from "../../actions/actions";
import { distance, minJsonArray } from "../../global/utils";
import {
  stageWidth,
  stageHeight,
  entityWidth,
  entityHeight,
  anchorLength,
} from "../../global/constants";
import {
  ContextMenuTrigger,
  ContextMenu,
  MenuItem,
} from "../../../node_modules/react-contextmenu";
import AttributeCrows from "./AttributeCrows";
import AttributeBatCerNav from "./AttributeBatCerNav";
import AttributeKorth from "./AttributeKorth";
import { correctDirection, correctParticipation } from "./CorrectDirection";


class Surface extends React.Component {
   
  componentDidMount = () => {
    this.stage.focus();
  };

  componentWillUnmount = () => {
    this.props.deselect();
  };

  state = {
    positionPr: null,
    positionY: null,
    // Define the anchor points for entities

    entityAnchors: [
      {
        x: -(entityWidth / 2) - anchorLength,
        y: 0,
        angle: -90,
      },

      {
        x: -(entityWidth / 4),
       y: -(entityHeight / 2) - anchorLength,
        angle: 0,
      },
      {
        x: 0,
        y: -(entityHeight / 2) - anchorLength,
        angle: 0,
      },
      {
        x: entityWidth / 4,
        y: -(entityHeight / 2) - anchorLength,
        angle: 0,
      },
      {
        x: entityWidth / 2 + anchorLength,
     y: 0,
        angle: 90,
      },
      {
        x: entityWidth / 4,
        y: entityHeight / 2 + anchorLength,
        angle: 180,
      },
      {
        x: 0,
       y: entityHeight / 2 + anchorLength,
     
        angle: 180,
      },
      {
        x: -(entityWidth / 4),
       y: entityHeight / 2 + anchorLength,
     
        angle: 180,
      },
    ],

    entityAnchorsExt: [
      {
        x: -(entityWidth / 2) ,
        y: 0,
        angle: -90,
      },

      {
        x: -(entityWidth / 4),
       y: -(entityHeight / 2) ,
        angle: 0,
      },
      {
        x: 0,
        y: -(entityHeight / 2) ,
        angle: 0,
      },
      {
        x: entityWidth / 4,
        y: -(entityHeight / 2) ,
        angle: 0,
      },
      {
        x: entityWidth / 2 ,
     y: 0,
        angle: 90,
      },
      {
        x: entityWidth / 4,
        y: entityHeight / 2 ,
        angle: 180,
      },
      {
        x: 0,
       y: entityHeight / 2 ,
     
        angle: 180,
      },
      {
        x: -(entityWidth / 4),
       y: entityHeight / 2 ,
     
        angle: 180,
      },
    ],
  };

  drawEntities = () => {
    switch (this.props.components.notation) {
      case "Elmasri & Navathe Notation":
        var Entity = EntityChen;
        break;
      case "Information Engineering Notation":
        Entity = EntityCrows;
        break;
      case "Min-Max/ISO Notation":
        Entity = EntityChen;
        break;
      case "Bachman Notation":
        Entity = EntityCrows;
        break;
      case "Barker Notation":
        Entity = EntityCrows;
        break;
      case "Batini, Ceri & Navathe Notation":
        Entity = EntityChen;
        break;
      case "Korth, Silberschatz & Sudarshan":
        Entity = EntityCrows;
        break;
      default:
        Entity = EntityChen;
        break;
    }

    var entitiesList = [];
    this.props.components.entities.map((entity) =>
      entitiesList.push(
        <Entity
          key={entity.id}
          id={entity.id}
          name={entity.name}
          type={entity.type}
          x={entity.x}
          y={entity.y}
        />
      )
    );
    return entitiesList;
  };

  drawExtensions = () => {
   
    
    switch (this.props.components.notation) {
      case "Elmasri & Navathe Notation":
        var Extension = ExtensionElmasri;
        break;
      case "Information Engineering Notation":
        Extension = ExtensionElmasri;
        break;
      case "Min-Max/ISO Notation":
        Extension = ExtensionElmasri;
        break;
      case "Bachman Notation":
        Extension = ExtensionElmasri;
        break;
      case "Barker Notation":
        Extension = ExtensionElmasri;
        break;
      case "Batini, Ceri & Navathe Notation":
        Extension = ExtensionBatCerNav;
        break;
      default:
        Extension = ExtensionElmasri;
        break;
    }

    var extensionsList = [];
    this.props.components.extensions.map((extension) =>
      extensionsList.push(
        <Extension
          key={extension.id}
          id={extension.id}
          parentId={extension.parentId}
          type={extension.type}
          
          participation={extension.participation}
          cardinality={extension.cardinality}
         x={this.props.components.notation==="Korth, Silberschatz & Sudarshan" &&  extension.cardinality==='overlap'? extension.korthX:extension.x }
          y={this.props.components.notation==="Korth, Silberschatz & Sudarshan" &&  extension.cardinality==='overlap'?extension.korthY:extension.y}
       
        />
      )
    );

    return extensionsList;
  };

  drawRelationships = () =>
    this.props.components.relationships.map((relationship) => (
      <Relationship
        key={relationship.id}
        id={relationship.id}
        name={relationship.name}
        type={relationship.type}
        x={relationship.x}
        y={relationship.y}
      />
    ));

 

  drawAttributes =() => {
    var attributesList = [];
    if(this.props.components.notation==="Elmasri & Navathe Notation" || this.props.components.notation==="Teorey Notation"  || this.props.components.notation==="Min-Max/ISO Notation"){
      this.props.components.attributes.map((attribute) =>
      attributesList.push(
        <Attribute
          key={attribute.id}
          parentId={attribute.parentId}
          id={attribute.id}
          name={attribute.name}
          type={attribute.type}
          x={attribute.x
          }
          y={ attribute.y
          }
        />
      )
    );
    }
    else if (this.props.components.notation==="Information Engineering Notation" || this.props.components.notation==="Bachman Notation" ||  this.props.components.notation==="Barker Notation"  ){
      this.props.components.attributes.map((attribute) =>
      attributesList.push(
        <AttributeCrows
          key={attribute.id}
          parentId={attribute.parentId}
          id={attribute.id}
          name={attribute.name}
          type={attribute.type}
          x={attribute.initX}
          y={ attribute.initY
          }
        />
      )
    );
    }
   else if (this.props.components.notation==="Batini, Ceri & Navathe Notation"){
    this.props.components.attributes.map((attribute) =>
    attributesList.push(
      <AttributeBatCerNav
        key={attribute.id}
        parentId={attribute.parentId}
        id={attribute.id}
        name={attribute.name}
        type={attribute.type}
        x={attribute.x}
        y={ attribute.y
        }
      />
    )
  );
   }
    else if (this.props.components.notation==="Korth, Silberschatz & Sudarshan"){
      this.props.components.attributes.map((attribute) =>
     
    attributesList.push(
     this.props.components.entities.find((entity)=>entity.id===attribute.parentId) || this.props.components.attributes.find((entity)=>entity.id===attribute.parentId)?
      <AttributeCrows
        key={attribute.id}
        parentId={attribute.parentId}
        id={attribute.id}
        name={attribute.name}
        type={attribute.type}
        x={attribute.initX}
        y={ attribute.initY
        }
      />
      :  <AttributeKorth
      key={attribute.id}
      parentId={attribute.parentId}
      id={attribute.id}
      name={attribute.name}
      type={attribute.type}
      x={attribute.x}
      y={ attribute.y
      }
    /> )
  );
    }
  
     return attributesList }

    
      
  drawLabels = () =>
    this.props.components.labels.map((label) => (
      <Label
        key={label.id}
        id={label.id}
        text={label.text}
        x={label.x}
        y={label.y}
        width={label.width}
        height={label.height}
      />
    ));

  // Responsible  for drawing every line connecting things in the diagram

  drawLines = () => {
    
    // Used with array.findIndex() to find the index of the component with id = connectId
    function locateIndex(element) {
      return element.id === connectId;
    }

    

    var lineList = []; // The list with all the lines eventually being rendered
    var lockedAnchorPoints = []; // Array with the anchor points that are occupied for the current entity

    // I use connectId to find the index of the parent in its array and then finally retrieve its coordinates
    var connectId; // parentId of current attribute
    var index; // Index of component in its respective array with id = connectId
    var parentCoords; // Location of the parent component
    var childCoords; // Location of a child component

    var anchor; // Object that holds the location of the anchor to connect too and the angle at which it ll be displayed
    var specificValuesPoints; // Object that holds the location for specificValues text

    var keyIndex = 0; // Only used to distinguish items in a list

    // This loop creates the lines that connect attributes to their parents
   
      for (let i in this.props.components.attributes) {
        if (
          // na  traviksw grammes an isxuoun oi parakatw sinthikes
          this.props.components.notation !== "Information Engineering Notation" &&
          (this.props.components.notation !== "Korth, Silberschatz & Sudarshan" || (!this.props.components.entities.find((relationship)=> relationship.id===this.props.components.attributes[i].parentId) && !this.props.components.attributes.find((relationship)=> relationship.id===this.props.components.attributes[i].parentId)) ) &&
          this.props.components.notation !== "Bachman Notation" &&
          this.props.components.notation !== "Barker Notation" 
         
        ){
        connectId = this.props.components.attributes[i].parentId;
       
        if (
          (index = this.props.components.entities.findIndex(locateIndex)) !== -1
        ) {
          parentCoords = {
            x: this.props.components.entities[index].x,
            y: this.props.components.entities[index].y,
          };
        } else if (
          (index = this.props.components.relationships.findIndex(
            locateIndex
          )) !== -1
        ) {
          parentCoords = {
            x: this.props.components.relationships[index].x,
            y: this.props.components.relationships[index].y,
          };
        } else if (
          (index = this.props.components.attributes.findIndex(locateIndex)) !==
          -1
        ) {
          parentCoords = {
            x: this.props.components.attributes[index].x,
            y: this.props.components.attributes[index].y,
          };
        } else {
          continue;
        }
        lineList.push(
          <Group  key={keyIndex}>
          <Line
           
            stroke="black"
            strokeWidth={this.props.components.attributes[i].type.multivalued && this.props.components.notation==='Teorey Notation'?5:0.5}
            points={[
              this.props.components.attributes[i].x,
              this.props.components.attributes[i].y,
              parentCoords.x,
              parentCoords.y,
            ]}
            dash={
              this.props.components.notation === "Korth, Silberschatz & Sudarshan"
                ? [33, 10]
                : [0]
            }
          />
          
          <Line
         
          stroke="white"
          strokeWidth={this.props.components.attributes[i].type.multivalued && this.props.components.notation==='Teorey Notation'?4:0}
          points={[
            this.props.components.attributes[i].x,
            this.props.components.attributes[i].y,
            parentCoords.x,
            parentCoords.y,
          ]}
        />
        </Group>
        );
        keyIndex = keyIndex + 1;
      }
      }
    // This loop creates the lines that connect extensions to their parents and children
    for (let i in this.props.components.extensions) {
      // Extension-Children lines
    
    
      for (let j in this.props.components.extensions[i].xconnections) {
        connectId = this.props.components.extensions[i].xconnections[j].connectId; //h ontothta paidi
        
        if (
          (index = this.props.components.entities.findIndex(locateIndex)) !== -1
        ) {
          childCoords = {
            x: this.props.components.entities[index].x,
            y: this.props.components.entities[index].y,
          };
        } else {
          continue;
        }

        lineList.push(
          <Group key={keyIndex} >
             <Text text={'   total'} 
             visible={ this.props.components.notation === "Korth, Silberschatz & Sudarshan" && 
              this.props.components.extensions[i].participation === "total" &&   this.props.components.extensions[i].cardinality === "overlap"?true:false} 
              x={ this.props.components.extensions[i].korthX-65} 
              y={ this.props.components.extensions[i].korthY} 
              ></Text>
          <Line
            
            stroke={"black"}
           /* dash={
              this.props.components.notation === "Korth, Silberschatz & Sudarshan" &&  this.props.components.extensions[i].participation === "total"
                ? [33, 10]
                : [0]
            }*/
            strokeWidth={0.5}
            points={ this.props.components.notation === "Korth, Silberschatz & Sudarshan" &&   this.props.components.extensions[i].cardinality==='overlap' ?
            [
            childCoords.x ,
           childCoords.y ,
         
          this.props.components.extensions[i].korthX,

              this.props.components.extensions[i].korthY-17
         
        
          ]
        :  [
          childCoords.x,
          childCoords.y,
          this.props.components.extensions[i].x,

        this.props.components.extensions[i].y,
        //  this.props.components.extensions[i].x-40,        this is for batini, ceri & navathe (the line bending)
        //  this.props.components.extensions[i].y,
      
        ]
      }
          />
          <Arrow
              stroke={"black"}
              strokeWidth={0}
              visible={ this.props.components.notation==="Korth, Silberschatz & Sudarshan" &&  this.props.components.extensions[i].cardinality==='overlap' ? true: false}
              fill={"green"}
              pointerLength={40}
              pointerWidth={20}
              //rotation={this.props.angle}
              points={ this.props.components.notation === "Korth, Silberschatz & Sudarshan" &&  this.props.components.extensions[i].cardinality==='overlap' ?
                [
                childCoords.x,
                childCoords.y,
                this.props.components.extensions[i].korthX,

              this.props.components.extensions[i].korthY-17,
             
            
              ]
            :  [
              childCoords.x,
              childCoords.y,
              this.props.components.extensions[i].x,

            this.props.components.extensions[i].y,
            //  this.props.components.extensions[i].x-40,        this is for batini, ceri & navathe (the line bending)
            //  this.props.components.extensions[i].y,
          
            ]
          }
            ></Arrow>
          </Group>
        );
        keyIndex = keyIndex + 1;
        if (this.props.components.extensions[i].type === "specialize") {
          let extensionSplinePos = {
            x: (this.props.components.extensions[i].x + childCoords.x) / 2,
            y: (this.props.components.extensions[i].y + childCoords.y) / 2,
          };
          let angle =
            (Math.atan(
              (this.props.components.extensions[i].y - childCoords.y) /
                (this.props.components.extensions[i].x - childCoords.x)
            ) *
              180) /
            Math.PI;
          let auxAngle;
          if (childCoords.x > this.props.components.extensions[i].x)
            auxAngle = 90;
          else auxAngle = 270;
          angle = angle - auxAngle;
          if (
            this.props.components.notation !== "Batini, Ceri & Navathe Notation" && 
             this.props.components.notation !== "Korth, Silberschatz & Sudarshan" 
          ) {
            lineList.push(
              <ExtensionSpline
                key={keyIndex}
                
                x={extensionSplinePos.x}
                y={extensionSplinePos.y}
                angle={angle}
              />
            );
          }
          keyIndex = keyIndex + 1;
        } 
      }

      // Extension-Parent lines
      
      connectId = this.props.components.extensions[i].parentId;
     /////////////////////
     index = this.props.components.entities.findIndex(locateIndex);
    
     if(this.props.components.entities[index]!=='undefined'){
      if (this.props.components.entities[index].connectionCount > 8)
        continue;}

     // Get the nearest available anchor to this relationship for this connected entity
    anchor = this.findNearestAnchorExtend(lockedAnchorPoints, index, i);

    
     

     // etsi rythmizw se poio shmeio toy entity katalhgei h kathe grammi poy erxetai apo to relationship
     if (
       this.props.components.notation === "Information Engineering Notation" ||
       this.props.components.notation === "Bachman Notation" ||
       this.props.components.notation === "Barker Notation" ||
       this.props.components.notation === "Korth, Silberschatz & Sudarshan" 
     ) {
       switch (anchor.angle) {
         case -90:
           anchor.x = anchor.x - 25;

           break;
         case 180:
           anchor.y =
             anchor.y +
             this.props.components.entities[index].attributesNum * 39; //wste h grammi na paei katw apo ta attributes
           break;
         case 90:
           anchor.x = anchor.x + 25;
           break;
         default:
           break;
       }
     }

    ////////////////
     

      if (
        (index = this.props.components.entities.findIndex(locateIndex)) !== -1
      ) {
        parentCoords = {
          x: this.props.components.entities[index].x,
          y: this.props.components.entities[index].y,
        };
      } else {
        continue;
      }
      lineList.push(
        this.props.components.notation === "Batini, Ceri & Navathe Notation" || (this.props.components.notation ===  "Korth, Silberschatz & Sudarshan" && this.props.components.extensions[i].cardinality==='disjoint' ) ? (
          <Group key={keyIndex}>
            <Arrow
              stroke={"black"}
              strokeWidth={0}
              fill={"purple"}
              pointerLength={25}
              pointerWidth={15}
              //rotation={this.props.angle}
              points={
              
                [
              this.props.components.extensions[i].x,
              this.props.components.extensions[i].y,
            anchor.x,
             anchor.y,
            //  parentCoords.x,
             // parentCoords.y+20,
            ]} //to velaki gia na fainetai!
            ></Arrow>
             <Text text={'   total'} 
             visible={ this.props.components.notation === "Korth, Silberschatz & Sudarshan" && 
              this.props.components.extensions[i].participation === "total" &&   this.props.components.extensions[i].cardinality==='disjoint'?true:false} 
              x={anchor.angle===-90?anchor.x-50:anchor.angle===90?anchor.x+7:anchor.x} 
              y={anchor.angle===180?anchor.y+7:anchor.angle===0?anchor.y-18:anchor.y-21} 
              angle={anchor.angle}></Text>
             
            <Line
              stroke="purple"
              strokeWidth={
                (this.props.components.notation !==
                  "Batini, Ceri & Navathe Notation" && this.props.components.notation !== "Korth, Silberschatz & Sudarshan" )&&
                this.props.components.extensions[i].participation === "total"
                  ? 3.5
                  : 0.5
              }
              points={[
                this.props.components.extensions[i].x,
                this.props.components.extensions[i].y,
               // parentCoords.x,
                // parentCoords.y+20,  // prosoxi edw gia korth & silberschatz mono alliws thema me velaki
              anchor.x,
              anchor.y
              ]}
            />
          </Group>
        ) : (
          <Line
            key={keyIndex}
            stroke="black"
            
            visible={this.props.components.notation==="Korth, Silberschatz & Sudarshan" &&  this.props.components.extensions[i].cardinality==='overlap'?false:true}
            strokeWidth={
              this.props.components.extensions[i].participation === "total" &&   this.props.components.extensions[i].type!=='aggregation'
                ? 3.5
                : 0.5
            }
            points={[
              this.props.components.extensions[i].x,
              this.props.components.extensions[i].y,
              parentCoords.x,
              parentCoords.y,
            ]}
          />
        )
      );
      keyIndex = keyIndex + 1;

      // aspri grammi gia to efe tis diplis grammis se total kai partial participation
      if (
        this.props.components.notation !== "Batini, Ceri & Navathe Notation" && this.props.components.notation !== "Korth, Silberschatz & Sudarshan"
      ) {
        if (this.props.components.extensions[i].participation === "total" &&   this.props.components.extensions[i].type!=='aggregation' ) {
          lineList.push(
            <Line
              key={keyIndex}
              stroke="white"
              strokeWidth={2}
              points={[
                this.props.components.extensions[i].x,
                this.props.components.extensions[i].y,
                parentCoords.x,
                parentCoords.y ,
              ]}
            />
          );
          keyIndex = keyIndex + 1;
        }
        
        

        if (this.props.components.extensions[i].type === "union") {
          let extensionSplinePos = {
            x: (this.props.components.extensions[i].x + parentCoords.x) / 2,
            y: (this.props.components.extensions[i].y + parentCoords.y) / 2,
          };
          let angle =
            (Math.atan(
              (this.props.components.extensions[i].y - parentCoords.y) /
                (this.props.components.extensions[i].x - parentCoords.x)
            ) *
              180) /
            Math.PI;
          let auxAngle;
          if (parentCoords.x > this.props.components.extensions[i].x)
            auxAngle = 90;
          else auxAngle = 270;
          angle = angle - auxAngle;
          if (
            this.props.components.notation !== "Batini, Ceri & Navathe Notation" &&
            this.props.components.notation !== "Korth, Silberschatz & Sudarshan"
          ) {
            lineList.push(
              <ExtensionSpline
                key={keyIndex}
                
                x={extensionSplinePos.x}
                y={extensionSplinePos.y}
                angle={angle}
                
              />
            );
          }

          keyIndex = keyIndex + 1;
        } }
      
    }

    // This loop creates the lines that connect relationships with entities
  
      for (let i = 0; i < this.props.components.relationships.length; i++) {

     
     
     ////////////////swstos kwdikas///////////
       for (
        let j = 0;
        j < this.props.components.relationships[i].connections.length;
        j++
      ) {
        if (
          this.props.components.relationships[i].connections[j].connectId !== 0
        ) {
          connectId = this.props.components.relationships[i].connections[j].connectId;
          index = this.props.components.entities.findIndex(locateIndex);
       
          // If current connection 8 connections don't draw any line
          if(this.props.components.entities[index]!=='undefined'){
          if (this.props.components.entities[index].connectionCount > 8)
            continue;}
            

          // Get the nearest available anchor to this relationship for this connected entity
          anchor = this.findNearestAnchor(lockedAnchorPoints, index, i);

          specificValuesPoints = this.calculateSpecificValuesPoints(
            anchor,
            this.props.components.relationships[i]
          );
          

          // etsi rythmizw se poio shmeio toy entity katalhgei h kathe grammi poy erxetai apo to relationship
          if (
            this.props.components.notation === "Information Engineering Notation" ||
            this.props.components.notation === "Bachman Notation" ||
            this.props.components.notation === "Barker Notation" ||
            this.props.components.notation === "Korth, Silberschatz & Sudarshan" 
          ) {
            switch (anchor.angle) {
              case -90:
                anchor.x = anchor.x - 25;

                break;
              case 180:
                anchor.y =
                  anchor.y +
                  this.props.components.entities[index].attributesNum * 39; //wste h grammi na paei katw apo ta attributes
                break;
              case 90:
                anchor.x = anchor.x + 25;
                break;
              default:
                break;
            }
          }

          lineList.push(
            <Line //main line (anchor not included)
              key={keyIndex}
              stroke="black"
              strokeWidth={0.5}
              dash={
                this.props.components.notation === "Barker Notation" &&
                this.props.components.relationships[i].connections[j].min ===
                  "zero"
                  ? [33, 10]
                  : [0]
              }
              points={[
                this.props.components.relationships[i].x,
                this.props.components.relationships[i].y,
                anchor.x,
                anchor.y,
              ]}
            />
          );

          keyIndex = keyIndex + 1;

          //edw mpainei o anchor gia participation & cardinality
          switch (this.props.components.notation) {
            case "Information Engineering Notation":
              var CardPart = Anchor;
              break;
            case "Elmasri & Navathe Notation":
              CardPart = AnchorChen;
              break;
            case "Min-Max/ISO Notation":
              CardPart = AnchorMinMax;
              break;
            case "Bachman Notation":
              CardPart = AnchorBachman;
              break;
            case "Barker Notation":
              CardPart = AnchorBarker;
              break;
            case "Batini, Ceri & Navathe Notation":
              CardPart = AnchorMinMax;
              break;
            case "Teorey Notation":
              CardPart = AnchorChen;
              break;
            case "Korth, Silberschatz & Sudarshan":
              CardPart = AnchorKorth
              break;
            default:
              CardPart = AnchorChen;
              break;
          }
           
          lineList.push(
            <CardPart
              key={keyIndex}
              notation={this.props.components.notation}
              relx={this.props.components.relationships[i].x}
              rely={this.props.components.relationships[i].y}
              x={anchor.x}
              y={anchor.y}
              angle={anchor.angle}
              minimum={
               // this.props.components.relationships[i].connections[j].min
               correctParticipation( this.props.components.relationships[i].connections[j].min,this.props.components.relationships[i],this.props.components.participationDirection,j)
              }
              maximum={
               // this.props.components.relationships[i].connections[j].max
               correctDirection( this.props.components.relationships[i].connections[j].max,this.props.components.relationships[i],this.props.components.cardinalityDirection,j)
              }
              exactMin={
               // this.props.components.relationships[i].connections[j].exactMin
              // this.props.components.relationships[i].connections[j].min
              correctParticipation( this.props.components.relationships[i].connections[j].min,this.props.components.relationships[i],this.props.components.participationDirection,j)
              }
              exactMax={
               // this.props.components.relationships[i].connections[j].exactMax
              // this.props.components.relationships[i].connections[j].max
              correctDirection( this.props.components.relationships[i].connections[j].max,this.props.components.relationships[i],this.props.components.cardinalityDirection,j)
              }
            />
          );
      
          keyIndex = keyIndex + 1;

          if (this.props.components.relationships[i].connections[j].role) {
            lineList.push(
              <SpecificValues
                key={keyIndex}
                x={specificValuesPoints.roleTextPos.x}
                y={specificValuesPoints.roleTextPos.y}
                text={
                  this.props.components.relationships[i].connections[j].role
                }
              />
            );
            keyIndex = keyIndex + 1;
          }

          
        }
      }
    } 
    /////////////////swstos kwdikas//////////////
    return lineList;
  };

  // Calculates locations for specific values
  calculateSpecificValuesPoints = (anchor, relationship) => {
    // Place role text between relationship and entity
    var roleTextPos = {
      x: (anchor.x + relationship.x) / 2,
      y: (anchor.y + relationship.y) / 2,
    };

    // Relatively position anchor text based on the angle of the anchor
    var anchorTextPoint = { x: anchor.x, y: anchor.y };
    switch (anchor.angle) {
      case 0:
        anchorTextPoint.y -= 15;
        break;
      case 90:
        anchorTextPoint.x += 25;
        break;
      case 180:
        anchorTextPoint.y += 15;
        break;
      case -90:
        anchorTextPoint.x -= 25;
        break;
      default:
        break;
    }
    return { roleTextPos: roleTextPos, anchorTextPoint: anchorTextPoint };
  };

  findNearestAnchor = (lockedAnchorPoints, entityIndex, relationshipIndex) => {
    var distances = []; // All distances from the relationship to the entity's anchors
    var anchorId;
    for (let i in this.state.entityAnchors) {
      anchorId =
        this.props.components.entities[entityIndex].id.toString() +
        i.toString();

      // If current anchor is occupied then ignore it, else include its distance for calculation
      if (!lockedAnchorPoints.includes(anchorId)) {
        distances.push({
          anchorIndex: i,
          anchorId: anchorId,
          distance: distance(
            {
              x:
                this.props.components.entities[entityIndex].x +
                this.state.entityAnchors[i].x,
              y:
                this.props.components.entities[entityIndex].y +
                this.state.entityAnchors[i].y,
            },
            {
              x: this.props.components.relationships[relationshipIndex].x,
              y: this.props.components.relationships[relationshipIndex].y,
            }
          ),
        });
      }
    }

    
    var min = minJsonArray(distances, "distance"); // Get the anchor with the smallest distance
    lockedAnchorPoints.push(min.anchorId);
    return {
      x:
        this.props.components.entities[entityIndex].x +
        this.state.entityAnchors[min.anchorIndex].x,
      y:
        this.props.components.entities[entityIndex].y +
        this.state.entityAnchors[min.anchorIndex].y,
      angle: this.state.entityAnchors[min.anchorIndex].angle,
    };
  };

  findNearestAnchorExtend = (lockedAnchorPoints, entityIndex, extensionIndex) => {
    var distances = []; // All distances from the relationship to the entity's anchors
    var anchorId;
    //console.log('entityIndex',entityIndex)
    for (let i in this.state.entityAnchorsExt) {
      anchorId =
        this.props.components.entities[entityIndex].id.toString() +
        i.toString();

      // If current anchor is occupied then ignore it, else include its distance for calculation
      if (!lockedAnchorPoints.includes(anchorId)) {
        distances.push({
          anchorIndex: i,
          anchorId: anchorId,
          distance: distance(
            {
              x:
                this.props.components.entities[entityIndex].x +
                this.state.entityAnchorsExt[i].x,
              y:
                this.props.components.entities[entityIndex].y +
                this.state.entityAnchorsExt[i].y,
            },
            {
              x: this.props.components.extensions[extensionIndex].x,
              y: this.props.components.extensions[extensionIndex].y,
            }
          ),
        });
      }
    }

    
    var min = minJsonArray(distances, "distance"); // Get the anchor with the smallest distance
    lockedAnchorPoints.push(min.anchorId);
    return {
      x:
        this.props.components.entities[entityIndex].x +
        this.state.entityAnchorsExt[min.anchorIndex].x,
      y:
        this.props.components.entities[entityIndex].y +
        this.state.entityAnchorsExt[min.anchorIndex].y,
      angle: this.state.entityAnchorsExt[min.anchorIndex].angle,
    };
  };

  menu = () => {
    document.getElementsByClassName("react-contextmenu")[0].style.display =
      "block";
  };
  stageClicked = (e) => {
    console.log(this.props.components);
    if (e.target === e.target.getStage()) {
      this.props.deselect();
      this.setState({
        positionPr: e.evt.clientX + this.stage.scrollLeft,
        positionY: e.evt.clientY + this.stage.scrollTop,
      });
    }
  };

  getStage = () => this.stage; // Get reference to the stage

  clickedButtons = (e) => {
    if (e.keyCode === 17) {
      //  console.log('state is: ',this.state)
    } else if (e.keyCode === 27) {
      this.props.deselect();
      this.getStage();
    } else if (e.keyCode === 82) {
      this.props.addRelationship({
        x:
          this.state.positionPr == null
            ? document.querySelector(".stage").scrollLeft +
              window.innerWidth / 2
            : this.state.positionPr,
        y:
          this.state.positionPr == null
            ? document.querySelector(".stage").scrollTop +
              window.innerHeight / 2
            : this.state.positionY,
      });
      this.props.select({
        type: "relationship",
        id: this.props.components.count + 1,
        parentId: null,
      });
      this.setState({ toolsListActive: !this.state.toolsListActive });
    } else if (e.keyCode === 69) {
      this.props.addEntity({
        x:
          this.state.positionPr == null
            ? document.querySelector(".stage").scrollLeft +
              window.innerWidth / 2
            : this.state.positionPr,
        y:
          this.state.positionY == null
            ? document.querySelector(".stage").scrollTop +
              window.innerHeight / 2
            : this.state.positionY,
      });
      this.props.select({
        type: "entity",
        id: this.props.components.count + 1,
        parentId: null,
      });
      this.setState({ toolsListActive: !this.state.toolsListActive });
    } else if (e.keyCode === 76) {
      this.props.addLabel({
        x:
          this.state.positionPr == null
            ? document.querySelector(".stage").scrollLeft +
              window.innerWidth / 2
            : this.state.positionPr,
        y:
          this.state.positionPr == null
            ? document.querySelector(".stage").scrollTop +
              window.innerHeight / 2
            : this.state.positionY,
      });
      this.props.select({
        type: "label",
        id: this.props.components.count + 1,
        parentId: null,
      });
      this.setState({ toolsListActive: !this.state.toolsListActive });
    }
  };

  propertiesHide() {
    document.getElementsByClassName("sidepanel")[0].style.display = "none";
  }

  render() {
    return (
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <div>
            <ContextMenuTrigger id="same_unique_identifier" holdToDisplay={-1}>
              <div
                ref={(ref) => (this.stage = ref)}
                onScroll={this.propertiesHide}
                className="stage"
                tabIndex={1}
                onKeyDown={this.clickedButtons}
                onFocus={() => this.menu()}
              >
                <Stage
                  width={stageWidth}
                  height={stageHeight}
                  onClick={(e) => this.stageClicked(e)}
                >
                  <Provider store={store}>
                    <Layer>
                      <Rect
                        width={stageWidth}
                        height={stageHeight}
                        fill="#f9ffff"
                        listening={false}
                        x={0}
                        y={0}
                        className="canvas"
                      ></Rect>
                     {this.drawLines()}
                      {this.drawExtensions()}
                      {this.drawRelationships()}
                      {this.drawEntities()}
                      {this.drawAttributes()}
                      {this.drawLabels()}
                      
                    </Layer>
                  </Provider>
                </Stage>
              </div>

              <div id="properties">
                <Properties getStage={this.getStage} />
              </div>
            </ContextMenuTrigger>

            <ContextMenu id="same_unique_identifier">
              <MenuItem
               id="data 1"
                data={{ item: this.props }}
                onClick={(e) => {
                  this.props.addEntity({
                    x: e.clientX + this.stage.scrollLeft,
                    y: e.clientY + this.stage.scrollTop,
                  });
                  this.props.select({
                    type: "entity",
                    id: this.props.components.count + 1,
                    parentId: null,
                  });
                  this.setState({
                    toolsListActive: !this.state.toolsListActive,
                  });
                }}
              >
                New Entity
              </MenuItem>
              <MenuItem>
                <hr></hr>
              </MenuItem>
              <MenuItem
               id="data 2"
                data={{ item: "item 2" }}
                onClick={(e) => {
                  this.props.addRelationship({
                    x: e.clientX + this.stage.scrollLeft,
                    y: e.clientY + this.stage.scrollTop,
                  });
                  this.props.select({
                    type: "relationship",
                    id: this.props.components.count + 1,
                    parentId: null,
                  });
                  this.setState({
                    toolsListActive: !this.state.toolsListActive,
                  });
                }}
              >
                New Relationship
              </MenuItem>
              <MenuItem>
                <hr></hr>
              </MenuItem>
              <MenuItem
                id="data 3"
                data={{ item: "item 3" }}
                onClick={(e) => {
                  this.props.addLabel({
                    x: e.clientX + this.stage.scrollLeft,
                    y: e.clientY + this.stage.scrollTop,
                  });
                  this.props.select({
                    type: "label",
                    id: this.props.components.count + 1,
                    parentId: null,
                  });
                  this.setState({
                    toolsListActive: !this.state.toolsListActive,
                  });
                }}
              >
                New Label
              </MenuItem>
            </ContextMenu>
          </div>
        )}
      </ReactReduxContext.Consumer>
    );
  }
}

const mapStateToProps = (state) => ({
  components: state.components.present,
  selector: state.selector,
});

const mapDispatchToProps = {
  deselect,
  select,
  modifyExtension,
  addEntity,
  addRelationship,
  addLabel,
};

export default connect(mapStateToProps, mapDispatchToProps)(Surface);
