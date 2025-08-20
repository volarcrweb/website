import { SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, useMediaQuery } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share';
import Seccion1 from './components/componentsSeccion1/Seccion1'
import "./styles/fonts-import.css"
import Seccion2 from './components/componentsSeccion2/Seccion2'
import Seccion3 from './components/componentsSeccion3/Seccion3'
import Seccion5 from './components/componentsSeccion5/Seccion5'

const Landing = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const actions = [
    { icon: <img src="/images/email.svg" style={{width: isMobile ? "50%" : "60%"}} alt='WA'/>, name: 'Email', url: "#" },
    { icon: <img src="/images/WANegro.svg" style={{width: isMobile ? "50%" : "60%"}} alt='WA'/>, name: 'Whatsapp', url: "https://api.whatsapp.com/send?phone=50685959741" },
  ];
  return (
<Stack justifyContent={"center"} alignItems={"center"}>
   {/* <a className='btnWA' href="https://api.whatsapp.com/send?phone=50685959741" target="_blank" rel="noopener noreferrer">
        <img src="/images/WA.svg" style={{width: isMobile ? "50%" : "60%"}} alt='WA'/>
      </a> */}

<SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'fixed', bottom: isMobile ? "15%" : "16%", right: isMobile ? "8%" : "2%" }}
        FabProps={{ sx: { bgcolor: '#134A4B', color: '#fff', '&:hover': { bgcolor: '#0f3a3b' } } }}
        icon={<SpeedDialIcon openIcon={<ShareIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            onClick={() => window.open(action.url, '_blank')}
            slotProps={{
              tooltip: {
                title: action.name,
              },
            }}
          />
        ))}
      </SpeedDial>
    <Seccion1/>
    <Seccion2/>
    <Seccion3/>
    <Seccion5/>
</Stack>
  )
}

export default Landing
