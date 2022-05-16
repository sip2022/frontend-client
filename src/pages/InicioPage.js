import Actividades from "../components/homePage/Actividades";
import Planes from "../components/homePage/Planes";
import PresentationImage from "../components/homePage/PresentationImage";


function InicioPage() {
  return (
    <section>
      <PresentationImage />
      <Actividades />
      <Planes />
    </section>
  );
}

export default InicioPage;