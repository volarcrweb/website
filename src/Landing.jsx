import { Stack, useMediaQuery } from '@mui/material'
import Seccion1 from './components/componentsSeccion1/Seccion1'
import "./styles/fonts-import.css"
import Seccion2 from './components/componentsSeccion2/Seccion2'
import Seccion3 from './components/componentsSeccion3/Seccion3'
import Seccion5 from './components/componentsSeccion5/Seccion5'

const Landing = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
<Stack justifyContent={"center"} alignItems={"center"}>
    <a className='btnWA' href="https://api.whatsapp.com/send?phone=50685959741" target="_blank" rel="noopener noreferrer">
        <img src="/images/WA.svg" style={{width: isMobile ? "50%" : "60%"}} alt='WA'/>
      </a> 
    <Seccion1/>
    <Seccion2/>
    <Seccion3/>
    <Seccion5/>
</Stack>
  )
}

export default Landing
