import React from 'react';
import { useState } from "react";
import Badge from '@mui/material/Badge';


export function Counter() {
  const [like, setLike] = useState(0);
  const [disLike, setDisLike] = useState(0);

  return (
    <div className="counter-container">

      <div className="counter-button-container">
      
        <Badge badgeContent={like}  color="primary" onClick={() => { setLike(like + 1); }}>
        👍
        </Badge>


        <Badge badgeContent={disLike} color="error" onClick={() => { setDisLike(disLike + 1); }}>
        👎
        </Badge>

        
      </div>
    </div>
  );
}
