import React from "react";
import { connect } from "react-redux";
import {
  updatePositionRelationship,
  updateInitialPositionRelationship,
  //updateInitialPositionChildren,
  updatePositionChildren,
  repositionComponents,
  select,
  deselect,
} from "../../actions/actions";
import { Group, Line, Text, Circle } from "react-konva";
import {
  stageWidth,
  stageHeight,
  relationshipWidth,
  relationshipHeight,
  relationshipTextWidth,
  weakRelationshipOffset,
  fontSize,
  extensionRadius,
  textHeight,
  dragBoundOffset,
} from "../../global/constants";

class Relationship extends React.Component {
  _isMounted = false;
  state = {
    initialPosition: { x: this.props.x, y: this.props.y },
   // shadowOffsetY: 0,
    opacity:0,
    fontSize: fontSize,
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  // Does not let the relationship to be dragged out of stage bounds
  stageBound = (pos) => {
    var newX;
    var newY;

    if (pos.x > stageWidth / 2)
      newX =
        pos.x > stageWidth - relationshipWidth - dragBoundOffset
          ? stageWidth - relationshipWidth - dragBoundOffset
          : pos.x;
    else
      newX =
        pos.x < relationshipWidth + dragBoundOffset
          ? relationshipWidth + dragBoundOffset
          : pos.x;

    if (pos.y > stageHeight / 2)
      newY =
        pos.y > stageHeight - relationshipHeight - dragBoundOffset
          ? stageHeight - relationshipHeight - dragBoundOffset
          : pos.y;
    else
      newY =
        pos.y < relationshipHeight + dragBoundOffset
          ? relationshipHeight + dragBoundOffset
          : pos.y;

    return {
      x: newX,
      y: newY,
    };
  };

  render() {
    var weakRelationshipRhombus = this.props.type.weak ? (
      <Line
        fill="#94dfea"
        stroke={
          this.props.id === this.props.selector.current.id &&
          this.props.selector.current.type === "relationship"
            ? "red"
            : "black"
        }
        listening={false}
        strokeWidth={0.5}
        lineJoin="bevel"
        closed
      //  visible={ (this.props.components.notation === "UML Notation" &&  this.props.attributesNum>0)? false: true}
        opacity={                                                      //kryvw ton rompo tou relationship
       
          this.props.components.notation === "Information Engineering Notation" ||
          this.props.components.notation === "Bachman Notation" ||
          this.props.components.notation === "Barker Notation" || 
          (this.props.components.notation === "UML Notation" )
            ? 0
            : 1
        }
        points={[
          0,
          -relationshipHeight + weakRelationshipOffset, // TOP
          relationshipWidth - 1.5 * weakRelationshipOffset,
          0, // RIGHT
          0,
          relationshipHeight - weakRelationshipOffset, // BOTTOM
          -relationshipWidth + 1.5 * weakRelationshipOffset,
          0, // LEFT
        ]}
      />
    ) : null;

    return (
      <Group
        x={this.props.x}
        y={this.props.y}
        draggable
        onDragStart={(e) => {
          this.props.updateInitialPositionRelationship({
            id: this.props.id,
            x: e.target.x(),
            y: e.target.y(),
          });

          this.setState({
            initialPosition: { x: e.target.x(), y: e.target.y() },
          });
        }}
        onDragMove={(e) => {
          this.props.updatePositionRelationship({
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
        onDragEnd={() => this.props.repositionComponents()}
        onTap={() => {
          this.props.deselect();
          this.props.select({
            type: "relationship",
            id: this.props.id,
            parentEntity: null,
            attrNum:null,
            parentId: null,
            value:true
          });
        }}
        onMouseOver={(e) => {
          document.getElementsByClassName('stage')[0].focus();
          this.props.deselect();
          this.props.select({
            type: "relationship",
            id: this.props.id,
            attrNum:null,
            parentEntity: null,
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
            type: "relationship",
            id: this.props.id,
            attrNum:null,
            parentEntity: null,
            parentId: null,
            value:true
            
         
          });

          document.getElementsByClassName(
            "react-contextmenu"
          )[0].style.display = "none";
        }}
        dragBoundFunc={(pos) => this.stageBound(pos)}
      >
         
        <Line
          // fill="#94dfea"
          fillLinearGradientStartPoint={{ x: -50, y: -50 }}
          fillLinearGradientEndPoint={{ x: 50, y: 50 }}
          fillLinearGradientColorStops={[0, "#B9D9EB", 1, "#89CFF0"]}
         // visible={ (this.props.components.notation === "UML Notation" &&  this.props.attributesNum>0)? false: true}
          opacity={                                                      //kryvw ton rompo tou relationship
         
            this.props.components.notation === "Information Engineering Notation" ||
            this.props.components.notation === "Bachman Notation" ||
            this.props.components.notation === "Barker Notation" || 
            (this.props.components.notation === "UML Notation" &&  this.props.connections.length<=2)
              ? 0
              : 1
          }
          stroke={
            this.props.id === this.props.selector.current.id &&
            this.props.selector.current.type === "relationship"
              ? "red"
              : "black"
          }
          strokeWidth={ this.props.id === this.props.selector.current.id && this.props.selector.current.type === "relationship"?0.7:0.5}
          lineJoin="bevel"
          closed
          points={
            (this.props.components.notation === "UML Notation" &&   this.props.connections.length>2)?
            [
            0,
            -relationshipHeight/2, // TOP               //n-ary relationship se UML Notation
            relationshipWidth/3,
            0, // RIGHT
            0,
            relationshipHeight/2, // BOTTOM
            -relationshipWidth/3,
            0, // LEFT
          ]:  [
            0,
            -relationshipHeight, // TOP
            relationshipWidth,
            0, // RIGHT
            0,
            relationshipHeight, // BOTTOM
            -relationshipWidth,
            0, // LEFT
          ]
        }
        />
        {weakRelationshipRhombus}
        
       
        <Text
          text={this.props.name}
          fontSize={this.state.fontSize}
         visible={ (this.props.components.notation === "UML Notation" &&  this.props.attributesNum>0)? false: true}
          opacity={ (this.props.components.notation === "UML Notation" &&   this.props.connections.length>2)? 0: 1}
          strokeWidth={0}
          shadowColor="silver"
          stroke="black"
          listening={false}
          // shadowOffsetX={4}
        //  shadowOffsetY={this.state.shadowOffsetY}
          align="center"
          verticalAlign="middle"
          width={relationshipTextWidth}
          height={textHeight}
          offsetX={relationshipTextWidth / 2}
          offsetY={
        
            this.props.components.notation === "Information Engineering Notation" ||
            this.props.components.notation === "Bachman Notation" ||
            this.props.components.notation === "Barker Notation" ||
            this.props.components.notation === "UML Notation"
              ? textHeight / 1.9
              : textHeight / 2
          }
          onMouseOver={(e) => {
            
            
            if (
              this._isMounted &&
              (this.props.components.notation === "Information Engineering Notation" ||
                this.props.components.notation === "Bachman Notation" ||
                this.props.components.notation === "Barker Notation")
            )
              this.setState({
                fontSize: fontSize * 1.3,
               
              //  shadowOffsetY: 16,
              });
          }}
          onMouseOut={() => {
            if (
              this._isMounted &&
              (this.props.components.notation === "Information Engineering Notation" ||
                this.props.components.notation === "Bachman Notation" ||
                this.props.components.notation === "Barker Notation")
            )
              this.setState({
                fontSize: fontSize,
               
              //  shadowOffsetY: 0,
              });
          }}
          onMouseDown={(e) => {
            if (
              this._isMounted &&
              (this.props.components.notation === "Information Engineering Notation" ||
                this.props.components.notation === "Bachman Notation" ||
                this.props.components.notation === "Barker Notation")
            )
              this.setState({
                fontSize: fontSize * 1.3,
              
              //  shadowOffsetY: 16,
              });
          }}
          onMouseUp={() => {
            if (
              this._isMounted &&
              (this.props.components.notation === "Information Engineering Notation" ||
                this.props.components.notation === "Bachman Notation" ||
                this.props.components.notation === "Barker Notation")
            )
              this.setState({
                fontSize: fontSize,
          
              //  shadowOffsetY: 0,
              });
          }}
        />
        <Circle
      visible={ (this.props.components.notation === "UML Notation" &&  this.props.attributesNum>0)? true: false}
     radius={extensionRadius}
    onMouseOver={(e)=>{if ( this._isMounted )this.setState({opacity:0.4})}}
    onMouseOut={()=>{ if(this._isMounted)this.setState({opacity:0})}}
    opacity={this.state.opacity}
    stroke={
     this.props.id === this.props.selector.current.id && this.props.selector.current.type === "relationship"
       ? "red"
       : "black"
   }
   
   strokeWidth={ this.props.id === this.props.selector.current.id && this.props.selector.current.type === "relationship"?0.7:0.5}
     fill={'lightgrey'}
 
  />
        
      </Group>
    );
  }
}

const mapStateToProps = (state) => ({
  components: state.components.present,
  selector: state.selector,
});

const mapDispatchToProps = {
  updatePositionRelationship,
  updatePositionChildren,
  updateInitialPositionRelationship,
  // updateInitialPositionChildren,
  repositionComponents,
  select,
  deselect,
};

export default connect(mapStateToProps, mapDispatchToProps)(Relationship);
