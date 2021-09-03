import React from "react";
import LookAcross from "../../img/Look Across.jpg"
import LookHere from "../../img/Look Across.jpg"

const Tutorial = () => {
  document.title = "ERD Maker - Tutorial";
  
  /////////////////// xwrise to HOW TO USE me to SOME THEOREY se 2 stiles se pinaka /////////////////////
  return (
    <div className="about">
      <div className="container">
        <div>
        <h2>How to use</h2>
         Right-click on surface to display context-menu: New Entity, New Relationship &amp; New Text <br></br>
         Alternatively, you can click the spot on the surface where you want to add the component 
         and then press its corresponding shortcut (look below)
         <hr/>
        <h2>Keyboard shortcuts</h2>
        <hr/>
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
        <h2>Some theorey</h2>
        <h3>Ternary Relationships</h3>
        Cardinality &amp; Participation don't have the same meaning in ternary relationships in comparison to binary relationships.
        <hr/>
        <h3>Look Across &amp; Look Here notation</h3>
        <hr></hr>
        Both notations have the same meaning: <br></br>
        • The entity Employee works for One Department <br></br>
        • The entity Department has Many Employees
        <hr></hr>
        Look Across notation
        <img alt="Look Across" src={LookAcross} width={'500px'} ></img>
        <hr></hr>
        Look Here notation
        <img alt="Look Here" src={LookHere} width={'500px'}></img>
        
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
