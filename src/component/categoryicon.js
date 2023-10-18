import React from 'react'
import { Grid, Button } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TvIcon from '@mui/icons-material/Tv';
import CakeIcon from '@mui/icons-material/Cake';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import './styles/categoryicon.css'
function categoryicon() {
  return (
    <div>
          <div className='Categories'>
        <Grid container spacing={1} direction="row"
          justifyContent="space-between"
          alignItems="center"
          textAlign={'center'}
        >
          <Grid item md={1}>

            <div className='Category'>
              <FilterVintageIcon sx={{ fontSize: 80 }}  />
            </div>
            Flowers

          </Grid>

          <Grid item md={1}>

            <div className='Category'>
              <CakeIcon sx={{ fontSize: 80}} />
            </div>
            Cake

          </Grid>
         
          <Grid item md={1}>
            <div className='Category'>
              <CardGiftcardIcon style={{ fontSize: '65px' }} />
              </div>
              Birthdays
        </Grid>
              
              
              <Grid item md={1}>
            <div className='Category'>
              <CelebrationIcon style={{ fontSize: '65px' }}/>
            </div>
            Occasions
          </Grid>
          
        </Grid>
      </div>
    </div>
  )
}

export default categoryicon