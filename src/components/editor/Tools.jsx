import React from "react";

import { connect } from "react-redux";
import {
  addEntity,
  addRelationship,
  addLabel,
  setTitle,
  setActiveDiagram,
  resetComponents,
  select,
  deselect,
  resetMeta,
} from "../../actions/actions";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";
import ShareButton from "./ShareButton";
import { savediagram } from "../../global/diagramRequests";
import ImportExportMenuListComposition from "./ImportExportMenu";
import ConvertToMenuListComposition from "./convert_to";
import ConstraintsButton from "./Constraints";
import saveImg from "../../img/saveIcon.png";
import axios from "axios";
import { diagramLimit, savePeriod } from "../../global/constants.js";
import UndoRedo from "./UndoRedo";


class Tools extends React.Component {
  state = {
    saveEnabled:
      this.props.user.confirmed &&
      (this.props.user.diagramsOwned < diagramLimit ||
        this.props.general.activeDiagramId),
    saveStatus: { text: "Your progress is being saved.", color: "#00b53c" },
    lastSave: " ",
    clearButtonText: "Clear Diagram",
    toolsListActive: false,
  };
  cancelToken = axios.CancelToken.source();

  componentDidMount() {
    window.addEventListener("beforeunload", this.timerCleanup);
    this.startSaveTimer = setTimeout(() => this.startSave(), 1000);
  }

  startSave() {
    if (this.state.saveEnabled)
      this.saveTimer = setInterval(() => this.saveDiagram(), savePeriod);
  }

  componentWillUnmount() {
    this.timerCleanup();
    this.cancelToken.cancel("Request is being canceled");
    window.removeEventListener("beforeunload", this.timerCleanup);
  }

  timerCleanup() {
    clearTimeout(this.startSaveTimer);
    clearInterval(this.saveTimer);
    clearTimeout(this.clickTimer);
  }

  findCardinality = (min, max) => {
    var cardinality;
    if (min === "zero" && max === "one") {
      cardinality = "?";
    } else if (min === "zero" && max === "many") {
      cardinality = "*";
    } else if (min === "one" && max === "one") {
      cardinality = "1";
    } else if (min === "one" && max === "many") {
      cardinality = "+";
    }

    this.setState({ cardinality: cardinality });
  };

  ////////////////////////////   text export ////////////////////////////////////////

  handleSubmit = (e) => {
    e.preventDefault();

    var state = [];
    var relationships = [];

    state.push("# Entities ");
    for (let i in this.props.components.entities) {
      state.push(" ");
      state.push("[" + this.props.components.entities[i].name + "]  ");

      for (let j in this.props.components.attributes) {
        if (
          this.props.components.attributes[j].parentId ===
          this.props.components.entities[i].id
        ) {
          if (this.props.components.attributes[j].type.unique) {
            state.push("  *"  + this.props.components.attributes[j].name);
          } else {
            state.push("  " + this.props.components.attributes[j].name);
          }
        }
      }
    }
    state.push(" ");
    state.push("# Relationships");
    state.push(" ");
    for (let i in this.props.components.relationships) {
      if (this.props.components.relationships[i].connections.length === 2) {
        for (let j in this.props.components.relationships[i].connections) {
          var min = this.props.components.relationships[i].connections[j].min;
          var max = this.props.components.relationships[i].connections[j].max;
          if (min === "zero" && max === "one") {
            var cardinality = "?";
          } else if (min === "zero" && max === "many") {
            cardinality = "*";
          } else if (min === "one" && max === "one") {
            cardinality = "1";
          } else if (min === "one" && max === "many") {
            cardinality = "+";
          } else cardinality = "";

          relationships.push(
            this.props.components.entities.find(
              (entity) =>
                entity.id ===
                this.props.components.relationships[i].connections[j].connectId
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
    console.log(relationships);
    const components = {
      state,
    };

    axios
      .post("http://localhost:3080/create", components)        //na to allaksw se serverHost!
      .then(() => console.log("submitted"))
      .catch((err) => {
        console.error(err);
      });
  };
  /////////////////////////

  saveDiagram = () => {
    this.setState({ saveStatus: { text: "Saving...", color: "#0086a8" } });
    savediagram(this.cancelToken)
      .then((res) => {
        if (res && (res.status === 200 || res.status === 201)) {
          if (!this.props.general.activeDiagramId)
            this.props.setActiveDiagram(res.data.id);
          var saveTime = new Date();
          var hours = saveTime.getHours();
          var minutes = saveTime.getMinutes();
          var seconds = saveTime.getSeconds();
          this.setState({
            saveStatus: {
              text: "Your progress is being saved.",
              color: "#00b53c",
            },
            lastSave: "Last Save " + hours + ":" + minutes + ":" + seconds,
          });
        } else {
          this.setState({
            saveStatus: {
              text:
                "Not able to save. Leaving or refreshing the page might log you out.",
              color: "#b30d23",
            },
          });
        }
      })
      .catch(() => {});
  };

  clearStage = () => {
    this.props.deselect();
  //  this.props.resetMeta();
    this.props.resetComponents();
  };

  // Functions that handle the hold-click on "Clear Diagram" button
  start = () => {
    this.clickTimer = setTimeout(() => this.timerReached(), 1000);
    this.setState({
      clearButtonText: "Hold to clear",
    });
  };

  end = () => {
    clearTimeout(this.clickTimer);
    this.setState({ clearButtonText: "Clear Diagram" });
  };

  timerReached = () => {
    this.clearStage();
    document.getElementsByClassName("stage")[0].focus();
    this.end();
  };

  render() {
    var saveGroup = this.state.saveEnabled ? (
      <SaveGroup
        saveStatus={this.state.saveStatus}
        lastSave={this.state.lastSave}
        savefunc={() => this.saveDiagram()}
      />
    ) : null;

    var saveButton = this.state.saveEnabled ? (
      <button
        className="tools-button-blue"
        type="button"
        onClick={this.saveDiagram}
      >
        Save
      </button>
    ) : null;

    var titleInput =
      this.props.user.confirmed &&
      (this.props.user.diagramsOwned < diagramLimit ||
        this.props.general.activeDiagramId) ? (
        <input
          className="big-editor-input"
          type="text"
          name="title"
          id="title"
          maxLength="17"
          value={this.props.meta.title}
          onChange={(e) =>
            this.props.setTitle({
              title: e.target.value,
            })
          }
        />
      ) : null;

    var clearStageButton =
     /* (!this.props.user.confirmed ||    /// NA EMFANIZETAI to clear diagram KAI OTAN O XRHSTHS EINAI LOGGED IN 
        this.props.user.diagramsOwned >= diagramLimit) &&
      !this.props.general.activeDiagramId ? (*/
        <button
          type="button"
          className="tools-button-red"
          onTouchStart={this.start}
          onTouchEnd={this.end}
          onTouchCancel={this.end}
          onMouseDown={this.start}
          onMouseUp={this.end}
          onMouseOut={this.end}
        >
          {this.state.clearButtonText}
        </button>/*
      ) : null;*/

    // CSS classes are set for the burger menu (whether its displayed or not)
    var toolsClasses = "tools__list";
    var line1Class = "";
    var line2Class = "";
    var line3Class = "";

    if (this.state.toolsListActive) {
      toolsClasses += " tools__list-active";
      line1Class = "line1";
      line2Class = "line2";
      line3Class = "line3";
    }

    return (
      //creating Import/Export button   //creating Convert to button
      <div className="tool-bar">
        <Link to="/">
          <img src={Logo} className="logo" alt=":(" />
        </Link>
        {saveGroup}
        <ul className={toolsClasses}>
          {saveButton}
          <form onSubmit={this.handleSubmit}>
            <button //creating Share button
              className="tools-button-blue"
              type="submit"
            >
              .txt export
            </button>
          </form>
          <ConstraintsButton />
          <UndoRedo />
          
          <ShareButton />
    
          <ConvertToMenuListComposition />

          {titleInput}

          <ImportExportMenuListComposition />

          {clearStageButton}
        </ul>
        <div
          className="burger"
          onClick={() => {
            this.setState({ toolsListActive: !this.state.toolsListActive });
          }}
        >
          <div className={line1Class} />
          <div className={line2Class} />
          <div className={line3Class} />
        </div>
      </div>
    );
  }
}

const SaveGroup = (props) => (
  <div
    className="save-group"
    style={{ backgroundColor: props.saveStatus.color }}
  >
    <img src={saveImg} alt=":(" />
    <span className="save-tooltip">
      {props.saveStatus.text}
      <br />
      {props.lastSave}
    </span>
  </div>
);

const mapStateToProps = (state) => ({
  user: state.user,
  meta: state.meta,
  components: state.components.present,
  general: state.general,
});

const mapDispatchToProps = {
  addEntity,
  addRelationship,

  addLabel,
  setTitle,
  setActiveDiagram,
  resetComponents,
  select,
  deselect,
  resetMeta,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
