import React, { useEffect, useRef } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { exportdiagram } from "../../global/diagramRequests";
import { connect } from "react-redux";

import {
  repositionComponents,
  resetMeta,
  resetComponents,
  setComponents,
  setMeta,
  deselect,
} from "../../actions/actions";
import { importdiagram } from "../../global/diagramRequests";
import { makeCompatible } from "../../global/globalFuncs";
import axios from "axios";
import {
  stageWidth,
  stageHeight,
  entityWidth,
  entityHeight,
  relationshipWidth,
  relationshipHeight,
  attributeRadiusX,
  attributeRadiusY,
  extensionRadius,
} from "../../global/constants";
import { onSafari } from "../../global/utils";
var fileDownload = require("js-file-download");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const ImportExportMenuListComposition = (props) => {
  const upload = useRef(null);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const cancelToken = useRef(null);

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    return () => {
      cancelToken.current.cancel("Request is being canceled");
    };
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    //if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //  return;
    //}
    setOpen(false);
  };

  const handleServerImport = (e) => {
    importdiagram(e.target.result, cancelToken.current)
      .then((res) => {
        if (res && res.status === 200) {
          props.resetMeta();
          props.resetComponents();
          let data = makeCompatible(res.data);
          props.setMeta(data.meta);
          props.setComponents(data.components);
          props.repositionComponents();
        }
      })
      .catch(() => {});
  };
  const handleSubmit = () => {
 

    var state = [];
    var relationships = [];

    state.push("# Entities ");
    for (let i in props.components.entities) {
      if(typeof props.components.entities[i].parentId==='undefined'){
      state.push(" ");
      state.push("[" + props.components.entities[i].name + "]  {bgcolor:white}");

      for (let j in props.components.attributes)  {
        if (
          props.components.attributes[j].parentId ===
          props.components.entities[i].id
        ) {
          if(props.components.attributes[j].type.unique && props.components.attributes[j].type.foreign){
            state.push("  *+"  + props.components.attributes[j].name);
          }
          else if (props.components.attributes[j].type.unique) {
            state.push("  *"  + props.components.attributes[j].name);
          } 
          else if(props.components.attributes[j].type.foreign){
            state.push("  +"  + props.components.attributes[j].name);
          }
          
          else {
            state.push("  " + props.components.attributes[j].name);
          }
        }
      }
    }}
    state.push(" ");
    state.push("# Relationships");
    state.push(" ");
    for (let i in props.components.relationships) {
      if (props.components.relationships[i].connections.length === 2) {
        for (let j in props.components.relationships[i].connections) {
          var min = props.components.relationships[i].connections[j].min;
          var max = props.components.relationships[i].connections[j].max;
          if (min === "zero" && max === "one") {
            var cardinality = "0";
          } else if (min === "zero" && max === "many") {
            cardinality = "*";
          } else if (min === "one" && max === "one") {
            cardinality = "1";
          } else if (min === "one" && max === "many") {
            cardinality = "+";
          } else cardinality = "";

          relationships.push(
            props.components.entities.find(
              (entity) =>
                entity.id ===
                props.components.relationships[i].connections[j].connectId
            ).name
          );
          relationships.push(cardinality);
        }
      }
    }
    for (var r = 0; r < relationships.length; r += 4) {
      state.push(
        relationships[r] +
          " " +
          relationships[r + 1] +
          "--" +
          relationships[r + 3] +
          " " +
          relationships[r + 2]
      );
    }
   
   
   /* const components = {
      state,
    };

    axios
      .post(serverHost +"/create", components)        //na to allaksw se serverHost!
      .then(() => console.log("submitted"))
      .catch((err) => {
        console.error(err);
      });
     
      */
      var surfaceState = JSON.stringify(state, null,2 );

      var surfaceStateTxt= surfaceState.replace(/,/g, '').replace(/"/g, '')/*.replace(/^\[/,'')*/.replace(/\[/,'').replace(/[ \]]*$/,'')
  const element = document.createElement('a');
  const file = new Blob([surfaceStateTxt], {
    type: "text/plain; charset-utf-8"
  });
   
  element.href=URL.createObjectURL(file);
  
  element.download = props.meta.title + '.er';
  document.body.appendChild(element);
  element.click();
  
    };



    const handleSubmitGleek = () => {
 

      var state = [];
      var relationships = [];
  
     
      for (let i in props.components.entities) {
        if(typeof props.components.entities[i].parentId==='undefined'){
        state.push(" ");
        state.push( props.components.entities[i].name );
  
        for (let j in props.components.attributes)  {
          if (
            props.components.attributes[j].parentId ===
            props.components.entities[i].id
          ) {
            if(props.components.attributes[j].type.unique && props.components.attributes[j].type.foreign){
              state.push("  *+"  + props.components.attributes[j].name);
            }
            else if (props.components.attributes[j].type.unique) {
              state.push("  *"  + props.components.attributes[j].name);
            } 
            else if(props.components.attributes[j].type.foreign){
              state.push("  +"  + props.components.attributes[j].name);
            }
            
            else {
              state.push("  " + props.components.attributes[j].name);
            }
          }
        }
      }
  
    }
      state.push(" ");
     
      state.push(" ");
      for (let i in props.components.relationships) {
        if (props.components.relationships[i].connections.length === 2) {
          for (let j in props.components.relationships[i].connections) {
           
            var max = props.components.relationships[i].connections[j].max;
            if (max === "one") {
              var cardinality = "1";
            } else if ( max === "many") {
              cardinality = "N";
           
            } else cardinality = "";
  
            relationships.push(
              props.components.entities.find(
                (entity) =>
                  entity.id ===
                  props.components.relationships[i].connections[j].connectId
              ).name
            );
           
            relationships.push("-");
            relationships.push(cardinality);
            relationships.push("-");
            
          }
        }
      }
      var n=0;
      for (var r = 0; r < relationships.length; r += 8) {

        state.push(
          relationships[r] +
            
            relationships[r + 1] +
           
            relationships[r + 2] +
          
            relationships[r + 3] +
            "relationship_name"+n +
            relationships[r+5]+
            relationships[r+6]+
            relationships[r+7]+
            relationships[r+4]
        );

        state.push("relationship_name"+n+":diamond")
        n=n+1;
      }
      
     
     
     /* const components = {
        state,
      };
  
      axios
        .post(serverHost +"/create", components)        //na to allaksw se serverHost!
        .then(() => console.log("submitted"))
        .catch((err) => {
          console.error(err);
        });
       
        */
        var surfaceState = JSON.stringify(state, null,2 );
  
        var surfaceStateTxt= surfaceState.replace(/,/g, '').replace(/"/g, '')/*.replace(/^\[/,'')*/.replace(/\[/,'').replace(/[ \]]*$/,'')
    const element = document.createElement('a');
    const file = new Blob([surfaceStateTxt], {
      type: "text/plain; charset-utf-8"
    });
     
    element.href=URL.createObjectURL(file);
    
    element.download = props.meta.title + '.txt';
    document.body.appendChild(element);
    element.click();
    
      };


  // Runs when user clicks to select file for import
  const importDiagram = (e) => {
    // Return if nothing or multiple files are selected
    if (!e || !e.target || !e.target.files || !(e.target.files.length === 1)) {
      return;
    }

    var file = e.target.files[0];
    const name = file.name;
    const lastDot = name.lastIndexOf(".");

    // Get filename and extension of selected file
    //const fileName = name.substring(0, lastDot);
    const ext = name.substring(lastDot + 1);

    if (ext !== "erdm") return;

    var fr = new FileReader();
    fr.onloadend = handleServerImport;
    fr.readAsText(file);

    e.target.value = null; // Reset the file browser
  };

  const exportDiagram = () => {
    exportdiagram(cancelToken.current)
      .then((res) => {
        if (res && res.status === 200) {
          fileDownload(res.data.token, "diagram.erdm");
        }
      })
      .catch(() => {});
  };

  // Calculate the rectangle area occupied by the rendered elements on the stage
  const getStageUsedArea = () => {
    var edges = [
      stageWidth, // leftMost x
      stageHeight, // topMost y
      0, // rightMost x
      0, // bottomMost y
    ];
    for (let i in props.components.entities) {
      if (props.components.entities[i].x - entityWidth / 2 < edges[0])
        edges[0] = props.components.entities[i].x - entityWidth / 2;
      if (props.components.entities[i].y - entityHeight / 2 < edges[1])
        edges[1] = props.components.entities[i].y - entityHeight / 2;
      if (props.components.entities[i].x + entityWidth / 2 > edges[2])
        edges[2] = props.components.entities[i].x + entityWidth / 2;
      if (props.components.entities[i].y + entityHeight / 2 > edges[3])
        edges[3] = props.components.entities[i].y + entityHeight / 2;
    }
    for (let i in props.components.relationships) {
      if (props.components.relationships[i].x - relationshipWidth < edges[0])
        edges[0] = props.components.relationships[i].x - relationshipWidth;
      if (props.components.relationships[i].y - relationshipHeight < edges[1])
        edges[1] = props.components.relationships[i].y - relationshipHeight;
      if (props.components.relationships[i].x + relationshipWidth > edges[2])
        edges[2] = props.components.relationships[i].x + relationshipWidth;
      if (props.components.relationships[i].y + relationshipHeight > edges[3])
        edges[3] = props.components.relationships[i].y + relationshipHeight;
    }
    for (let i in props.components.attributes) {
      if (props.components.attributes[i].x - attributeRadiusX < edges[0])
        edges[0] = props.components.attributes[i].x - attributeRadiusX;
      if (props.components.attributes[i].y - attributeRadiusY < edges[1])
        edges[1] = props.components.attributes[i].y - attributeRadiusY;
      if (props.components.attributes[i].x + attributeRadiusX > edges[2])
        edges[2] = props.components.attributes[i].x + attributeRadiusX;
      if (props.components.attributes[i].y + attributeRadiusY > edges[3])
        edges[3] = props.components.attributes[i].y + attributeRadiusY;
    }
    for (let i in props.components.extensions) {
      if (props.components.extensions[i].x - extensionRadius < edges[0])
        edges[0] = props.components.extensions[i].x - extensionRadius;
      if (props.components.extensions[i].y - extensionRadius < edges[1])
        edges[1] = props.components.extensions[i].y - extensionRadius;
      if (props.components.extensions[i].x + extensionRadius > edges[2])
        edges[2] = props.components.extensions[i].x + extensionRadius;
      if (props.components.extensions[i].y + extensionRadius > edges[3])
        edges[3] = props.components.extensions[i].y + extensionRadius;
    }
    for (let i in props.components.labels) {
      if (props.components.labels[i].x - props.components.labels[i].width / 2 < edges[0])
        edges[0] = props.components.labels[i].x - props.components.labels[i].width / 2;
      if (props.components.labels[i].y - props.components.labels[i].height / 2 < edges[1])
        edges[1] = props.components.labels[i].y - props.components.labels[i].height / 2;
      if (props.components.labels[i].x + props.components.labels[i].width / 2 > edges[2])
        edges[2] = props.components.labels[i].x + props.components.labels[i].width / 2;
      if (props.components.labels[i].y + props.components.labels[i].height / 2 > edges[3])
        edges[3] = props.components.labels[i].y + props.components.labels[i].height / 2;
    }
    return edges;
  };

  const exportImage = () => {
    var edges = getStageUsedArea();

    var canvas = document.getElementsByTagName("CANVAS")[0];

    //Make a Canvas to copy the data you would like to download to
    var hidden_canvas = document.createElement("canvas");
    hidden_canvas.style.display = "none";
    document.body.appendChild(hidden_canvas);
    var hiddenCanvasScaling = onSafari() ? 1 : 1.25;
    hidden_canvas.width = (edges[2] - edges[0]) * hiddenCanvasScaling + 4; // Multiplying by 1.25 because it seems there is internal
    hidden_canvas.height = (edges[3] - edges[1]) * hiddenCanvasScaling + 4; // scaling taking place. Found out by trial and error
    //console.log(hidden_canvas.width)
    //console.log(hidden_canvas.height)
    //console.log(edges[0] * hiddenCanvasScaling - 2)
    //console.log(edges[1] * hiddenCanvasScaling - 2)
    //Draw the data you want to download to the hidden canvas
    var hidden_ctx = hidden_canvas.getContext("2d");
    hidden_ctx.drawImage(
      canvas,
      edges[0] * hiddenCanvasScaling - 2, //Start Clipping
      edges[1] * hiddenCanvasScaling - 2, //Start Clipping
      hidden_canvas.width, //Clipping Width
      hidden_canvas.height, //Clipping Height
      0, //Place X
      0, //Place Y
      hidden_canvas.width, //Place Width
      hidden_canvas.height //Place Height
    );

    var downloadImg = document.getElementById("downloadImg");
    var img = hidden_canvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream");
    downloadImg.setAttribute("href", img);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // Return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <>
        <button
          className="tools-button-blue"
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={() => {
            props.deselect();
            handleToggle();
            
          }}
        >
          Import / Export
        </button>
        <Popper
          className="import-export-popper"
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          //disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <input
                      type="file"
                      ref={upload}
                      onChange={(e) => {
                        importDiagram(e);
                        handleClose();
                      }}
                      style={{ display: "none" }}
                    />
                    <MenuItem
                      type="button"
                      onClick={(e) => {
                        upload.current.click();
                      }}
                    >
                      Import...
                    </MenuItem>
                    <MenuItem
                      type="button"
                      onClick={() => {
                        exportDiagram();
                        handleClose();
                      }}
                    >
                      Export File
                    </MenuItem>
                    <MenuItem
                      type="button"
                      onClick={() => {
                        exportImage();
                        handleClose();
                      }}
                    >
                      <a className="undecorate-link" id="downloadImg" download="diagram.jpg" href="...">
                        Export Image
                      </a>
                    </MenuItem>
                   
               <MenuItem
                      type="button"
                      onClick={()=>handleSubmit()}
                    >
                    Export ERD Preview file
                    </MenuItem>
                    <MenuItem
                      type="button"
                      onClick={()=>handleSubmitGleek()}
                    >
                    Export Gleek (Basic) file
                    </MenuItem>
                     
                   
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    </div>
  );
};

const mapStateToProps = (state) => ({
  components: state.components.present,
  meta: state.meta
});

const mapDispatchToProps = {
  resetMeta,
  resetComponents,
  setComponents,
  repositionComponents,
  setMeta,
  deselect,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportExportMenuListComposition);
