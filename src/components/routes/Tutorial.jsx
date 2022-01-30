import React from "react";
import LookAcross from "../../img/Look Across.jpg"
import LookHere from "../../img/Look Here.jpg"
import keyStrokesAndClicks from "../../img/keyStrokes&Clicks.gif"
import extensionOverlap from "../../img/extensionOverlap.gif"
import ternaryRel from "../../img/ternary_rel.jpg"
import ternaryToBinary from "../../img/ternary_to_binary.jpg"
import ternaryTeorey from "../../img/ternary_rel_teorey.jpg"
import constraintsButton from "../../img/constraintsButton.jpg"
import weakRel from "../../img/weakRel.gif"
import addExtension from "../../img/addExtension.gif"
import exportForms from "../../img/exportForms.jpg"
import sendDiagram from "../../img/send_Diagram.gif"
import relationshipAttribute from "../../img/relationshipAttribute.jpg"
import relationshiptoEntity from "../../img/relationshipToWeak.jpg"



const Tutorial = () => {
  document.title = "ERD Maker - Help";
  

  return (
    <div className="about">
      <div className="containerTwo">
        <div className="flex-container">
        <div >
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
         <tr><td> <kbd>e</kbd>  for new Entity</td></tr>
         <tr><td> <kbd>r</kbd>  for new Relationship</td></tr>
         <tr><td> <kbd>l</kbd>  for new Label</td></tr>
         <tr><td> <kbd>Alt</kbd> + <kbd>z</kbd>  for Undo action.<br/> <i>For multiple undos, don't press  'z' key alone, with 'Alt' pressed.
          Instead, press both keys  on each undo action.</i></td></tr>
         <tr><td>  <kbd> Alt</kbd> + <kbd>y</kbd> for Redo action.<br/><i> For multiple redos, don't press only 'y' key alone, with 'Alt' pressed.
         Instead, press both keys on each redo action.</i></td></tr>
         <tr><td>  <kbd>▲</kbd> or  <kbd>▼</kbd>  or  <kbd>◄</kbd>  or  <kbd>►</kbd>  to move around surface</td></tr>
         <tr><td> <kbd> Delete</kbd>  to delete a surface component</td></tr>
         <tr><td>  <kbd>Esc</kbd>  to deselect a surface component</td></tr>
         <tr><td>  <kbd style={{paddingLeft:'20px', paddingRight:'20px'}}>↵</kbd> or <kbd> Esc</kbd> to close component menu</td></tr>
         </tbody>
        </table>
        
    <h4>Add a weak relationship (<i>Elmasri &amp; Navathe notation</i>)</h4>
    
    <img alt="weakRel" src={weakRel} width={'75%'}></img>

    <h4>Add a partial disjoint specialization (<i>Elmasri &amp; Navathe notation</i>)</h4>
    
    <img alt="addExtension" src={addExtension} width={'75%'}></img>
         
           <h4>Add an overlap extension (<i>Korth, Silberschatz &amp; Sudarshan notation</i>)</h4>
    
    <img alt="extensionOverlap" src={extensionOverlap} width={'75%'}></img>
    <h4>You can share your diagrams through links</h4>
    
   <img alt="sendDiagram" src={sendDiagram} width={'100%'}  style={{paddingRight:'20px'}}></img>
    <h4>You can export compatible files for ERD Preview and Gleek</h4>
    <p>ERD Preview is a Visual Studio Code extension and Gleek is an online app.</p>
    <p> Only binary/non-attribute relationships are exported.</p>
    <p> Gleek and ERD Preview do not recognize greek characters.</p>
    <img alt="exportWay" src={exportForms} width={'45%'}></img>
    <p> Check  <span><a href="https://www.gleek.io/er-diagrams.html" rel="noreferrer" target="_blank">Gleek </a></span>  
    and  <span><a href="https://marketplace.visualstudio.com/items?itemName=kaishuu0123.vscode-erd-preview&ssr=false#overview" rel="noreferrer" target="_blank">ERD Preview</a></span></p>
  
        </div>

        <div >

          
        <h2 >Some theory</h2>
        <p> ◉ Constraints button shows Cardinality &amp; Participation for each notation. Also, it allows you to hide attributes for
           a more comprehensive and clear diagram.</p>
        <img src={constraintsButton} alt="constraintsButton" width={'50%'}></img>
        <h3>Look Across &amp; Look Here notation</h3>
        
        <div style={{textAlign:'center'}}>
        <p> 💡 Both notations in figures 1 &amp; 2 below mean the following sentences: *   </p>
        
        <p>• Employee works for One (1) Department  </p>
        <p>• Department has Many (N) Employees    </p>
        </div>
       
        <p><i>fig 1. Look Across notation </i></p>
        <img alt="Look Across" src={LookAcross} width={'85%'} ></img>
        
        <p><i>fig 2. Look Here notation </i></p>
        <img alt="Look Here" src={LookHere} width={'85%'}></img>
        <p><i>* We are showing only Cardinalities in our examples but the same goes for Participations.</i> </p>
        <h3 >Ternary relationships</h3>
        <p style={{textAlign: 'justify', textJustify: 'inter-word'}}>🚩 Look Here &amp; Look Across notations
       are  interpreted differently in ternary relationships in comparison to binary relationships.
       Ternary relationship in figure 3 is interpreted as: </p>
       <p>(i) In <i><b>Look Across</b></i> notation:</p>
       <p>•	Each Employee, assigned to a Project, works at  one (1) Location.</p>
       <p>•	Each Project, at a Location, is assigned to many (N) Employees.</p>
       <p>•	Each Employee, at a Location, is assigned at  one (1) Project. </p>
      

       <p>(ii) In <i><b>Look Here</b></i> notation:</p>
       <p>•	Each Project is assigned to one (1) Employee, at only one (1) Location.</p>
       <p>• Each Employee is assigned to many (N) Projects, in many (N) Locations.	</p>
       <p>• In each Location, one (1) Employee is assigned to one (1) Project.	 </p>

       <p><i>fig 3. Ternary relationship with constraints</i></p>
       <img src={ternaryTeorey} alt='ternaryteorey' width='70%'></img>

        <h4>Τernary relationship to Binary  </h4>
        <p style={{textAlign: 'justify', textJustify: 'inter-word'}}>🚩 Information Engineering, Bachman &amp; Barker notations allow only binary relationships. 
          If you have a ternary relationship in Crow's foot, you have to convert it  into an associative or weak entity 
          in order to proceed  to one of the three notations previously mentioned.</p>
          <p><i>fig 4. Ternary relationship</i></p>
          <img alt='ternaryRelationship' src={ternaryRel} width={'70%'}></img>
          <p><i>fig 5. Three Binary relationships instead of one Ternary with SUPPLY as weak entity</i></p>
          <img alt='ternaryToBinary' src={ternaryToBinary} width={'70%'}></img>
        
          <h4>Attribute on relationship  </h4>
        <p style={{textAlign: 'justify', textJustify: 'inter-word'}}>🚩 Information Engineering, Bachman &amp; Barker notations don't allow attributes in relationships. 
        In order to proceed to one of the three notations previously mentioned, you have to follow the instructions below:
          If it is a N-1 or 1-N relationship, move the attribute of the relationship under the N side entity. 
          If it is a 1-1 relationship, move the attribute under the entity with mandatory participation - if exists - else in any entity . 
          If it is a M-N relationship, convert the relationship to an associative or weak entity. </p>
          <p><i>fig 6. Attribute on relationship</i></p>
          <img alt='relationshipAttribute'  src={relationshipAttribute} width={'90%'}></img>
          <p><i>fig 7. The relationship converted to weak entity with its attribute</i></p>
          <img alt='relationshiptoWeakEntity'  src={relationshiptoEntity} width={'100%'}></img>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Tutorial;
