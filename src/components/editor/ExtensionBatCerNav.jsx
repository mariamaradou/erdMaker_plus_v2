import React from "react";
import { connect } from "react-redux";
import { updatePositionExtension, deselect,updateInitialPositionExtension, select, repositionComponents } from "../../actions/actions";
import { Group, Circle } from "react-konva";
import { stageWidth, stageHeight, extensionRadius, dragBoundOffset } from "../../global/constants";




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
   
    return (
      
      <Group
        x={this.props.x}
        y={this.props.y}
        draggable
        dragBoundFunc={(pos) => {this.stageBound(pos); }}
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
        onDragEnd={() => {this.props.repositionComponents(); }}
        onTap={() => {
          this.props.select({
            type: "extension",
            id: this.props.id,
            parentEntity: null,
            parentId: this.props.parentId,
            attrNum:null,
            value:true
          });
        }}
        onMouseOver={(e) => {
          document.getElementsByClassName('stage')[0].focus();
          this.props.deselect();
          this.props.select({
            type: "extension",
            id: this.props.id,
            parentEntity: null,
            parentId: this.props.parentId,
            attrNum:null,
            value:false
           
          }); 
          
        }}
        onMouseOut={(e) => {
          if(typeof document.getElementsByClassName('sidepanel sidepanel-active-right')[0]==='undefined'){
            this.props.deselect();
          }
         
         
          }}
        onClick={() => {
          this.props.select({
            type: "extension",
            id: this.props.id,
            parentEntity: null,
            parentId: this.props.parentId,
            attrNum:null,
            value:true
          });
          
          document.getElementsByClassName('react-contextmenu')[0].style.display='none'
          document.getElementsByClassName('sidepanel')[0].style.display='block'
        }}
        
      >
      
        <Circle
     
          radius={extensionRadius}
         onMouseOver={(e)=>{if ( this._isMounted )this.setState({opacity:0.4})}}
         onMouseOut={()=>{ if(this._isMounted)this.setState({opacity:0})}}
         opacity={this.state.opacity}
         stroke={
          this.props.id === this.props.selector.current.id && this.props.selector.current.type === "extension"
            ? "red"
            : "black"
        }
        
        strokeWidth={ this.props.id === this.props.selector.current.id && this.props.selector.current.type === "extension"?0.7:0.5}
          fill={'lightgrey'}
      
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
  deselect,
  updateInitialPositionExtension,
  select,
  repositionComponents,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtensionBatCerNav);
