import React from "react";
import LoginRegisterIndex from "../loginRegister/LoginRegisterIndex";
import ProfileIndex from "../profile/ProfileIndex";
import { LinkButton } from "../../global/globalComponents";
import { connect } from "react-redux";
import { resetActiveDiagram, setHelpModal} from "../../actions/actions";

const Home = (props) => {
  document.title = "ERD Maker - Home";
  return (
    <div className="home-wrapper">
      
      <Description resetActiveDiagram={props.resetActiveDiagram} setHelpModal={props.setHelpModal}/>
      {props.user.isLogged ? <ProfileIndex /> : <LoginRegisterIndex />}
   
    </div>
  );
};

const Description = (props) => (
  <div className="description">
    <div>
      An Online Entity - Relationship Diagram design tool.
      <br />
      <br />
      Get started as guest or log in to save your progress.
    </div>
    <LinkButton
      className="launch-button"
      style={null}
      label="New Diagram"
      useSpan={true}
      onClick={()=>{props.resetActiveDiagram(); 
        if(window.innerWidth>=1024){
        props.setHelpModal({modal:true})} }}
      pathname="/erdmaker/designer"
    />
  </div>
);

const mapStateToProps = (state) => ({
  user: state.user,
  meta:state.meta
});

const mapDispatchToProps = {
  resetActiveDiagram,
  setHelpModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
