export const correctDirection = (max,relationship,cardinalityDirection,k) => {
  if (
    relationship.connections.length <= 2 &&
    cardinalityDirection === "Look Across"
  ) {
    
    return max;
  } else if (
    relationship.connections.length <= 2 &&
    cardinalityDirection === "Look Here"
  ) {
    if (relationship.connections.length === 1) {               //sxesi me ena entity
     
      console.log(k);
      max = relationship.connections[k].max;

      return max;
    } else {                                                   //sxesi me 2 entities
      max =
        k === 0
          ? relationship.connections[k + 1].max
          : relationship.connections[k - 1].max; 
      return max;
    }
  } else if( cardinalityDirection === "Look Across"){       //gia triadiki sxesi & Look Across                                               
    return max
                                         
  }
  else{                                                       //gia triadiki sxesi & Look Here
    return (max = "");   }
};

export const correctParticipation = (min,relationship,participationDirection,k) => {
  if (
    relationship.connections.length <= 2 &&
    participationDirection === "Look Across"
  ) {
    return min;
  } else if (
    relationship.connections.length <= 2 &&
    participationDirection === "Look Here"
  ) {
    if (relationship.connections.length === 1) {    //sxesi me ena entity
      console.log(k);
      min = relationship.connections[k].min;

      return min;
    } else {                                        //sxesi me 2 entities
      min =
        k === 0
          ? relationship.connections[k + 1].min
          : relationship.connections[k - 1].min; 
      return min;
    }
  } else {
    return (min = "");                              //gia triadiki sxesi mhn emfaniseis tipota
  }
};
