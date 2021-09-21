import React from "react";
import { connect } from "react-redux";
import {
  updatePositionExtension,
  deselect,
  updateInitialPositionExtension,
  select,
  repositionComponents,
  modifyExtension,
} from "../../actions/actions";
import { Group, RegularPolygon, Circle } from "react-konva";
import {
  stageWidth,
  stageHeight,
  extensionRadius,
  dragBoundOffset,
} from "../../global/constants";

class ExtensionUML extends React.Component {
  _isMounted = false;
  state = { opacity: 0 };

  componentDidMount() {
    this._isMounted = true;
    if (this.selected === true) document.getElementById("type").focus();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Does not let the extension to be dragged out of stage bounds
  stageBound = (pos) => {
    var newX;
    var newY;

    if (pos.x > stageWidth / 2)
      newX =
        pos.x > stageWidth - extensionRadius - dragBoundOffset
          ? stageWidth - extensionRadius - dragBoundOffset
          : pos.x;
    else
      newX =
        pos.x < extensionRadius + dragBoundOffset
          ? extensionRadius + dragBoundOffset
          : pos.x;

    if (pos.y > stageHeight / 2)
      newY =
        pos.y > stageHeight - extensionRadius - dragBoundOffset
          ? stageHeight - extensionRadius - dragBoundOffset
          : pos.y;
    else
      newY =
        pos.y < extensionRadius + dragBoundOffset
          ? extensionRadius + dragBoundOffset
          : pos.y;

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
    return (
      <Group
        x={this.props.x}
        y={this.props.y}
        draggable
        dragBoundFunc={(pos) => this.stageBound(pos)}
        onMouseOver={() => {
          document.getElementsByClassName("stage")[0].focus();
          this.props.deselect();
          this.props.select({
            type: "extension",
            id: this.props.id,
            attrNum: null,
            parentEntity: null,
            parentId: this.props.parentId,
            value: false,
          });
        }}
        onMouseOut={() => {
          if (
            typeof document.getElementsByClassName(
              "sidepanel sidepanel-active-right"
            )[0] === "undefined"
          ) {
            this.props.deselect();
          }

          this._isMounted &&
          this.props.components.notation === "Korth, Silberschatz & Sudarshan"
            ? this.setState({ shadowOffset: 0, fill: "white" })
            : this.setState({ shadowOffset: 0, fill: "white" });
        }}
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
        onDragEnd={(e) => {
          this.props.repositionComponents(); /*this.extensionLimit(e)*/
        }}
        onTap={() => {
          this.props.select({
            type: "extension",
            id: this.props.id,
            parentId: this.props.parentId,
            attrNum: null,
            parentEntity: null,
            value: true,
          });
        }}
        onClick={() => {
          this.props.select({
            type: "extension",
            id: this.props.id,
            attrNum: null,
            parentEntity: null,
            parentId: this.props.parentId,
            value: true,
          });
          document.getElementById("type").focus();
          document.getElementsByClassName(
            "react-contextmenu"
          )[0].style.display = "none";
          document.getElementsByClassName("sidepanel")[0].style.display =
            "block";
        }}
      >
        <RegularPolygon
          radius={extensionRadius - 5}
          sides={3}
          opacity={
            this.props.type === "aggregation" ||
            this.props.type === "composition"
              ? 0
              : 1
          }
          fill={this.props.cardinality === "overlap" ? "black" : "white"}
          stroke={
            this.props.id === this.props.selector.current.id &&
            this.props.selector.current.type === "extension"
              ? "red"
              : "black"
          }
          strokeWidth={
            this.props.id === this.props.selector.current.id &&
            this.props.selector.current.type === "extension"
              ? 0.7
              : 0.5
          }
        />
        <Circle
          visible={
            this.props.type === "aggregation" ||
            this.props.type === "composition"
              ? true
              : false
          }
          radius={extensionRadius}
          onMouseOver={(e) => {
            if (this._isMounted) this.setState({ opacity: 0.4 });
          }}
          onMouseOut={() => {
            if (this._isMounted) this.setState({ opacity: 0 });
          }}
          opacity={this.state.opacity}
          stroke={
            this.props.id === this.props.selector.current.id &&
            this.props.selector.current.type === "extension"
              ? "red"
              : "black"
          }
          strokeWidth={
            this.props.id === this.props.selector.current.id &&
            this.props.selector.current.type === "extension"
              ? 0.7
              : 0.5
          }
          fill={"lightgrey"}
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
  updatePositionExtension,
  deselect,
  updateInitialPositionExtension,
  select,
  modifyExtension,
  repositionComponents,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtensionUML);
