import { Box, Stack, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery } from '@mui/material'
import { useState } from 'react';
import "./tours.css"


const Tours = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const tours = [
    {
        id: 1,
        title: "Coast Tour",
        url: "#",
        image: "/images/playa2.svg",
        category: "liberia",
    },
    {
        id: 2,
        title: "Poás Volcano",
        url: "#",
        image: "/images/poas.svg",
        category: "sanjose",
    },
    
    {
        id: 3,
        title: "Rincon de la Vieja",
        url: "#",
        image: "/images/rincon.svg",
        category: "liberia",
    },
    
    {
        id: 4,
        title: "City Tour",
        url: "#",
        image: "/images/cartago.svg",
        category: "sanjose",
    },
    {
        id: 5,
        title: "Mini City Tour",
        url: "#",
        image: "/images/city.svg",
        category: "sanjose",
    },
    {
        id: 6,
        title: "Roca Bruja",
        url: "#",
        image: "/images/roca.svg",
        category: "liberia",
    },
    {
        id: 7,
        title: "Bahia Papagayo",
        url: "#",
        image: "/images/papagayo.svg",
        category: "liberia",
    },
    {
        id: 8,
        title: "Tárcoles / Carara",
        url: "#",
        image: "/images/tarcoles.svg",
        category: "sanjose",
    },
    {
        id: 9,
        title: "Manuel Antonio",
        url: "#",
        image: "/images/manuelAntonio.svg",
        category: "otros",
    },
    {
        id: 10,
        title: "Fortuna",
        url: "#",
        image: "/images/fortuna.svg",
        category: "otros",
    },
    {
        id: 12,
        title: "Rincón de la Vieja y Tenorio",
        url: "#",
        image: "/images/tenorio.svg",
        category: "otros",
    },
    {
        id: 11,
        title: "Uvita",
        url: "#",
        image: "/images/uvita.svg",
        category: "otros",
    },
  
   
    
    
]

  const categories = [
    {
        id: 1,
        name: "San José",
        icon: "/images/sanjose.svg",
        image: "/images/sanjose.svg",
        image2: "/images/sanjoseDark.svg",
        type: "sanjose",
    },
    {
        id: 2,
        name: "Liberia",
        icon: "/images/liberia.svg",
        image: "/images/papagayo.svg",
        image2: "/images/papagayoDark.svg",
        type: "liberia",
    },
    {
        id: 3,
        name: "Otros",
        icon: "/images/liberia.svg",
        image: "/images/fortuna.svg",
        image2: "/images/fortunaDark.svg",
        type: "otros",
    }
  ]

  const [alignment, setAlignment] = useState(1);

  const handleChange = (event, newAlignment) => {
    // Solo permitir cambios si hay una nueva selección (no deseleccionar)
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
 <Stack spacing={4} justifyContent={"center"} alignItems={"center"} style={{width: "100%", height: "60vh",
 backgroundImage: `url(${categories.find(category => category.id === alignment)?.image2})`,
 backgroundSize: "cover",
 backgroundPosition: "center",
 backgroundRepeat: "no-repeat",
 paddingTop: isMobile ? "1rem" : "5rem",
 marginTop: isMobile ? "-3rem" : "-5rem"
 }}>

  

  <Typography className="titleToursSeccion">
    Popular Tours
  </Typography>

  <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Categories"
        >
          <Stack direction={"row"} spacing={2}>
          {categories.map((category) => (
            <ToggleButton key={category.id} value={category.id} className="toggleButton">
              {category.name}
            </ToggleButton>
          ))}
          </Stack>
      
        </ToggleButtonGroup>


        
        {(() => {
            // Encontrar la categoría activa
            const categoryActiva = categories.find(category => category.id === alignment);
            
            if (!categoryActiva) return null;
            
            // Filtrar tours de la categoría activa
            const toursDeCategoria = tours.filter(tour => tour.category === categoryActiva.type);
            
            return (
            <Stack direction={"row"} justifyContent={isMobile ? "center" : "space-around"} spacing={isMobile ? 2 : 0} alignItems={"center"} style={{ width: isMobile ? "90%" : "60%",  }}>
              {/* Imagen de la categoría a la izquierda */}
              <Box style={{ backgroundImage: `url(${categoryActiva.image})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", width: isMobile ? "200px" : "500px", height: isMobile ? "150px" : "300px", borderRadius: "10px" }}
                  alt={categoryActiva.name}
                  
                />

          
              
              {/* Lista de nombres de tours a la derecha */}
              <Stack spacing={ isMobile ? 2 : 4}>
                
                {toursDeCategoria.map((tour) => (
                  <Typography key={tour.id} variant="body1" className="toursText">
                    • {tour.title}
                  </Typography>
                ))}
              </Stack>
            </Stack>
            );
          })()}





 </Stack>
  )
}

export default Tours
