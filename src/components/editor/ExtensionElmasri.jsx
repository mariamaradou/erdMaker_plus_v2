import React from "react";
import { connect } from "react-redux";
import { updatePositionExtension, updateInitialPositionExtension, select, repositionComponents, modifyExtension } from "../../actions/actions";
import { Group, Circle, Line, Text } from "react-konva";
import { stageWidth, stageHeight, extensionRadius, fontSize, dragBoundOffset } from "../../global/constants";
var pixelWidth = require("string-pixel-width");

class Extension extends React.Component {

  _isMounted = false;
 
  state={shadowOffset: 0, fill:'white'}

componentDidMount(){ 
 
  if(this.selected===true)  document.getElementById('type').focus();  this._isMounted = true;}


componentWillUnmount() {
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

 /* getStage=() =>this.stage;
  
extensionLimit=(e)=>{

  console.log(e.evt.clientX)
}*/

  render() {
    
   
    var text;
    if (this.props.type === "specialize")
      if (this.props.cardinality === "disjoint") text = "d";
      else if (this.props.cardinality === "overlap") text = "O";
      else text = "";
    else if (this.props.type === "union") text = "U"
    else if (this.props.type === "aggregation") text = "A";

    var textPixelWidth = pixelWidth(text, {
      font: "Arial",
      size: fontSize,
    });
    return (
      
      <Group
        x={this.props.x}
        y={this.props.components.notation==="Korth, Silberschatz & Sudarshan" && this.props.cardinality==='overlap'?this.props.y-17: this.props.y}
     draggable={     this.props.components.notation==="Korth, Silberschatz & Sudarshan" && this.props.cardinality==='overlap'? false: true}
        dragBoundFunc={(pos) => this.stageBound(pos)}
        onMouseOver={ ()=> this._isMounted  && (this.props.components.notation==="Korth, Silberschatz & Sudarshan" )?
      this.setState({shadowOffset:0.5, fill:'lightgrey'}):  this.setState({shadowOffset:0, fill:'white'})}
      onMouseOut ={() =>this._isMounted  && (this.props.components.notation==="Korth, Silberschatz & Sudarshan" )?
       this.setState({shadowOffset:0, fill:'white'}):null}
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
        onDragEnd={(e) => {this.props.repositionComponents(); /*this.extensionLimit(e)*/ }}
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
          document.getElementById('type').focus()
          document.getElementsByClassName('react-contextmenu')[0].style.display='none'
          document.getElementsByClassName('sidepanel')[0].style.display='block'
        }}
        
      >
       
        <Circle
     
          radius={extensionRadius}
          opacity={this.props.components.notation==="Korth, Silberschatz & Sudarshan" && this.props.cardinality==='overlap'?
          this.state.shadowOffset:
          this.props.components.notation==="Korth, Silberschatz & Sudarshan" && this.props.cardinality==='disjoint'?
          this.state.shadowOffset:
          1}
          fill={this.state.fill}
          
          stroke={
            this.props.id === this.props.selector.current.id && this.props.selector.current.type === "extension"
              ? "red"
              : "black"
          }
          
          strokeWidth={0.5}
        />
        
        <Text text={text} fontStyle={"bold"} opacity={this.props.components.notation==="Korth, Silberschatz & Sudarshan" ?0:1} fontSize={fontSize} x={-textPixelWidth / 2} y={-fontSize / 2} />
      </Group>
      
    );
  }
}

// The small curvy line connecting extensions and their children
export const ExtensionSpline = (props) => {
  return (
    <Line
      x={props.x}
      y={props.y}
      rotation={props.angle}
      stroke={"black"}
      strokeWidth={0.5}
      tension={0.5}
      points={[-15, -5, 0, 0, 15, -5]}
      
    />
  );
};

const mapStateToProps = (state) => ({
  selector: state.selector,
  components: state.components.present
});

const mapDispatchToProps = {
  updatePositionExtension,
  updateInitialPositionExtension,
  select,
  modifyExtension,
  repositionComponents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Extension);
