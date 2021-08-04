import React from "react";
import { connect } from "react-redux";
import { changeConnection, deleteConnection, modifyConnection } from "../../actions/actions";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";


class Connection extends React.Component {
 /* state = { expand: true };*/

  findRelationshipIndex = (relationship) => relationship.id === this.props.selector.current.id;

  findConnectionIndex = (connection) => connection.id === this.props.connection.id;

  handleEntityChange = (e) =>
    this.props.changeConnection({
      id: this.props.connection.id,
      parentId: this.props.relationshipId,
      connectId: Number(e.target.value),
    });

  handleModifyConnection = (e) => {
    this.props.modifyConnection({
      id: this.props.connection.id,
      parentId: this.props.relationshipId,
      prop: e.target.id,        //min, max
      value: e.target.value,
    });
  };

  /*handleExpand = () => this.setState({ expand: !this.state.expand });*/

  render() {
    var parentIndex = this.props.components.relationships.findIndex(this.findRelationshipIndex);
    var childIndex = this.props.components.relationships[parentIndex].connections.findIndex(this.findConnectionIndex);
    
    var specificValues =/* this.state.expand ? */(
      <>
        <div className="connection-input-group">
          <label >
            exactMin:
            <input
             style={{marginBottom: 4}}
             // id="exactMin" 
               // id='min'
              id={this.props.components.participationDirection==='Look Across' && this.props.components.relationships[parentIndex].connections.length>2? 'minAcross': 'min' }
              className="small-editor-input"
              type="text"
              maxLength="7"
            // value={this.props.connection.exactMin} //timh tis min
             value={this.props.connection.min}
              onChange={this.handleModifyConnection}
              //disabled={this.props.connection.min === "zero" || this.props.connection.min === "one" ? true : false}
            />
          </label>
        </div>
        <div className="connection-input-group">
          <label>
            exactMax:
            <input
            // id="exactMax" 
             // id="max"
              id={this.props.components.cardinalityDirection==='Look Here' && this.props.components.relationships[parentIndex].connections.length>2? 'maxHere': 'max' }
              className="small-editor-input"
              type="text"
              maxLength="7"
             // value={this.props.connection.exactMax} 
              value={this.props.components.cardinalityDirection==='Look Here' && this.props.components.relationships[parentIndex].connections.length>2 ?this.props.connection.maxHere:this.props.connection.max} //timi tis max
              onChange={this.handleModifyConnection} //patwntas to mpainei h plhthikotita
              //disabled={this.props.connection.max === "one" ? true : false}
            />
          </label>
        </div>
        <br />
        <div className="connection-input-group">
          <label>
            Role:
            <input
              id="role"
              className="small-editor-input"
              style={{ width: "150px", marginTop: "10px" }}
              type="text"
              maxLength="15"
              value={this.props.connection.role}
              onChange={this.handleModifyConnection}
            />
          </label>
        </div>
      </>
    ) /*: null*/ ;

   /* var expandIcon = this.state.expand ? <ExpandLessIcon /> : <ExpandMoreIcon />;*/
 
    return  this.props.components.notation!=="Min-Max/ISO Notation"?(
      <div className="connection" style={{ paddingLeft: '6px', backgroundColor: this.props.index % 2 ? "#c9c9c9" : "#dfdfdf" }}>
        <div className="connection-input-group">
          <label>
            <b>Entity: </b>
            <select
              value={this.props.components.relationships[parentIndex].connections[childIndex].connectId}
              onChange={this.handleEntityChange}
            >
              <option value={0} disabled>
                Select an Entity
              </option>
              {this.props.components.entities.map((entity) => (
                <option key={entity.id} value={entity.id} disabled={entity.connectionCount >= 8 ? true : false}>
                  {entity.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <IconButton
          onClick={() => {
            this.props.deleteConnection({
              id: this.props.connection.id,
              parentId: this.props.selector.current.id,
              connectId: this.props.connection.connectId,
            });
          }}
        >
          <DeleteIcon />
        </IconButton>
        <br />
        <div className="connection-input-group">
          <label >
            Min:{" "}
            <select  style={{marginBottom: 4}} id={this.props.components.participationDirection==='Look Across' && this.props.components.relationships[parentIndex].connections.length>2? 'minAcross':'min'}
             value={
              this.props.components.participationDirection==='Look Across' && this.props.components.relationships[parentIndex].connections.length>2?
              this.props.connection.minAcross==='0' || this.props.connection.minAcross==='null'||
              this.props.connection.minAcross==='zero' ? 
              'zero': 
              this.props.connection.minAcross==='1' || this.props.connection.minAcross==='one' || this.props.connection.minAcross>1? 'one':'undefined':
              this.props.connection.min==='0' || 
              this.props.connection.min==='null'||
               this.props.connection.min==='zero' ? 
               'zero': 
               this.props.connection.min==='1' || this.props.connection.min==='one' || this.props.connection.min>1? 'one':'undefined' } onChange={this.handleModifyConnection}>
              <option value="">Undefined</option>
              <option value="zero"  >Zero</option>
              <option value="one">One</option>
            </select>
          </label>
        </div>
        <div className="connection-input-group">
          <label>
            Max:{" "}
            <select   id={this.props.components.cardinalityDirection==='Look Here' && this.props.components.relationships[parentIndex].connections.length>2? 'maxHere': 'max' }
             value={
              this.props.components.cardinalityDirection==='Look Here' && this.props.components.relationships[parentIndex].connections.length>2?
              this.props.connection.maxHere==='1' || this.props.connection.maxHere==='one' ? 'one':
             this.props.connection.maxHere>1 || this.props.connection.maxHere==='many' || this.props.connection.maxHere==='N' ||
              this.props.connection.maxHere==='n'? 'many':'undefined':
              this.props.connection.max==='1' || this.props.connection.max==='one' ? 'one':
              this.props.connection.max>1 || this.props.connection.max==='many' || this.props.connection.max==='N' ||
               this.props.connection.max==='n'? 'many': 'undefined'
            } onChange={this.handleModifyConnection}>
              <option value="">Undefined</option>
              <option value="one">One</option>
              <option value="many">Many</option>
            </select>
          </label>
        </div>
        
       {/* <Tooltip title="Custom min/max values" placement="right" >
        <span>
        <IconButton disabled={this.props.components.notation==='Min-Max/ISO Notation'?false:true} onClick={this.handleExpand}>{expandIcon}</IconButton>
        </span>
        </Tooltip>
        
        <br />
        {specificValues} */}
        
      </div>
    ):
    (
      <div className="connection" style={{ backgroundColor: this.props.index % 2 ? "#c9c9c9" : "#dfdfdf" }}>
        <div className="connection-input-group">
          <label>
            <b>Entity: </b>
            <select
              value={this.props.components.relationships[parentIndex].connections[childIndex].connectId}
              onChange={this.handleEntityChange}
            >
              <option value={0} disabled>
                Select an Entity
              </option>
              {this.props.components.entities.map((entity) => (
                <option key={entity.id} value={entity.id} disabled={entity.connectionCount >= 8 ? true : false}>
                  {entity.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <IconButton
          onClick={() => {
            this.props.deleteConnection({
              id: this.props.connection.id,
              parentId: this.props.selector.current.id,
              connectId: this.props.connection.connectId,
            });
          }}
        >
          <DeleteIcon />
        </IconButton>
        <br />
        
        
       {/* <Tooltip title="Custom min/max values" placement="right" >
        <span>
        <IconButton disabled={this.props.components.notation==='Min-Max/ISO Notation'?false:true} onClick={this.handleExpand}>{expandIcon}</IconButton>
        </span>
        </Tooltip>
        
        <br /> */}
        {specificValues}
        
      </div>
    )
    

  }
}

const mapStateToProps = (state) => ({
  components: state.components.present,
  selector: state.selector,
});

const mapDispatchToProps = {
  changeConnection,
  deleteConnection,
  modifyConnection,
};

export default connect(mapStateToProps, mapDispatchToProps)(Connection);
