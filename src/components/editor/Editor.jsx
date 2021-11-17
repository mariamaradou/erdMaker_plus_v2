import React from "react";
import Surface from "./Surface";
import Tools from "./Tools";
import {
  getDiagram,
  makeCompatible,
  getDiagramTemp,
} from "../../global/globalFuncs";
import { connect } from "react-redux";
import {
  deselect,
  updateSidepanelWidth,
  updateSidepanelHeight,
  resetComponents,
  resetMeta,
  resetActiveDiagram,
  setMeta,
  setHelpModal,
  setComponents,
} from "../../actions/actions";
import axios from "axios";
import { ActionCreators } from "redux-undo";
import { sharediagramtempuser } from "../../global/diagramRequests";
import { store } from "../../index.js";

export var params_id;
var keys = [];
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showSaveWarning: true };
    this.props.updateSidepanelWidth();
    this.props.updateSidepanelHeight();
    this.cancelToken = axios.CancelToken.source();

    var storedDiagram = {
      meta: this.props.meta,
      components: this.props.components,
    };

    var compatibleDiagram = makeCompatible(storedDiagram);

    this.props.setMeta(compatibleDiagram.meta);
    this.props.setComponents(compatibleDiagram.components);
  }

  componentDidMount = () => {
    document.title = "ERD Maker - Designer";

    window.addEventListener(
      "resize",
      this.props.updateSidepanelWidth,
      this.props.updateSidepanelHeight
    );
    // window.addEventListener("beforeunload", this.clearEditor);
    this.props.deselect();
    store.dispatch(ActionCreators.clearHistory());

    params_id = this.props.match.params.id;

    if (typeof this.props.match.params.id === "undefined") {
      if (this.props.user.isLogged && this.props.general.activeDiagramId) {
        getDiagram(this.props.general.activeDiagramId, this.cancelToken);

        sharediagramtempuser(
          this.props.general.activeDiagramId,
          this.cancelToken
        )
          .then((res) => {
            if (res) {
              window.history.pushState(
                "",
                "",
                "/designer/" + res.data.random_id
              );
            }
          })
          .catch(() => {});
      }
    } else {
      if (this.props.user.isLogged) {
        if (this.props.general.activeDiagramId) {
          sharediagramtempuser(
            this.props.general.activeDiagramId,
            this.cancelToken
          )
            .then((res) => {
              if (res && params_id !== res.data.random_id) {
                this.props.resetActiveDiagram();
              }
            })
            .catch(() => {});
        }
        getDiagramTemp(this.props.match.params.id, this.cancelToken);
      } else {
        window.location.replace("/loginfirst");
      }
    }
  };

  componentDidUpdate() {
    this.props.setHelpModal({ modal: false });
  }
  componentWillUnmount() {
    this.clearEditor();
    this.cancelToken.cancel("Request is being canceled");
    window.removeEventListener(
      "resize",
      this.props.updateSidepanelWidth,
      this.props.updateSidepanelHeight
    );
    window.removeEventListener("beforeunload", this.clearEditor);
  }

  clicked = (e) => {
    if (e.key === "z" || e.key === "Alt" || e.key === "ζ") {
      keys.push(e.key);

      if (keys[0] === "Alt" && (keys[1] === "z" || keys[1] === "ζ")) {
        document.getElementsByClassName("undo tools-button-blue")[0].click();
        document.getElementsByClassName("stage")[0].focus();
      }
    } else if (e.key === "υ" || e.key === "y" || e.key === "Alt") {
      keys.push(e.key);

      if (keys[0] === "Alt" && (keys[1] === "y" || keys[1] === "υ")) {
        document.getElementsByClassName("redo tools-button-blue")[0].click();
        document.getElementsByClassName("stage")[0].focus();
      }
    }
  };
  unclicked = (e) => {
    keys = [];
  };
  clearEditor = () => {
    this.props.deselect();
    if (this.props.general.activeDiagramId) {
      this.props.resetComponents();
      this.props.resetMeta();
      this.props.resetActiveDiagram();
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.showSaveWarning === nextState.showSaveWarning) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div
        className="editor"
        onClick={() => this.setState({ showSaveWarning: false })}
        onKeyDown={(e) => this.clicked(e)}
        onKeyUp={(e) => this.unclicked(e)}
      >
        <Tools />

        {this.props.user.isLogged && (
          <div
            className="save-warning"
            style={{
              visibility: this.state.showSaveWarning ? "visible" : "hidden",
            }}
          >
            Please make sure you click the 'Save' button, before exiting the
            editor.
          </div>
        )}
        {!this.props.user.isLogged && this.props.match.params.id && (
          <div
            className="save-warning"
            style={{
              visibility: this.state.showSaveWarning ? "visible" : "hidden",
            }}
          >
            Any change you make won't be saved unless you are a logged in user.
          </div>
        )}

        <Surface />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  general: state.general,
  meta: state.meta,
  components: state.components.present,
});

const mapDispatchToProps = {
  deselect,
  setHelpModal,
  updateSidepanelWidth,
  updateSidepanelHeight,
  resetComponents,
  resetMeta,
  resetActiveDiagram,
  setMeta,
  setComponents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
