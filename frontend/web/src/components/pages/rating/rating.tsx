import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const RatingTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Пользователь</TableCell>
              <TableCell align="right">Процент побед</TableCell>
              <TableCell align="right">Количество игр</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.percent}</TableCell>
                <TableCell align="right">{row.wins}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }


export const Rating = () => {
    
  
    return (
        <div>
        <Typography variant='h1'>
        Rating
      </Typography>
        <RatingTable />
        </div>
    );
  }

  
  function createData(
    name: string,
    percent: number,
    wins: number
  ) {
    return { name, percent, wins };
  }
  
  const rows = [
    createData('Frozen yoghurt', 23.5, 18),
    createData('Ice cream sandwich', 27.5, 9),
    createData('Eclair', 22.0, 16),
    createData('Cupcake', 35.6, 31),
    createData('Gingerbread', 56.9, 16),
  ];
  
  