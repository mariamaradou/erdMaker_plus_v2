import React from "react";
import { connect } from "react-redux";
import {
  updatePositionAttribute,
  updatePositionChildren,
  updateInitialPositionAttribute,
 // updateInitialPositionChildren,
  repositionComponents,
  select,
  deselect,
} from "../../actions/actions";
import { Group, Circle, Text, Line, Ellipse } from "react-konva";
import {
  stageWidth,
  stageHeight,
  attributeRadiusX,
  attributeRadiusY,
  attributeTextWidth,
  
  fontSize,
  textHeight,
  dragBoundOffset,
} from "../../global/constants";

var pixelWidth = require("string-pixel-width");

class AttributeBatCerNav extends React.Component {
  state = { initialPosition: { x: this.props.x, y: this.props.y } };

  findParentIndex = (parent) => parent.id === this.props.parentId;

  // Does not let the attribute to be dragged out of stage bounds
  stageBound = (pos) => {
    var newX;
    var newY;

    if (pos.x > stageWidth / 2)
      newX =
        pos.x > stageWidth - attributeRadiusX - dragBoundOffset
          ? stageWidth - attributeRadiusX - dragBoundOffset
          : pos.x;
    else newX = pos.x < attributeRadiusX + dragBoundOffset ? attributeRadiusX + dragBoundOffset : pos.x;

    if (pos.y > stageHeight / 2)
      newY =
        pos.y > stageHeight - attributeRadiusY - dragBoundOffset
          ? stageHeight - attributeRadiusY - dragBoundOffset
          : pos.y;
    else newY = pos.y < attributeRadiusY + dragBoundOffset ? attributeRadiusY + dragBoundOffset : pos.y;

    return {
      x: newX,
      y: newY,
    };
  };

  render() {
  
    var nameText = this.props.name;
    var namePixelWidth = pixelWidth(nameText, {
      font: "Arial",
      size: fontSize,
    });

    var compositeAttribute = this.props.type.composite ?( <Ellipse
    radiusX={55}
    radiusY={20}
    //fill="#ff9b8e"
   
    fillLinearGradientStartPoint={{ x: -50, y: -50 }}
    fillLinearGradientEndPoint={{ x: 50, y: 50 }}
    fillLinearGradientColorStops={[0, '#ff9b8e', 1, '#fa7564']}
    dash={this.props.type.derived ? [10, 3] : false}
    stroke={
      this.props.id === this.props.selector.current.id && this.props.selector.current.type === "attribute"
        ? "red"
        : "black"
    }
    strokeWidth={0.5} />): null;
   //composite

    if (this.props.type.optional) nameText =  nameText + " (0,1) " ;      //optional
       
      if(this.props.type.unique && this.props.type.composite)  nameText = '*' + nameText;

     if(this.props.type.multivalued) nameText= nameText + " (1,n)";

     if(this.props.type.multivalued && this.props.type.optional) {
      var newName=this.props.name;
     nameText=  newName +  " (0,n)";}

    // Implementation of dashed text underline
    var textRows = Math.ceil(namePixelWidth / attributeTextWidth);
    var parentIndex;
    if (
      this.props.components.entities.length &&
      (parentIndex = this.props.components.entities.findIndex(this.findParentIndex)) !== -1
    ) {
      if (this.props.type.unique && this.props.components.entities[parentIndex].type === "weak") {
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
        draggable
        onDragStart={(e) => {
          this.props.updateInitialPositionAttribute({
            id: this.props.id,
            parentId: this.props.parentId,
            x: e.target.x(),
            y: e.target.y(),
          });
        
          this.setState({
            initialPosition: { x: e.target.x(), y: e.target.y() },
          });
        }}
        

        onDragMove={(e) => {
          this.props.updatePositionAttribute({
            id: this.props.id,
            parentId: this.props.parentId,
          
            x: e.target.x(),
            y: e.target.y(),
          });
          this.props.updatePositionChildren({
            id: this.props.id,
            parentId: this.props.parentId,
            dx: e.target.x() - this.state.initialPosition.x,
            dy: e.target.y() - this.state.initialPosition.y,
          });
          this.setState({
            initialPosition: { x: e.target.x(), y: e.target.y() },
          });
        }}
        onDragEnd={() => this.props.repositionComponents()}
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
        dragBoundFunc={(pos) => this.stageBound(pos)}
      >
        <Circle
          radius={4}
         
         
         fill={this.props.type.unique?'black':'white'}
          dash={this.props.type.derived ? [10, 3] : false}
          strokeWidth={1.5}
          stroke={
            this.props.id === this.props.selector.current.id && this.props.selector.current.type === "attribute"
              ? "red"
              : "black"
          }
          
        />
        {compositeAttribute}
        
        <Text
          text={nameText}
          fontSize={fontSize}
        
          align="center"
          verticalAlign={this.props.type.composite?"middle":"top"}
          width={attributeTextWidth}
          height={textHeight}
          offsetX={this.props.type.composite?attributeTextWidth / 2:30}
          offsetY={ this.props.type.composite? textHeight / 2:25}
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
  updatePositionAttribute,
  updatePositionChildren,
  updateInitialPositionAttribute,
//  updateInitialPositionChildren,
  repositionComponents,
  select,
  deselect,
};

export default connect(mapStateToProps, mapDispatchToProps)(AttributeBatCerNav);
