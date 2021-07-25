import React,{ useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Modal from '@material-ui/core/Modal';

import Backdrop from '@material-ui/core/Backdrop';
import { storeUserData } from "../../actions/actions";
import {  sharediagramtemp,sharediagramtempuser } from "../../global/diagramRequests";

//import { shareDiagramTemp } from '../../global/globalFuncs';

import axios from "axios";
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import {
  
    deselect,
  } from "../../actions/actions";

  

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
  //const cancelToken = useRef(null);
    const cancelToken=axios.CancelToken.source();
  const handleOpen = () => {
    setOpen(true);
  };

  
const handleSubmit=(e)=>{
  e.preventDefault();
 // window.history.pushState("", "", "/designer/"+ randomID);

}

//var randomID;
//var random_id;

  const shareDiagramTemp = () => {
    
    if (props.user.isLogged && props.general.activeDiagramId) {
      sharediagramtempuser(props.general.activeDiagramId, cancelToken)
      .then((res) => {
        if (res /*&& res.status === 201*/) {
          console.log(res)
          window.history.pushState("", "", "/designer/"+ res.data.random_id);

          console.log('link fetched')
        }
      }).catch(() => {});
    }
    
     else {
    sharediagramtemp(cancelToken)
      .then((res) => {
        if (res /*&& res.status === 201*/) {
          
          window.history.pushState("", "", "/designer/"+ res.data.random_id);

          console.log('saved to db temporary')
        }
      })
      .catch(() => {});
     }
  };

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    return () => {
      cancelToken.current.cancel("Request is being canceled");
    };
  }, [ cancelToken]);

  const handleClose = () => {
    setOpen(false);
    window.history.pushState("", "", "/designer");

  };

  return (
    <div>
  {/*  <Link to={{
    pathname: "/designer",
    search: "?id="+ nanoid(),
    
    
  }}>*/}

         <form action={"/designer/*"} className="form"  onSubmit={(e)=>handleSubmit(e)}>
      <button
          className="tools-button-blue"
        
          onClick={() => {
            props.deselect();
            
         //  randomID=nanoid()
          
        
          shareDiagramTemp();
     
           handleOpen();
            
          }}
        >
          
         Share
        </button>
        </form>
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
            <h2 id="spring-modal-title">Copy & Paste the link in the search bar to share diagram</h2>
            {/*<p id="spring-modal-description">{clientHost}?id={randomID}</p> */}
           {/* <p id="spring-modal-description">{clientHost}/designer/{randomID}</p>*/}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  general: state.general,
  meta: state.meta,
  components: state.components.present,
  });
  
  const mapDispatchToProps = {
   storeUserData,
    deselect,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SpringModal);