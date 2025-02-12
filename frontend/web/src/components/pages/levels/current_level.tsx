import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography } from '@mui/material'

export const Level: React.FC<{ levelId: string }> = ({ levelId }) => {//+
    
  
    return (
      <Typography variant='body1'>
        Конкретный уровень под номером {levelId}
      </Typography>
    );
}