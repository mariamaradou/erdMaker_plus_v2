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
 
  entityWidthCrows,
  entityHeight,
  entityTextWidth,

  fontSize,
  textHeight,

} from "../../global/constants";




//ftiaxnw tin ontotita 


class AttributeCrows extends React.Component {


  state = { initialPosition: { x: this.props.x, y: this.props.y } };
  componentDidMount=() =>{
    if(this.props.components.notation==='Korth, Silberschatz & Sudarshan'){
   this.props.updatePositionExtensionChildren({
     id: this.props.parentId,
     dx: null,
     dy: null,
   })}
  }

  findParentIndex = (parent) => parent.id === this.props.parentId;
 
  componentWillUnmount=() =>{
    if(this.props.components.notation==='Korth, Silberschatz & Sudarshan'){
   this.props.updatePositionExtensionChildren({
     id: this.props.parentId,
     dx: null,
     dy: null,
   })}
  }

  

  render() {
    

    return (
      
      <Group 
        x={this.props.x}
        y={this.props.y}
       
        
        onTap={() => {
           
            this.props.deselect();
            this.props.select({
              type: "attribute",
              id: this.props.id,
              attrNum:this.props.attrNum,
              parentId: this.props.parentId,
              parentEntity: this.props.parentEntity,
              value:true
            });
          }}
          onMouseOver={(e) => {
            document.getElementsByClassName('stage')[0].focus();
            this.props.deselect();
            this.props.select({
              type: "attribute",
              id: this.props.id,
              attrNum:this.props.attrNum,
              parentId: this.props.parentId,
              parentEntity: this.props.parentEntity,
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
              type: "attribute",
              id: this.props.id,
              attrNum:this.props.attrNum,
              parentId: this.props.parentId,
              parentEntity: this.props.parentEntity,
              value:true
            });
            document.getElementsByClassName('react-contextmenu')[0].style.display='none'
          }}

        
        
      >
       
      
        <Rect
          
          x={-entityWidthCrows / 2}
          y={-entityHeight / 2}
          width={entityWidthCrows}
          height={entityHeight-10}
         // fill="#ffdd91"
        
         fillLinearGradientStartPoint={{ x: -50, y: -50 }}
         fillLinearGradientEndPoint={{ x: 50, y: 50 }}
         fillLinearGradientColorStops={[0, '#ff9b8e', 1, '#fa7564']}
          stroke={
            this.props.id === this.props.selector.current.id && this.props.selector.current.type === "attribute"
              ? "red"
              : "black"
          }
          strokeWidth={ this.props.id === this.props.selector.current.id && this.props.selector.current.type === "attribute"?0.7:0.5}
          
        />
       
        
        <Text
          text={(this.props.components.notation==='Bachman Notation' || this.props.components.notation==="Information Engineering Notation" ) && this.props.type.unique ?
           "* " + this.props.name: 
           this.props.type.unique && this.props.components.notation==='Barker Notation'?
            "# *" + this.props.name :
             this.props.type.optional && this.props.components.notation==='Barker Notation'?
             'o ' + this.props.name :
             this.props.components.notation==='Barker Notation'?
             '* ' + this.props.name
             :this.props.name}
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
  components: state.components.present,
});

const mapDispatchToProps = {
  updatePositionEntity,
  updateInitialPositionEntity,
  updatePositionChildren,
  repositionComponents,
  updatePositionExtensionChildren,
  select,
  deselect,
};

export default connect(mapStateToProps, mapDispatchToProps)(AttributeCrows);
