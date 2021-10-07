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
import { Group, Rect, Text, Line } from "react-konva";
import {
 
  entityWidthCrows,
  entityHeight,
  entityTextWidth,
  attributeTextWidth,
  fontSize,
  textHeight,

} from "../../global/constants";


var pixelWidth = require("string-pixel-width");



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
    var namePixelWidth = pixelWidth(this.props.name, {
      font: "Arial",
      size: fontSize,
    });
    var textRows = Math.ceil(namePixelWidth / attributeTextWidth);
    var parentIndex;
    if (
      this.props.components.entities.length &&
      (parentIndex = this.props.components.entities.findIndex(this.findParentIndex)) !== -1
    ) {
      if (this.props.type.unique && this.props.components.entities[parentIndex].type === "weak" && !(this.props.components.notation==='Information Engineering Notation')) {
        var dashedUnderlineList = [];
        if (textRows < 4) {
          for (let i = 0; i < textRows; i++) {
            let lineOffset =
              textRows % 2
                ? fontSize / 2 + 0.8 + i * fontSize - Math.floor(textRows / 2) * fontSize
                : fontSize / 2 + 0.8 + i * fontSize - (Math.floor(textRows / 2) * fontSize) / 2;
            dashedUnderlineList.push(
              <Line
                key={i}
                stroke="#ff9b8e"
                strokeWidth={0.5}
                dash={[3, 5]}
                points={[-attributeTextWidth / 2 + 5, lineOffset, attributeTextWidth / 2 - 5, lineOffset]}
              />
            );
          }
        }
      }
    }

    return (
      
      <Group 
        x={this.props.x}
        y={this.props.y}
        visible={this.props.components.hideAttribute?false:true}
       
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
           cornerRadius={ this.props.components.notation==='Barker Notation' && 
            this.props.attrNum===this.props.components.entities.find(x=>x.id=== this.props.parentEntity).attributesNum-1? [0,0, 10, 10]: [0,0,0,0]}
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
       
        <Text text={this.props.components.notation==="Information Engineering Notation"  && this.props.type.unique ?
          this.props.type.foreign? 'PK, FK' :
           "PK " :    this.props.components.notation==='Bachman Notation'  && this.props.type.unique ?
           this.props.type.foreign? 'PFK' :
           'PK  ':
           this.props.components.notation==="Information Engineering Notation"  && this.props.type.foreign ?
           "FK " :    this.props.components.notation==='Bachman Notation'  && this.props.type.foreign ?
           'FK  ':
          
           
           ""}  fontSize={fontSize}
          align="left"
          verticalAlign="middle"
          width={entityTextWidth}
          height={textHeight}
          offsetX={entityTextWidth / 2 + 22}
          offsetY={textHeight / 2}
          listening={false} />
        <Text
          text={ /*this.props.components.notation==="Information Engineering Notation"  && this.props.type.unique ?
           "PK " + this.props.name:*/ 
           this.props.type.unique && this.props.components.notation==='Barker Notation'?
            "# * " + this.props.name :
             this.props.type.optional && this.props.components.notation==='Barker Notation'?
             'o ' + this.props.name :
             this.props.components.notation==='Barker Notation'  ?
             '* ' + this.props.name
             :
            /* (this.props.components.notation==='UML Notation' || this.props.components.notation==='Bachman Notation' ) && this.props.type.unique ?
             'PK  ' + this.props.name:*/
             this.props.components.notation==='UML Notation' && this.props.type.composite ?
              this.props.name + ':':
             this.props.components.notation==='Korth, Silberschatz & Sudarshan' && this.props.type.derived?
             this.props.name + '()' : 
             this.props.components.notation==='Korth, Silberschatz & Sudarshan' && this.props.type.multivalued?
             '[' +this.props.name + ']':
             this.props.name
            }
             textDecoration={ ( this.props.components.notation==='Korth, Silberschatz & Sudarshan' || this.props.components.notation==="Information Engineering Notation" )&& this.props.type.unique ? "underline" : ""}
             fontSize={fontSize}
          align={this.props.components.attributes.find(x=>x.id===this.props.parentId)?"right":'center'}
          verticalAlign="middle"
          width={entityTextWidth}
          fontStyle={this.props.components.notation==='Information Engineering Notation'? (!this.props.type.optional && !this.props.type.derived)? 'bold':'normal':'normal'}
          height={textHeight}
          offsetX={this.props.type.unique && this.props.type.foreign?entityTextWidth / 2-3-this.props.name.length:entityTextWidth / 2}
          offsetY={textHeight / 2}
          listening={false}
        /> 
        {dashedUnderlineList}
        
     
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
