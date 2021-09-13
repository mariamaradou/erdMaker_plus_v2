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
        <h3>Context-menu display</h3>
        <div style={{textAlign:'left'}}>
         <p>Right-click on surface to display context-menu: New Entity, New Relationship &amp; New Text.  </p>
        <p> Alternatively, you can click the spot on the surface where you want to add the component 
         and then press its corresponding shortcut (look below).</p>
         </div>
        <h3>Keyboard shortcuts</h3>
        
        <table  >
          <tbody style={{textAlign:'left', paddingLeft:"100px"}}>
         <tr><td> "e" key for new Entity</td></tr>
         <tr><td> "r" key for new Relationship</td></tr>
         <tr><td> "l" key for new Label</td></tr>
         <tr><td>  "Alt+z" for Undo action</td></tr>
         <tr><td>   "Alt+y" for Redo action</td></tr>
         <tr><td>  Arrow keys to move around surface</td></tr>
         <tr><td>   Delete key to delete a surface component</td></tr>
         <tr><td>   Escape key to deselect a surface component</td></tr>
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
        <p style={{textAlign:'left'}}>Cardinality &amp; Participation don't have the same meaning in ternary relationships in comparison to binary relationships.</p>
        
        <h3>Look Across &amp; Look Here notation</h3>
        
        <div style={{textAlign:'center'}}>
        <p> Both notations below have the same meaning:   </p>
        
        <p>• The entity Employee works for One Department  </p>
        <p>• The entity Department has Many Employees    </p>
        </div>
       
        <p><i>1. Look Across notation</i></p>
        <img alt="Look Across" src={LookAcross} width={'85%'} ></img>
        
        <p><i>2. Look Here notation</i></p>
        <img alt="Look Here" src={LookHere} width={'85%'}></img>
        
        </div>
      </div>
      </div>
    </div>
  );
};

export default Tutorial;
