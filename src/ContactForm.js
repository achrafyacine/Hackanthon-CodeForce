import React from 'react';
import './contactform.css';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const ContactForm = () => {
  const [formStatus, setFormStatus] = React.useState('Send')
  const onSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Submitting...')
    const { name, email, message } = e.target.elements
    let conFom = {
      name: name.value,
      email: email.value,
      message: message.value,
    }
    console.log(conFom)
  }
  return (

    <div className = "form-box">
      
        <h5 className = "form-step"> Envoyer une demande </h5>
        <form className="borderstyle">
            
            <div className = "field1">
            <medium>  </medium>
            <br/>
            <br/>
            <input placeholder="Name"/>        
            <input placeholder="Phone"/>
            <input placeholder="E-mail"/>
            <textarea placeholder="Description"/>
            </div>

            <button class="button-17" role="button"> Envoyer</button>
        </form>

    </div>
  )
}
export default ContactForm
