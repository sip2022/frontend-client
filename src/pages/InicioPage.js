import Actividades from "../components/homePage/Actividades";
import Planes from "../components/homePage/Planes";
import PresentationImage from "../components/homePage/PresentationImage";


function InicioPage() {
  return (
    <section>
      <PresentationImage />
      {/* TODO <Actividades /> */}
      <Actividades />
      {/* TODO <Planes /> */}
      <Planes />
    </section>
  );
}

export default InicioPage;