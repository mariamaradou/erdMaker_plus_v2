import React from "react";
import { connect } from "react-redux";
import {
  updatePositionEntity,
  updatePositionChildren,
  repositionComponents,
  updatePositionExtensionChildren,
//  updateInitialPositionChildren,
  updateInitialPositionEntity,
  select,
  deselect,
} from "../../actions/actions";
import { Group, Rect, Line, Text } from "react-konva";
import {
  stageWidth,
  stageHeight,
  entityWidth,
  entityHeight,
  entityTextWidth,
  entityWeakOffset,
  fontSize,
  textHeight,
  dragBoundOffset,
} from "../../global/constants";




//ftiaxnw tin ontotita 


class EntityChen extends React.Component {
  state = { initialPosition: { x: this.props.x , y: this.props.y } };

 
 
  // Does not let the entity to be dragged out of stage bounds
  stageBound = (pos) => {
    var newX;
    var newY;

    if (pos.x > stageWidth / 2)
      newX =
        pos.x > stageWidth - entityWidth / 2 - dragBoundOffset ? stageWidth - entityWidth / 2 - dragBoundOffset : pos.x;
    else newX = pos.x < entityWidth / 2 + dragBoundOffset ? entityWidth / 2 + dragBoundOffset : pos.x;

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

  render() {
    
    var weakRect =
      this.props.type === "weak" ? (
        <Rect
      
          x={-entityWidth / 2 + entityWeakOffset / 2}
          y={-entityHeight / 2 + entityWeakOffset / 2}
          width={entityWidth - entityWeakOffset}
          height={entityHeight - entityWeakOffset}
          listening={false}
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
      
          listening={false}
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
            entityWidth / 2,
            0, // RIGHT
            0,
            entityHeight / 2, // BOTTOM
            -entityWidth / 2,
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
            attrNum:null,
            parentId: null,
            parentEntity: null,
            value:true
          });
        }}
        onMouseOver={(e) => {
          document.getElementsByClassName('stage')[0].focus();
          this.props.deselect();
          this.props.select({
            type: "entity",
            id: this.props.id,
            attrNum:null,
            parentEntity:null,
            parentId: null,
            value:false
           
          }); 
          
        }}
        onMouseOut={(e) => {
          if(typeof document.getElementsByClassName('sidepanel sidepanel-active-right')[0]==='undefined'){
            this.props.deselect();
          }
         
         
          }}
        onClick={() => {
           this.props.deselect();
          
          
          this.props.select({
            type: "entity",
            id: this.props.id,
            attrNum:null,
            parentId: null,
            parentEntity: null,
            value:true
            
          });
          document.getElementsByClassName('react-contextmenu')[0].style.display='none'
          
         
        }}
        
        

           

        dragBoundFunc={(pos) => this.stageBound(pos)}
      >
       
      
        <Rect
          
          x={-entityWidth / 2}
          y={-entityHeight / 2}
          width={entityWidth}
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
         
          strokeWidth={ this.props.id === this.props.selector.current.id && this.props.selector.current.type === "entity"?0.7:0.5}
          
        />
        {weakRect}
        {associativeDiamond}
        
        <Text
          text={this.props.name}
          fontSize={fontSize}
          align="center"
          verticalAlign="middle"
          width={entityTextWidth}
          height={textHeight}
          offsetX={entityTextWidth / 2}
          offsetY={textHeight / 2}
          listening={false}
        /> 
      
        
     
      </Group>
     
    );
  }
}


const mapStateToProps = (state) => ({
  selector: state.selector,
});

const mapDispatchToProps = {
  updatePositionEntity,
//  updateInitialPositionChildren,
  updateInitialPositionEntity,
  updatePositionChildren,
  updatePositionExtensionChildren,
  repositionComponents,
  select,
  deselect,
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityChen);
