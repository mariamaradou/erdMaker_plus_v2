import React,{useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { storeUserData } from "../../actions/actions";
import {  sharediagramtemp } from "../../global/diagramRequests";
import { clientHost } from "../../global/constants";
import { Link } from "react-router-dom";

import axios from "axios";
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import {
  
    deselect,
  } from "../../actions/actions";

  const { nanoid } = require('nanoid')

 export var   randomID;
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



  

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

  const SpringModal = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const cancelToken = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  
const handleSubmit=(e)=>{
  e.preventDefault();


}
  const shareDiagramTemp = () => {
    sharediagramtemp(cancelToken.current)
      .then((res) => {
        if (res && res.status === 200) {
          console.log('saved to db temporary')
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    return () => {
      cancelToken.current.cancel("Request is being canceled");
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
  {/*  <Link to={{
    pathname: "/designer",
    search: "?id="+ nanoid(),
    
    
  }}>*/}

        {/* <form action={"/designer/"+ randomID} className="form"  onSubmit={(e)=>handleSubmit(e)}>*/}
      <button
          className="tools-button-blue"
        
          onClick={() => {
            props.deselect();
            
           randomID=nanoid()
          
          
          shareDiagramTemp();
     
           handleOpen();
            
          }}
        >
          
         Share
        </button>
    {/*    </form>*/}
       {/*</Link>*/}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">Copy & Paste the link below to share diagram</h2>
            <p id="spring-modal-description">{clientHost}?id={randomID}</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
    components: state.components.present,
  });
  
  const mapDispatchToProps = {
   storeUserData,
    deselect,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SpringModal);