import { ICocktails } from '../../types';
import { apiUrl } from '../../GlobalConstant.ts';
import { Button, CardMedia, Grid2, Typography } from '@mui/material';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import ScheduleSharpIcon from '@mui/icons-material/ScheduleSharp';

interface Props {
  cocktail: ICocktails;
}

const Cocktail: React.FC<Props> = ({ cocktail }) => {
  let cockTailPic = '';

  if (cocktail.image) {
    cockTailPic = apiUrl + '/' + cocktail.image;
  }

  return (
    <Grid2>
      <CardMedia
        component="img"
        sx={{
          width: '200px',
          height: '200px',
        }}
        image={cockTailPic}
      />
      {cocktail.isPublished ? (
        <Button color="success" endIcon={<CheckSharpIcon />} />
      ) : (
        <Button color="warning" endIcon={<ScheduleSharpIcon />} />
      )}
      <Typography textAlign="center" variant="h5" sx={{ mb: 1 }}>
        {cocktail.title}
      </Typography>
    </Grid2>
  );
};

export default Cocktail;
