import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setTextLabel, deleteLabel, deselect, select} from "../../actions/actions";
import { labelTextSize } from "../../global/constants";



const LabelProperties = (props) => {

  let labelIndex = props.components.labels.findIndex((label) => label.id === props.selector.current.id);
  document.getElementsByClassName('sidepanel')[0].style.display='block';
  
  useEffect( ()=>{
    document.getElementById('text').focus(); 
    if( document.getElementById('text').value==='<New>'){document.getElementById('text').select();}
  
    let labelIndex = props.components.labels.findIndex((label) => label.id === props.selector.current.id);
    if (props.components.labels[labelIndex].y===22){
      console.log(props.components.labels[labelIndex].y)
     document.getElementsByClassName('sidepanel')[0].style.top= '22px';}
    
 
  },[props.components.labels, props.selector]);

 
  return (
    <div className="sidepanel-content" style={{textAlign: 'center'}}>
     {/*} <h3>Label</h3>*/}
      <textarea
         style={{outline: 'none',border:'none',margin: 3, backgroundColor:'white'}}
        className="label-input"
        name="text"
        id="text"
        select='true'
        placeholder='Input comment'
        value={props.components.labels[labelIndex].text}
        maxLength={labelTextSize}
        
        onChange={(e) =>
          props.setTextLabel({
            id: props.selector.current.id,
            text: e.target.value,
          })
        }
        onKeyDown={ (event) => {if (event.keyCode===46) {
          props.deleteLabel({
            id: props.selector.current.id,
          });
          props.deselect();
        }
        else if (event.keyCode===27 || event.keyCode===13){ props.deselect();
          document.getElementsByClassName('stage')[0].focus();
         }
      }}
     
      />
      <button
       /* className="properties-delete-button"*/
        type="button"
        style={{cursor:'pointer', border:'none',outline:'none',fontSize:17, backgroundColor: '#f2f2f2', fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}
        className='buttonmenu '
        onClick={() => {
          props.deleteLabel({
            id: props.selector.current.id,
          });
          
          props.deselect();
          document.getElementsByClassName('stage')[0].focus();
        }}
      >
        Delete
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  components: state.components.present,
  selector: state.selector,
});

const mapDispatchToProps = {
  setTextLabel,
  deleteLabel,
  deselect,
  select
};

export default connect(mapStateToProps, mapDispatchToProps)(LabelProperties);
