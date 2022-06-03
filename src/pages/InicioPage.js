import Inicio_Actividades from "../components/homePage/Inicio_Actividades";
import Inicio_Planes from "../components/homePage/Inicio_Planes";
import PresentationImage from "../components/homePage/PresentationImage";


function InicioPage() {
  return (
    <section>
      <PresentationImage />
      <Inicio_Actividades />
      <Inicio_Planes />
    </section>
  );
}

export default InicioPage;