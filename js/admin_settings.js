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
        

    }

}

let admin_settings = new Admin_settings();