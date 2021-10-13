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
import { Group, Rect, Text } from "react-konva";
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
    var weakRectKorth = 
    this.props.type  === "weak" && this.props.components.notation==='Korth, Silberschatz & Sudarshan' ? (
      <Rect        //weak rect
      visible={this.props.components.notation==='Korth, Silberschatz & Sudarshan' && this.props.type==='weak'?true:false}
      x={-entityWidthCrows /1.9}
      y={-entityHeight /1.8}
      listening={false}
      width={entityWidthCrows*1.05}
      height={
        this.props.attributesNum===0 || this.props.components.hideAttribute ?
      entityHeight*1.1:
      this.props.attributesNum===1?
   
        entityHeight*(0.9+this.props.attributesNum):
        this.props.attributesNum===2?
   
        entityHeight*(0.7+this.props.attributesNum):
        this.props.attributesNum===3?
   
        entityHeight*(0.5+this.props.attributesNum):
        this.props.attributesNum===4?
   
        entityHeight*(0.3+this.props.attributesNum):
        this.props.attributesNum===5?
   
        entityHeight*(0.1+this.props.attributesNum):

        entityHeight*(this.props.attributesNum-0.3)}
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
      this.props.type  === "weak" && (this.props.components.notation!=='Korth, Silberschatz & Sudarshan' 
      && this.props.components.notation!=='UML Notation'
      && this.props.components.notation!=='Information Engineering Notation'
      && this.props.components.notation!=='Barker Notation' 
      && this.props.components.notation!== "Bachman Notation") ? (
        <Rect
      
          x={-entityWidthCrows / 2 + entityWeakOffset / 2}
          y={-entityHeight / 2 + entityWeakOffset / 2}
          width={entityWidthCrows - entityWeakOffset}
          height={entityHeight - entityWeakOffset}
        
         // fill="#ffdd91"
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
        />
      ) : null;

    

    return (
      
      <Group 
        x={this.props.x}
        y={this.props.y}
        //gia UML notation -- krivw to associative entity poy emfanizetai mono sti UML
       visible={ this.props.components.notation!=='UML Notation' && 
       this.props.components.relationships.find((relationship)=> relationship.id===this.props.parentId)?false:true}
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
            parentId: null,
            attrNum:null,
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
            attrNum:this.props.attributesNum,
            parentId: this.props.parentId,
            parentEntity: null,
           
            value:false
            
          });
          
        }}
        onMouseOut={(e) => {
          if(typeof document.getElementsByClassName('sidepanel sidepanel-active-right')[0]==='undefined'){
            this.props.deselect();
          }
         
         
          }}
        onClick={() => {
          
          this.setState({clicked:!this.state.clicked})
         
         this.props.deselect();
          
          //Emfanizetai to toolbar dipla kai dinei plirofories
          this.props.select({
            type: "entity",
            id: this.props.id,
            attrNum:this.props.attributesNum,
            parentId: this.props.parentId,
            parentEntity: null,
            
            value:true
            
          });
          document.getElementsByClassName('react-contextmenu')[0].style.display='none'
          
         
        }}
        
        

           

        dragBoundFunc={(pos) => this.stageBound(pos)}
      >
        {weakRectKorth}
      
        <Rect
          cornerRadius={ this.props.components.notation==='Barker Notation' && (this.props.components.hideAttribute || 
            this.props.attributesNum===0) ? [10, 10, 10, 10]:
          this.props.components.notation==='Barker Notation' && this.props.attributesNum!==0? [10,10,0,0] : [0,0,0,0]}
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
          strokeWidth={ this.props.id === this.props.selector.current.id && this.props.selector.current.type === "entity"?0.7:0.5}
        />
        
       
        
        {weakRect}
       
      
        
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
