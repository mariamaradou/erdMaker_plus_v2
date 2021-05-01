import React from "react";
import { connect } from "react-redux";
import {
  updatePositionEntity,
  updatePositionChildren,
  repositionComponents,
//  updateInitialPositionChildren,
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
  

  findParentIndex = (parent) => parent.id === this.props.parentId;
 


  

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
              parentId: this.props.parentId,
            });
          }}
          onClick={() => {
           
            this.props.deselect();
            this.props.select({
              type: "attribute",
              id: this.props.id,
              parentId: this.props.parentId,
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
          strokeWidth={0.5}
          
        />
       
        
        <Text
          text={this.props.components.notation==='Bachman Notation' && this.props.type.unique ?
           "★ " + this.props.name: 
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
  select,
  deselect,
};

export default connect(mapStateToProps, mapDispatchToProps)(AttributeCrows);
