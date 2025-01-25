export const contactContent = () => {
    return `
  <section id="contact">
  <p>
    I'd love to hear from you! Whether you have a question, feedback, or just want to connect, feel free to reach out using the form below or via the provided contact details.
  </p>
  <h2>Contact Details</h2>
  <ul>
    <li><strong>Email:</strong> <a href="mailto:your-email@example.com">your-email@example.com</a></li>
    <li><strong>Phone:</strong> +1 (234) 567-890</li>
    <li><strong>Location:</strong> Paris, France</li>
  </ul>
  <h2>Send a Message</h2>
  <form action="/send-message" method="POST">
    <label for="name">Your Name:</label>
    <input type="text" id="name" name="name" required placeholder="Enter your name" />
    
    <label for="email">Your Email:</label>
    <input type="email" id="email" name="email" required placeholder="Enter your email" />
    
    <label for="message">Your Message:</label>
    <textarea id="message" name="message" rows="5" required placeholder="Enter your message"></textarea>
    
    <button type="submit">Send Message</button>
  </form>
</section>

<section id="contact">
  <p>
    J'aimerais beaucoup avoir de vos nouvelles ! Que vous ayez une question, un commentaire ou simplement envie de me contacter, n'hésitez pas à utiliser le formulaire ci-dessous ou les coordonnées fournies.
  </p>
  <h2>Coordonnées</h2>
  <ul>
    <li><strong>Email :</strong> <a href="mailto:your-email@example.com">your-email@example.com</a></li>
    <li><strong>Téléphone :</strong> +33 (0)1 23 45 67 89</li>
    <li><strong>Localisation :</strong> Paris, France</li>
  </ul>
  <h2>Envoyer un Message</h2>
  <form action="/send-message" method="POST">
    <label for="name">Votre Nom :</label>
    <input type="text" id="name" name="name" required placeholder="Entrez votre nom" />
    
    <label for="email">Votre Email :</label>
    <input type="email" id="email" name="email" required placeholder="Entrez votre email" />
    
    <label for="message">Votre Message :</label>
    <textarea id="message" name="message" rows="5" required placeholder="Entrez votre message"></textarea>
    
    <button type="submit">Envoyer le Message</button>
  </form>
</section>

`;
};
