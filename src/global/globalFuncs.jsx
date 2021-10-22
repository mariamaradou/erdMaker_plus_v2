import { store } from "../index.js";
import { logout, profile } from "./userRequests";
import { getdiagram, getdiagramtemp } from "./diagramRequests";
import {
  storeUserData,
  removeUserData,
  setServerTime,
  setComponents,
  repositionComponents,
  setMeta,
  resetActiveDiagram,
} from "../actions/actions";
import { ActionCreators } from 'redux-undo';

export const getProfile = (cancelToken) => {
  return profile(cancelToken)
    .then((res) => {
      if (res && res.status === 200) {
        store.dispatch(
          storeUserData({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            username: res.data.username,
            confirmed: res.data.confirmed,
            diagrams: res.data.diagrams,
            diagramsOwned: res.data.diagramsOwned,
          })
        );
        store.dispatch(setServerTime(res.data.servertime));
      } else {
        logOut();
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const getDiagram = (diagramId, cancelToken) => {
  return getdiagram(diagramId, cancelToken)
    .then((res) => {
      if (res && res.status === 200) {
     
        let data = makeCompatible(res.data);
        store.dispatch(setComponents(data.components));
        store.dispatch(setMeta(data.meta));
        store.dispatch(repositionComponents());
        store.dispatch(ActionCreators.clearHistory())
      } else {
        store.dispatch(resetActiveDiagram());
        window.location.replace("/erdmaker/");
      }
    })
    .catch((err) => {
     
      store.dispatch(resetActiveDiagram());
     window.location.replace("/erdmaker/");
    });
};



// pairnw diagramma apo ti vasi dedomenwn symfwna me to random_id meta to /designer/

export const getDiagramTemp = (params_id,cancelToken) => {
  return getdiagramtemp(params_id,cancelToken)
    .then((res) => {
      if (res && res.status === 200) {
     
        let data = makeCompatible(res.data);
        store.dispatch(setComponents(data.components));
        store.dispatch(setMeta(data.meta));
        store.dispatch(repositionComponents());
        store.dispatch(ActionCreators.clearHistory())
      
      } else {
        store.dispatch(resetActiveDiagram());
        window.location.replace("/erdmaker/nodiagramfound");
        
      }
    })
    .catch((err) => {
     
      store.dispatch(resetActiveDiagram());
    window.location.replace("/erdmaker/nodiagramfound");
     
    });
};



export function makeCompatible(data) {
  if (!data.components.hasOwnProperty('extensions')) {
    return {
      ...data,
      components: {
        ...data.components.present,
        extensions: []
      },
     
    }
  } else {
    return data;
  }
}

export const logOut = () => {
  logout()
    .then((res) => {
      store.dispatch(removeUserData());
      store.dispatch(resetActiveDiagram());
      window.location.replace("/erdmaker/");
    })
    .catch(() => {});
};
