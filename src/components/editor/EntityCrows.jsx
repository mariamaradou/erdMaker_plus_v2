import React from "react";
import { connect } from "react-redux";
import {
  updatePositionEntity,
  updatePositionChildren,
  repositionComponents,
//  updateInitialPositionChildren,
updatePositionExtensionChildren,
updateInitialPositionEntity,
  select,
  deselect,
} from "../../actions/actions";
import { Group, Rect, Line, Text } from "react-konva";
import {
  stageWidth,
  stageHeight,
  
  entityHeight,
  entityWidthCrows,
  entityTextWidthCrows,
  entityWeakOffset,
  fontSize,
  textHeight,
  dragBoundOffset,
} from "../../global/constants";




//ftiaxnw tin ontotita 


class EntityCrows extends React.Component {
  state = { initialPosition: { x: this.props.x , y: this.props.y } };

 componentDidMount=() =>{
   if(this.props.components.notation==='Korth, Silberschatz & Sudarshan'){
  this.props.updatePositionExtensionChildren({
    id: this.props.id,
    dx: null,
    dy: null,
  })}
 }
 
  // Does not let the entity to be dragged out of stage bounds
  stageBound = (pos) => {
    var newX;
    var newY;

    if (pos.x > stageWidth / 2)
      newX =
        pos.x > stageWidth - entityWidthCrows / 2 - dragBoundOffset ? stageWidth - entityWidthCrows / 2 - dragBoundOffset : pos.x;
    else newX = pos.x < entityWidthCrows / 2 + dragBoundOffset ? entityWidthCrows / 2 + dragBoundOffset : pos.x;

    if (pos.y > stageHeight / 2)
      newY =
        pos.y > stageHeight - entityHeight / 2 - dragBoundOffset
          ? stageHeight - entityHeight / 2 - dragBoundOffset
          : pos.y;
    else newY = pos.y < entityHeight / 2 + dragBoundOffset ? entityHeight / 2 + dragBoundOffset : pos.y;

    return {
      x: newX,
      y: newY,
    };
  };

 /* fillAttributes=()=>{  
    var attributeslist=[];
   
    this.props.components.attributes.filter((attribute) => attribute.parentId === this.props.id).map(
      (attribute)=>attributeslist.push(attribute.name)
    )
  return attributeslist.join('\n');
  
 

  }*/

  render() {
    var weakReactKorth = 
    this.props.type  === "weak" && this.props.components.notation==='Korth, Silberschatz & Sudarshan' ? (
      <Rect        //weak rect
      visible={this.props.components.notation==='Korth, Silberschatz & Sudarshan' && this.props.type==='weak'?true:false}
      x={-entityWidthCrows /1.81}
      y={-entityHeight / 1.6}
      width={entityWidthCrows*1.1}
      height={this.props.attributesNum===0?
      entityHeight*1.3:
      this.props.attributesNum===1?
   
        entityHeight*(1.1+this.props.attributesNum):
        entityHeight*(0.8+this.props.attributesNum)}
     // fill="#ffdd91"
   
     fillLinearGradientStartPoint={{ x: -50, y: -50 }}
     fillLinearGradientEndPoint={{ x: 50, y: 50 }}
     fillLinearGradientColorStops={[0, '#fae4b4', 1, '#ffdd91']}
      stroke={
        this.props.id === this.props.selector.current.id && this.props.selector.current.type === "entity"
          ? "red"
          : "black"
      }
      strokeWidth={0.5}
    />): null;
    var weakRect =
      this.props.type  === "weak" && this.props.components.notation!=='Korth, Silberschatz & Sudarshan' ? (
        <Rect
      
          x={-entityWidthCrows / 2 + entityWeakOffset / 2}
          y={-entityHeight / 2 + entityWeakOffset / 2}
          width={entityWidthCrows - entityWeakOffset}
          height={entityHeight - entityWeakOffset}
        
         // fill="#ffdd91"
         fillLinearGradientStartPoint={{ x: -50, y: -50 }}
         fillLinearGradientEndPoint={{ x: 50, y: 50 }}
         fillLinearGradientColorStops={[0, '#fae4b4', 1, '#ffdd91']}
          stroke={
            this.props.id === this.props.selector.current.id && this.props.selector.current.type === "entity"
              ? "red"
              : "black"
          }
          strokeWidth={0.5}
        />
      ) : null;

    var associativeDiamond =
      this.props.type === "associative" ? (
        <Line
        fillLinearGradientStartPoint={{ x: -50, y: -50 }}
        fillLinearGradientEndPoint={{ x: 50, y: 50 }}
        fillLinearGradientColorStops={[0, '#fae4b4', 1, '#ffdd91']}
      
          
          stroke={
            this.props.id === this.props.selector.current.id && this.props.selector.current.type === "entity"
              ? "red"
              : "black"
          }
          strokeWidth={0.5}
          lineJoin="bevel"
          closed
          points={[
            0,
            -entityHeight / 2, // TOP
            entityWidthCrows / 2,
            0, // RIGHT
            0,
            entityHeight / 2, // BOTTOM
            -entityWidthCrows / 2,
            0, // LEFT
          ]}
        />
      ) : null;

    return (
      
      <Group 
        x={this.props.x}
        y={this.props.y}
       
        draggable
        //diko moy gia history
        onDragStart={(e) => {
         
          
          this.props.updateInitialPositionEntity({
            id: this.props.id,
            x: e.target.x(),
            y: e.target.y(),
          });
      
         this.setState({
            initialPosition: { x: e.target.x(), y: e.target.y() },
          });
        }}
        //
        onDragMove={(e) => {
         
         
          
          this.props.updatePositionEntity({
            id: this.props.id,
            x: e.target.x(),
            y: e.target.y(),
          });
          this.props.updatePositionChildren({
            id: this.props.id,
            dx: e.target.x() - this.state.initialPosition.x,
            dy: e.target.y() - this.state.initialPosition.y,
          });
       
         this.props.updatePositionExtensionChildren(
          this.props.components.extensions.find((extension)=> extension.cardinality==='overlap') ?{
            id: this.props.id,
            dx: e.target.x() - this.state.initialPosition.x,
            dy: e.target.y() - this.state.initialPosition.y,
          }:{id: this.props.id,
          dx: null,
          dy: null});
         this.setState({
            initialPosition: { x: e.target.x(), y: e.target.y() },
          });
        }}
        onDragEnd={(e) =>{ 
          this.props.repositionComponents()}}
        onTap={() => {
          this.props.deselect();
          this.props.select({
            type: "entity",
            id: this.props.id,
            parentId: null
          });
        }}
       
        onClick={() => {
          
          this.setState({clicked:!this.state.clicked})
         
         this.props.deselect();
          
          //Emfanizetai to toolbar dipla kai dinei plirofories
          this.props.select({
            type: "entity",
            id: this.props.id,
            parentId: null,
            selection:this.state.clicked
            
          });
          document.getElementsByClassName('react-contextmenu')[0].style.display='none'
          
         
        }}
        
        

           

        dragBoundFunc={(pos) => this.stageBound(pos)}
      >
        {weakReactKorth}
      
        <Rect
          
          x={-entityWidthCrows / 2}
          y={-entityHeight / 2}
          width={entityWidthCrows}
          height={entityHeight}
         // fill="#ffdd91"
       
          fillLinearGradientStartPoint={{ x: -50, y: -50 }}
          fillLinearGradientEndPoint={{ x: 50, y: 50 }}
          fillLinearGradientColorStops={[0, '#fae4b4', 1, '#ffdd91']}
          stroke={
            this.props.id === this.props.selector.current.id && this.props.selector.current.type === "entity"
              ? "red"
              : "black"
          }
          strokeWidth={0.5}
        />
        
       
        
        {weakRect}
       
        {associativeDiamond}
        
        <Text
          text={this.props.name}
          fontSize={fontSize}
          align="center"
          verticalAlign="middle"
          width={entityTextWidthCrows}
          height={textHeight}
          offsetX={entityTextWidthCrows / 2}
          offsetY={textHeight / 2}
          listening={false}
        /> 
       
      


      </Group>
     
    );
  }
}


const mapStateToProps = (state) => ({
  selector: state.selector,
  components:state.components.present,
});

const mapDispatchToProps = {
  updatePositionEntity,
//  updateInitialPositionChildren,
updatePositionExtensionChildren,
  updateInitialPositionEntity,
  updatePositionChildren,
  repositionComponents,
  select,
  deselect,
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityCrows);
