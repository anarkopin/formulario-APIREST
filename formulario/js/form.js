form.addEventListener('submit', event => {
    event.preventDefault();
    sendForm();
  });

let formResponse = document.getElementById('form');


const sendForm = async () => {
    let data = new FormData(formResponse);
    let name = data.get('name');
    let email = data.get('email');
    let number = data.get('number');
    let ruc = data.get('ruc');
    let message = data.get('message');
    
    try {
        let responseFormulario = await fetch('http://localhost:4000/api/formulario', {
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          body: JSON.stringify({
                  name: name,
                  email: email,
                  number: number,
                  ruc: ruc,
                  message: message,
    
          })
        })
        
        if(responseFormulario.status == 200 && responseFormulario.ok == true){
          
            Swal.fire(
              'Gracias!',
              'El formulario se ha enviado correctamente!',
            )
            formResponse.reset();
        } 
      } catch(err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error con el envio!',
          footer: 'Intentalo mas tarde por favor!</>'
        })
        
      }
};
