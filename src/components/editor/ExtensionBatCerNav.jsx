import React from "react";
import { connect } from "react-redux";
import { updatePositionExtension, updateInitialPositionExtension, select, repositionComponents } from "../../actions/actions";
import { Group, Circle, Line, Text } from "react-konva";
import { stageWidth, stageHeight, extensionRadius, fontSize, dragBoundOffset } from "../../global/constants";
var pixelWidth = require("string-pixel-width");



class ExtensionBatCerNav extends React.Component {
  _isMounted = false;
  state={opacity:0}

componentDidMount(){ this._isMounted = true;
  }

componentWillUnmount(){
  this._isMounted = false;
}
  
  // Does not let the extension to be dragged out of stage bounds
  stageBound = (pos) => {
    var newX;
    var newY;

    if (pos.x > stageWidth / 2)
      newX =
        pos.x > stageWidth - extensionRadius - dragBoundOffset ? stageWidth - extensionRadius - dragBoundOffset : pos.x;
    else newX = pos.x < extensionRadius + dragBoundOffset ? extensionRadius + dragBoundOffset : pos.x;

    if (pos.y > stageHeight / 2)
      newY =
        pos.y > stageHeight - extensionRadius - dragBoundOffset
          ? stageHeight - extensionRadius - dragBoundOffset
          : pos.y;
    else newY = pos.y < extensionRadius + dragBoundOffset ? extensionRadius + dragBoundOffset : pos.y;

    return {
      x: newX,
      y: newY,
    };
  };

 


  render() {
    var text;
    if (this.props.type === "specialize")
      if (this.props.cardinality === "disjoint") text = "d";
      else if (this.props.cardinality === "overlap") text = "o";
      else text = "";
    else if (this.props.type === "union") text = "u";

    var textPixelWidth = pixelWidth(text, {
      font: "Arial",
      size: fontSize,
    });
    return (
      
      <Group
        x={this.props.x}
        y={this.props.y}
        draggable
        dragBoundFunc={(pos) => this.stageBound(pos)}
        onDragStart={(e) => {
          this.props.updateInitialPositionExtension({
            id: this.props.id,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onDragMove={(e) => {
          this.props.updatePositionExtension({
            id: this.props.id,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onDragEnd={() => this.props.repositionComponents()}
        onTap={() => {
          this.props.select({
            type: "extension",
            id: this.props.id,
            parentId: this.props.parentId,
          });
        }}
        onClick={() => {
          this.props.select({
            type: "extension",
            id: this.props.id,
            parentId: this.props.parentId,
          });
          
          document.getElementsByClassName('react-contextmenu')[0].style.display='none'
          document.getElementsByClassName('sidepanel')[0].style.display='block'
        }}
        
      >
      
        <Circle
     
          radius={10}
         onMouseOver={(e)=>{if  (this._isMounted)this.setState({opacity:0.4})}}
         onMouseOut={()=>{ if(this._isMounted)this.setState({opacity:0})}}
         opacity={this.state.opacity}
          fill={this.props.id === this.props.selector.current.id && this.props.selector.current.type === "extension"
          ? "red"
          : "black"}
      
        />
        
       
      </Group>
      
    );
  }
}



const mapStateToProps = (state) => ({
  selector: state.selector,
});

const mapDispatchToProps = {
  updatePositionExtension,
  updateInitialPositionExtension,
  select,
  repositionComponents,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtensionBatCerNav);
