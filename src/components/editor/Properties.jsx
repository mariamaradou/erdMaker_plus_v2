import React from "react";
import EntityProperties from "./EntityProperties";
import ExtensionProperties from "./ExtensionProperties";
import RelationshipProperties from "./RelationshipProperties";
import AttributeProperties from "./AttributeProperties";
import LabelProperties from "./LabelProperties";
import { connect } from "react-redux";
import { deselect } from "../../actions/actions";
import { PercentToPixels } from "../../global/utils";

import {
  // toolbarHeight,
  entityWidth,
  relationshipHeight,
  extensionRadius,
  relationshipWidth,
  attributeRadiusX,
  entityHeight,
  // labelMaxWidth,
  //stageWidth,
} from "../../global/constants";


 const Properties = (props) => {
 
  
  var stage = props.getStage(); // Reference to the stage
  var stageScrollX = stage ? stage.scrollLeft : 0; // How far we have scrolled horizontally
   var   stageScrollY = stage ? stage.scrollTop : 0; // How far we have scrolled vertically

  // var mobile = window.innerWidth <= 768 ? true : false;

  //var scrollbarOffset = mobile ? 0 : 17; // Account for the bottom horizontal scrollbar on desktop4

  var xPosition; // Position of currently selected component on the screen that helps determine
  var yPositionOr;
  //on which side of the screen the sidepanel will be drawn
  var loadedProperties; // Determines what kind of properties will be drawn on the sidepanel

  

  var sidepanelActive = "";


  // var sidepanelHeightCutoff = 0; // In the case of Label it shortens the sidepanel's height to enable dragndrop of the label
  if(typeof props.selector.current!=='undefined'){
  var sidepanelWidthOriginal = // Wider sidepanel for relationships
    props.selector.current.type === "relationship" || props.selector.current.type === "extension"
      ? props.stager.sidepanelWidth.wide
      : props.stager.sidepanelWidth.standard;
  var sidepanelWidth = sidepanelWidthOriginal - 17;

  var sidepanelHeight = // Wider sidepanel for relationships
    props.selector.current.type === "relationship" || props.selector.current.type === "extension"
      ? props.stager.sidepanelHeight.wide
      : props.stager.sidepanelHeight.standard;
      
  }
  if (props.selector.selectionExists) {
    sidepanelActive = " sidepanel-active-right";

    // Configure sidepanel based on what kind of component is selected
    switch (props.selector.current.type) {
      case "entity":
        let entityIndex = props.components.entities.findIndex((entity) => entity.id === props.selector.current.id);
        if (typeof props.components.entities[entityIndex] !== 'undefined') {
          xPosition = props.components.entities[entityIndex].x + entityWidth / 2 - stageScrollX;


          yPositionOr = props.components.entities[entityIndex].y + entityHeight / 2 - stageScrollY;
          var yPosition = yPositionOr - 70;
          loadedProperties = <EntityProperties />;
        }

        break;
      case "extension":
        
        let extensionIndex = props.components.extensions.findIndex(
          (extension) => extension.id === props.selector.current.id
        );
        if (typeof props.components.extensions[extensionIndex] !== 'undefined') {
          xPosition = props.components.extensions[extensionIndex].x + extensionRadius - stageScrollX;
          yPositionOr = props.components.extensions[extensionIndex].y + extensionRadius - stageScrollY;
          yPosition = yPositionOr - 70;
         
          loadedProperties = <ExtensionProperties />;
        
        }
        break;
      case "relationship":
        let relationshipIndex = props.components.relationships.findIndex(
          (relationship) => relationship.id === props.selector.current.id
        );
        if (typeof props.components.relationships[relationshipIndex] !== 'undefined') {
          xPosition = props.components.relationships[relationshipIndex].x + relationshipWidth - stageScrollX;
          yPositionOr = props.components.relationships[relationshipIndex].y + relationshipHeight - stageScrollY;
          yPosition = yPositionOr - 70;
          loadedProperties = <RelationshipProperties />;
        }
        break;
      case "attribute":
        let attributeIndex = props.components.attributes.findIndex(
          (attribute) => attribute.id === props.selector.current.id
        );
        if (typeof props.components.attributes[attributeIndex] !== 'undefined') {
          if(props.components.notation!=="Information Engineering Notation"){
          xPosition = props.components.attributes[attributeIndex].x + attributeRadiusX - stageScrollX;
          yPositionOr = props.components.attributes[attributeIndex].y + attributeRadiusX - stageScrollY;
          yPosition = yPositionOr - 70;}
          else{  xPosition = props.components.attributes[attributeIndex].initX + attributeRadiusX - stageScrollX;
            yPositionOr = props.components.attributes[attributeIndex].initY + attributeRadiusX - stageScrollY;
            yPosition = yPositionOr - 70}
          loadedProperties = <AttributeProperties />;
        }
        break;
      case "label":
        // sidepanelHeightCutoff = mobile ? 300 : 0;
        let labelIndex = props.components.labels.findIndex((label) => label.id === props.selector.current.id);
        if (typeof props.components.labels[labelIndex] !== 'undefined') {
          xPosition = props.components.labels[labelIndex].x + props.components.labels[labelIndex].width / 2 - stageScrollX;
          yPositionOr = props.components.labels[labelIndex].y + props.components.labels[labelIndex].height / 2 - stageScrollY;
          yPosition = yPositionOr - 70;
          loadedProperties = <LabelProperties />;
        }
        break;
      default:
        xPosition = window.innerWidth / 2 - stageScrollX;
        yPositionOr = window.innerHeight / 2 - stageScrollY;
        yPosition = yPositionOr - 70;
        loadedProperties = <h3>How the heck did you get here?</h3>;
        break;
    }

    //elegxos na mi pigainei plagia apo to surface kai dn fainetai
    if (xPosition > stageScrollX + window.innerWidth - PercentToPixels(window.innerWidth, sidepanelWidth)) {

      switch (props.selector.current.type) {
        case "entity":
          xPosition = xPosition - 2.2 * entityWidth - stageScrollX;

          break;

        case "extension":
          xPosition = xPosition - 12 * extensionRadius - stageScrollX;

          break;
        case "attribute":
          xPosition = xPosition - 4.5 * attributeRadiusX - stageScrollX;

          break;
        case "relationship":
          xPosition = xPosition - 5 * relationshipWidth - stageScrollX;
          break;

        case "label":
          let labelIndex = props.components.labels.findIndex((label) => label.id === props.selector.current.id);
          xPosition = xPosition - 2 * props.components.labels[labelIndex].width;
          break;
        default:
          xPosition = window.innerWidth / 2;
          break;
      }

      //  sidepanelActive = " sidepanel-active-left";
    }

    //na mi ksefeygei panw apo to parathyro
    if(yPosition===-18 || yPosition===-28){
      
          if (typeof document.getElementsByClassName('sidepanel-content')[0] !== 'undefined') {
            yPosition = '40px'
          }
      
    }

    //elegxos wste na mh pigainei katw apo to surface kai dn fainetai
    if (yPosition > stageScrollY + window.innerHeight - PercentToPixels(window.innerHeight, sidepanelHeight)) {

      switch (props.selector.current.type) {
        case "entity":
          yPosition = yPosition - 2.2 * entityHeight - stageScrollY;

          break;
        case "extension":
          if (typeof document.getElementsByClassName('sidepanel-content')[0] !== 'undefined') {
            yPosition = yPosition - document.getElementsByClassName('sidepanel-content')[0].offsetHeight - stageScrollY;
          }
          
         // loadedProperties = <ExtensionProperties />;
          break;
        case "attribute":
          yPosition = yPosition - 3 * attributeRadiusX - stageScrollY;
          break;



        case "relationship":
          if (typeof document.getElementsByClassName('sidepanel-content')[0] !== 'undefined') {
          yPosition = yPosition -  document.getElementsByClassName('sidepanel-content')[0].offsetHeight- stageScrollY;
          }
         
          break;

        case "label":
          //  let labelIndex = props.components.labels.findIndex((label) => label.id === props.selector.current.id);
          // yPosition=yPosition-2*props.components.labels[labelIndex].height;
          break;
        default:
          yPosition = window.innerHeight / 2;
          break;
      }
      //  sidepanelActive = " sidepanel-active-left";
    }


  }
  

  var sidepanelClasses = "sidepanel" + sidepanelActive;
  //var closeClasses = "close" + closeActive;





  return (
    <div
      className={sidepanelClasses}
      style={{
        width: sidepanelWidth + "vw",
        // height: window.innerHeight - toolbarHeight - sidepanelHeightCutoff - scrollbarOffset + "px",
        right: xPosition,
        top: yPosition,

        left: xPosition
      }}
    >

      {loadedProperties}
    </div>
  );
};

const mapStateToProps = (state) => ({
  components: state.components.present,
  selector: state.selector,
  stager: state.stager,
});

const mapDispatchToProps = {
  deselect
};


export default connect(mapStateToProps, mapDispatchToProps)(Properties);

  
