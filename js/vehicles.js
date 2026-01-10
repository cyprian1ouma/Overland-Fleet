$(document).ready(function(){
    const addallocationvehicle=$("#addallocationvehicle"),
         allocatevehiclemodal=$("#allocatevehiclemodal")

      addallocationvehicle.on("click",()=>{
        allocatevehiclemodal.modal("show")
      })
})