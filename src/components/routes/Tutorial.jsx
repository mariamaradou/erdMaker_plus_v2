import React from "react";
import LookAcross from "../../img/Look Across.jpg"
import LookHere from "../../img/Look Here.jpg"
import keyStrokesAndClicks from "../../img/keyStrokes&Clicks.gif"
import extensionOverlap from "../../img/extensionOverlap.gif"
import ternaryRel from "../../img/ternary_rel.jpg"
import ternaryToBinary from "../../img/ternary_to_binary.jpg"

const Tutorial = () => {
  document.title = "ERD Maker - Help";
  

  return (
    <div className="about">
      <div className="containerTwo">
        <div className="flex-container">
        <div>
        <h2>How to use</h2>
        <h3>Add a component</h3>
        <div style={{textAlign:'left'}}>
         <p >▶ Right-click on the surface to display context-menu: New Entity, New Relationship &amp; New Text 
           and then click the selection you want.  </p>
        
        <p > ▶ Alternatively, you can add a component by clicking a spot on the surface where you want to add it
         and then press component's corresponding keyboard shortcut (look below).</p>
         </div>
         <img alt="keyStrokes" src={keyStrokesAndClicks} width={'75%'} ></img>
        <h4>Keyboard shortcuts</h4>
        
        <table  >
          <tbody style={{textAlign:'left', paddingLeft:"100px"}}>
         <tr><td> <b>"e"</b> key for new Entity</td></tr>
         <tr><td> <b>"r" </b> key for new Relationship</td></tr>
         <tr><td> <b>"l"</b> key for new Label</td></tr>
         <tr><td> <b> "Alt+z" </b> keys for Undo action.<br/> <i>For multiple undos, don't press  'z' key alone, with 'Alt' pressed, but press both keys  
         on each undo action.</i></td></tr>
         <tr><td>  <b> "Alt+y"</b> keys for Redo action.<br/><i> For multiple redos, don't press only 'y' key alone, with 'Alt' pressed, but press both keys  
         on each redo action.</i></td></tr>
         <tr><td>  <b>Arrow</b> keys to move around surface</td></tr>
         <tr><td> <b>  Delete</b> key to delete a surface component</td></tr>
         <tr><td>  <b> Escape</b> key to deselect a surface component</td></tr>
         </tbody>
        </table>
    
       <h4>How to add an overlap extension (<i>Korth, Silberschatz &amp; Sudarshan notation</i>)</h4>
    
          <img alt="extensionOverlap" src={extensionOverlap} width={'75%'}></img>
      
        </div>

        <div>
        <h2 >Some theory</h2>
        <h3>Look Across &amp; Look Here notation</h3>
        
        <div style={{textAlign:'center'}}>
        <p> 💡 Both notations in figures 1 &amp; 2 below mean the following sentences:   </p>
        
        <p>• The entity Employee works for One (1) Department  </p>
        <p>• The entity Department has Many (N) Employees    </p>
        </div>
       
        <p><i>fig 1. Look Across notation</i></p>
        <img alt="Look Across" src={LookAcross} width={'85%'} ></img>
        
        <p><i>fig 2. Look Here notation</i></p>
        <img alt="Look Here" src={LookHere} width={'85%'}></img>
        
        <h3 >Ternary Relationships</h3>
        <p style={{textAlign:'left'}}>🚩 Cardinality &amp; Participation constraints don't have the same meaning in ternary relationships in comparison to binary relationships.</p>
        <h4>Τernary Relationship to Binary  </h4>
        <p>Information Engineering, Bachman &amp; Barker notations allow only binary relationships. 
          If you have a ternary relationship in Crow's foot notation, you have to convert it into binary in order to proceed 
          to one of the three notations previously mentioned.</p>
          <p><i>fig 3. Ternary Relationship</i></p>
          <img alt='ternaryRelationship' src={ternaryRel} width={'70%'}></img>
          <p><i>fig 4. Three Binary Relationships instead of one Ternary with SUPPLY as weak entity</i></p>
          <img alt='ternaryToBinary' src={ternaryToBinary} width={'70%'}></img>
        
        <h3>Attributes in Relationships</h3>
        <p>εδω θα δειξω στον χρηστη τι συμβαινει στο γνωρισμα οταν δν επιτρεπεται να μπει σε συσχετιση</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Tutorial;
