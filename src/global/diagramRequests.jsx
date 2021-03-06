import axios from "axios";
import { store } from "../index";
import { serverHost, timeout } from "./constants";


const { nanoid } = require("nanoid");
//var randomID=nanoid()





export const getdiagram = (diagramId, cancelToken) => {
  return axios
    .post(
      serverHost + "/api/diagram/getdiagram",
      { id: diagramId },
      {
        withCredentials: true,
        timeout: timeout,
        cancelToken: cancelToken.token,
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        throw err;
      } else {
        return err.response;
      }
    });
};

export const getdiagramtemp = (params_id,cancelToken) => {
  
  return axios
    .get(serverHost + "/designer/" + params_id , {
      withCredentials: true,
      timeout: timeout,
      cancelToken: cancelToken.token,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        throw err;
      } else {
        return err.response;
      }
    });
};

export const sharediagramtemp = (cancelToken) => {
 return axios
    .post(
      
      serverHost + "/api/diagram/sharediagramtemp",
      {
       
       id:nanoid(),
        
        data: {
          components: store.getState().components,
          meta: store.getState().meta,
        },
      },
      {
        
        timeout: timeout,
        cancelToken: cancelToken.token,
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        throw err;
      } else {
        return err.response;
      }
    });
};

export const sharediagramtempuser = (diagramId, cancelToken) => {
  return axios
    .post(
      serverHost + "/api/diagram/sharediagramtempuser",
      { id: diagramId },
      {
      //  withCredentials: true,
        timeout: timeout,
        cancelToken: cancelToken.token,
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        throw err;
      } else {
        return err.response;
      }
    });
};



export const savediagram = (cancelToken/*,paramsId*/) => {
  return axios
    .post(
      serverHost + "/api/diagram/savediagram",
      {
        id: store.getState().general.activeDiagramId,
        data: {
          components: store.getState().components.present,
          meta: store.getState().meta,
       //   params_id:paramsId
       
        },
      },
      {
        withCredentials: true,
        timeout: timeout,
        cancelToken: cancelToken.token,
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        throw err;
      } else {
        return err.response;
      }
    });
};





export const duplicatediagram = (diagramid, cancelToken) => {
  return axios
    .post(
      serverHost + "/api/diagram/duplicatediagram",
      {
        id: diagramid,
      },
      {
        withCredentials: true,
        timeout: timeout,
        cancelToken: cancelToken.token,
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        throw err;
      } else {
        return err.response;
      }
    });
};

export const deletediagram = (diagramid, cancelToken) => {
  return axios
    .post(
      serverHost + "/api/diagram/deletediagram",
      {
        id: diagramid,
      },
      {
        withCredentials: true,
        timeout: timeout,
        cancelToken: cancelToken.token,
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        throw err;
      } else {
        return err.response;
      }
    });
};

export const exportdiagram = (cancelToken) => {
  return axios
    .post(
      serverHost + "/api/diagram/exportdiagram",
      {
        data: {
          components: store.getState().components.present,
          meta: store.getState().meta,
        },
      },
      { timeout: timeout, cancelToken: cancelToken.token }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        throw err;
      } else {
        return err.response;
      }
    });
};


export const importdiagram = (diagram, cancelToken) => {
  return axios
    .post(
      serverHost + "/api/diagram/importdiagram",
      {
        data: diagram,
      },
      {
        timeout: timeout,
        cancelToken: cancelToken.token,
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        throw err;
      } else {
        return err.response;
      }
    });
};
