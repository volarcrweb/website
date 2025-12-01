import { Route, Routes } from "react-router-dom";
import Landing from "../Landing";
import HelicopterDetail from "../components/componentsHeli/HelicopterDetail";
import { useContext } from "react";
import { LanguageContext } from "../components/LanguageProvider";







export const App_Router = () => {
  const { translation } = useContext(LanguageContext);
  const dataHelicopeters = [
    {
      id: 1,
      name: translation.heliDetail.md902Explorer.title,
      description: {
      text1: translation.heliDetail.md902Explorer.description.text1,
      text2: translation.heliDetail.md902Explorer.description.text2,
      text3: translation.heliDetail.md902Explorer.description.text3,
      text4: translation.heliDetail.md902Explorer.description.text4,
      text5: translation.heliDetail.md902Explorer.description.text5,
      text6: translation.heliDetail.md902Explorer.description.text6,
      text7: translation.heliDetail.md902Explorer.description.text7,
      },
      description2: {
        title1: translation.heliDetail.md902Explorer.description2.title1,
        text1: translation.heliDetail.md902Explorer.description2.text1,
        title2: translation.heliDetail.md902Explorer.description2.title2,
        text2: translation.heliDetail.md902Explorer.description2.text2,
        title3: translation.heliDetail.md902Explorer.description2.title3,
        text3: translation.heliDetail.md902Explorer.description2.text3,
        title4: translation.heliDetail.md902Explorer.description2.title4,
        text4: translation.heliDetail.md902Explorer.description2.text4,
        title6: translation.heliDetail.md902Explorer.description2.title6,
        text6: translation.heliDetail.md902Explorer.description2.text6
      },
      image: "/images/blanco.svg",
      video: "/images/MDheli/video1.mp4",
      url: "/MD902Explorer",
      gallery: {
        image1: "/images/MDheli/1.jpeg",
        image2: "/images/MDheli/2.jpeg",
        image3: "/images/MDheli/3.jpeg",
        image4: "/images/MDheli/4.jpeg",
        image5: "/images/MDheli/5.jpeg",
        image6: "/images/MDheli/6.jpeg",
        image7: "/images/MDheli/7.jpeg",
        image8: "/images/MDheli/8.jpeg",
        image9: "/images/MDheli/9.jpeg",
        image10: "/images/MDheli/10.jpeg",
        image11: "/images/MDheli/11.jpeg",
        image12: "/images/MDheli/12.jpeg",
        image13: "/images/MDheli/13.jpeg",
        image14: "/images/MDheli/14.jpeg",
        image15: "/images/MDheli/15.jpeg",
        image16: "/images/MDheli/16.jpeg",
        image17: "/images/MDheli/17.jpeg",
        image18: "/images/MDheli/18.jpeg"
      }
    },
    {
      id: 2,
      name: translation.heliDetail.as350b2.title,
      description: {
      text1: translation.heliDetail.as350b2.description.text1,
      text2: translation.heliDetail.as350b2.description.text2,
      text3: translation.heliDetail.as350b2.description.text3,
      text4: translation.heliDetail.as350b2.description.text4,
      text5: translation.heliDetail.as350b2.description.text5,
      text6: translation.heliDetail.as350b2.description.text6,
      text7: translation.heliDetail.as350b2.description.text7,
      },
      description2: {
        title1: translation.heliDetail.as350b2.description2.title1,
        text1: translation.heliDetail.as350b2.description2.text1,
        title2: translation.heliDetail.as350b2.description2.title2,
        text2: translation.heliDetail.as350b2.description2.text2,
        title3: translation.heliDetail.as350b2.description2.title3,
        text3: translation.heliDetail.as350b2.description2.text3,
        title4: "",
        text4: ""
      },
      image: "/images/blanco.svg",
      video: "/images/ASheli/video1.mp4",
      url: "/AS350B2",
      gallery: {
        image1: "/images/ASheli/1.jpeg",
        image2: "/images/ASheli/2.jpeg",
        image3: "/images/ASheli/3.jpeg",
        image4: "/images/ASheli/6.jpeg",
        image5: "/images/ASheli/5.jpeg",
        image6: "/images/ASheli/4.jpeg",
   
      }
    },
    {
      id: 3,
      name: translation.heliDetail.robinson44.title,
      description: {
      text1: translation.heliDetail.robinson44.description.text1,
      text2: translation.heliDetail.robinson44.description.text2,
      text3: translation.heliDetail.robinson44.description.text3,
      text4: translation.heliDetail.robinson44.description.text4,
      text5: translation.heliDetail.robinson44.description.text5,
      text6: translation.heliDetail.robinson44.description.text6,
      text7: translation.heliDetail.robinson44.description.text7,
      },
      description2: {
        title1: translation.heliDetail.robinson44.description2.title1,
        text1: translation.heliDetail.robinson44.description2.text1,
        title2: translation.heliDetail.robinson44.description2.title2,
        text2: translation.heliDetail.robinson44.description2.text2,
        title3: translation.heliDetail.robinson44.description2.title3,
        text3: translation.heliDetail.robinson44.description2.text3,
        title4: "",
        text4: ""
      },
      image: "/images/blanco.svg",
      video: "/images/Robinsonheli/video1.mp4",
      url: "/Robinson44",
      gallery: {
        image1: "/images/Robinsonheli/1.jpeg",
        image2: "/images/Robinsonheli/2.jpeg",
        image3: "/images/Robinsonheli/3.jpeg",
        image4: "/images/Robinsonheli/5.jpeg",
        image5: "/images/Robinsonheli/4.jpeg",
        image6: "/images/Robinsonheli/6.jpeg",
   
      }
    }
  ]
    
    return (
        <Routes>
          
          <Route path="/*" element={<Landing/>} />

          {dataHelicopeters.map((heli) => (
        <Route key={heli.id} path={`/${heli.url}`} element={<HelicopterDetail heli={heli}/>} />
      ))}

          {/* <Route path="/politicas-privacidad" element={<PoliticasPrivacidad/>} />
          <Route path="/success" element={<FormSucces/>} />
          <Route path="/contactos" element={<LinkTree/>} /> */}

          
    
            
        </Routes>
    );
};