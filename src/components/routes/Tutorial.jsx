import React from "react";
import LookAcross from "../../img/Look Across.jpg"
import LookHere from "../../img/Look Here.jpg"

import extensionVideo from "../../img/overlap video.mp4"

const Tutorial = () => {
  document.title = "ERD Maker - Tutorial";
  

  return (
    <div className="about">
      <div className="containerTwo">
        <div className="flex-container">
        <div>
        <h2>How to use</h2>
        <h3>Add a component</h3>
        <div style={{textAlign:'left'}}>
         <p >Right-click on the surface to display context-menu: New Entity, New Relationship &amp; New Text 
           and then click the selection you want.  </p>
        
        <p > Alternatively, you can add a component by clicking a spot on the surface where you want to add it
         and then press component's corresponding keyboard shortcut (look below).</p>
         </div>
        <h4>Keyboard shortcuts</h4>
        
        <table  >
          <tbody style={{textAlign:'left', paddingLeft:"100px"}}>
         <tr><td> <b>"e"</b> key for new Entity</td></tr>
         <tr><td> <b>"r" </b> key for new Relationship</td></tr>
         <tr><td> <b>"l"</b> key for new Label</td></tr>
         <tr><td> <b> "Alt+z" </b> keys for Undo action</td></tr>
         <tr><td>  <b> "Alt+y"</b> keys for Redo action</td></tr>
         <tr><td>  <b>Arrow</b> keys to move around surface</td></tr>
         <tr><td> <b>  Delete</b> key to delete a surface component</td></tr>
         <tr><td>  <b> Escape</b> key to deselect a surface component</td></tr>
         </tbody>
        </table>
    
       <h4>How to add an overlap extension</h4>
        <video width="95%" height="400" controls >
      <source src={extensionVideo} type="video/mp4"/>
     </video>
      
        </div>

        <div>
        <h2 >Some theorey</h2>
        
        <h3 >Ternary Relationships</h3>
        <p style={{textAlign:'left'}}>Cardinality &amp; Participation constraints don't have the same meaning in ternary relationships in comparison to binary relationships.</p>
        <h4>Τernary Relationship to Binary  </h4>
        <p>θα δειξω στον χρηστη πως μια τριαδικη σχεση μετατρεπεται σε δυαδικη οταν η αναπαρασταση επιτρεπει μονο δυαδικες αναπαραστασεις</p>
        <h3>Look Across &amp; Look Here notation</h3>
        
        <div style={{textAlign:'center'}}>
        <p> Both notations below mean the following sentences:   </p>
        
        <p>• The entity Employee works for One Department  </p>
        <p>• The entity Department has Many Employees    </p>
        </div>
       
        <p><i>1. Look Across notation</i></p>
        <img alt="Look Across" src={LookAcross} width={'85%'} ></img>
        
        <p><i>2. Look Here notation</i></p>
        <img alt="Look Here" src={LookHere} width={'85%'}></img>
        <h3>Attributes in Relationships</h3>
        <p>εδω θα δειξω στον χρηστη τι συμβαινει στο γνωρισμα οταν δν επιτρεπεται να μπει σε συσχετιση</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Tutorial;
