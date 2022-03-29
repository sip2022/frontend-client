class Admin_settings{

    constructor(){
        document.addEventListener("DOMContentLoaded", ()=>{
            let boton_usuario = document.getElementById("boton_usuarios");
            let boton_actividades = document.getElementById("boton_actividades");
            let boton_planes = document.getElementById("boton_planes");
    
            let settings_usuarios = document.getElementById("settings_usuarios");
            let settings_actividades = document.getElementById("settings_actividades");
            let settings_planes = document.getElementById("settings_planes");
    
            boton_usuario.addEventListener("click", ()=>{
                settings_usuarios.classList.remove("sect_hidden")
                settings_actividades.classList.add("sect_hidden")
                settings_planes.classList.add("sect_hidden")
                boton_usuario.classList.add("boton_press")
                boton_actividades.classList.remove("boton_press")
                boton_planes.classList.remove("boton_press")
            });
            boton_actividades.addEventListener("click", ()=>{
                settings_usuarios.classList.add("sect_hidden")
                settings_actividades.classList.remove("sect_hidden")
                settings_planes.classList.add("sect_hidden")
                boton_usuario.classList.remove("boton_press")
                boton_actividades.classList.add("boton_press")
                boton_planes.classList.remove("boton_press")
            });
            boton_planes.addEventListener("click", ()=>{
                settings_usuarios.classList.add("sect_hidden")
                settings_actividades.classList.add("sect_hidden")
                settings_planes.classList.remove("sect_hidden")
                boton_usuario.classList.remove("boton_press")
                boton_actividades.classList.remove("boton_press")
                boton_planes.classList.add("boton_press")
            });
        });

        let submit_newUser = document.getElementById("submit_newUser");
        submit_newUser.addEventListener("click", ()=>{
            fetch("https://sip-api-dev.herokuapp.com/user", {
                method: 'POST', 
                mode: 'cors', 
                cache: 'no-cache', 
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
                body: JSON.stringify(
                    {
                        "dni": 12345678,
                        "password": "asdwd3456",
                        "email": "diegoFake@email.com",
                        "firstName": "diego",
                        "lastName": "maradona",
                        "age": 35,
                        "phone": 1234
                    }
                )})
                .then(data => {
                    console.log('Success:', data);
                    })
                .catch((error) => {
                    console.error('Error:', error);
                    });
        })

        

    }

}

let admin_settings = new Admin_settings();

//  Supuesto y Restricciones
// La organización deberá contratar un servicio externo para llevar a cabo el mantenimiento futuro del sistema, no es necesariamente instalar terminales ya que el sistema puede utilizarse vía móvil para facilitar la usabilidad del mismo. 

// Además se debe saber que, una vez terminado el sistema, el equipo de desarrollo lo subirá al servidor que la organización le indique, dándole el control y la responsabilidad total a ellos. Esto último con el fin de evitar futuras incriminaciones al equipo ,por cualquier incidente o cambio que puedan llegar a realizar sobre el sistema.

// No será necesario que Géminis Club adquiera licencias ya que las librerías y herramientas a utilizar son de uso gratuito.