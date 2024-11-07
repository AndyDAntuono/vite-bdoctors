<script>
export default {
  name: 'PageContactUs'
}
</script>

<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-12 col-md-12 col-lg-6 mb-4">
        <h3>Scrivici un Messaggio</h3>
        <p>Compila il modulo qui sotto e ti risponderemo il prima possibile.</p>
        <div class="bg-form rounded p-3">
          <form method="POST">
            <div>
              <label for="name">Nome:</label>
              <input class="d-block rounded border-0" type="text" id="first_name" name="first_name" required>
            </div>
            <div>
              <label for="name">Cognome:</label>
              <input class="d-block rounded border-0" type="text" id="last_name" name="last_name" required>
            </div>
            <div>
              <label for="email">Email:</label>
              <input class="d-block rounded border-0" type="email" id="email" name="email" required>
            </div>
            <div>
              <label for="subject">Oggetto:</label>
              <input class="d-block rounded border-0" type="text" id="subject" name="subject" required>
            </div>
            <div>
              <label for="message">Messaggio:</label>
              <textarea class="d-block rounded border-0 w-100" id="message" name="message" rows="10" required></textarea>
            </div>
            <div>
              <button class="mt-3 rounded" type="submit">Invia Messaggio</button>
            </div>
          </form>
        </div>
      </div>

      <div class="col-12 col-md-12 col-lg-6">
        <div class="contact-details mb-4">
          <div class="contact-item">
              <h3>Telefono</h3>
              <p><a href="tel:+39123456789">+39 123 456 789</a></p>
          </div>
          <div class="contact-item">
              <h3>Email</h3>
              <p><a href="mailto:info@bdoctors.com">info@bdoctors.com</a></p>
          </div>
          <div class="contact-item">
              <h3>Indirizzo</h3>
              <p>Via Roma, 123<br>Roma, 00100</p>
          </div>
        </div>
        <section id="map-location">
          <h3>Dove Trovarci</h3>
          <p>Consulta la mappa per raggiungerci facilmente presso la nostra sede.</p>
          <!-- Mappa incorporata -->
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243645.9711975291!2d12.492231!3d41.902784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61044c1f9fd1%3A0x1f27b19d56dd23bb!2sRoma!5e0!3m2!1sit!2sit!4v1634236208423!5m2!1sit!2sit"
              width="100%" height="275" style="border:0;" allowfullscreen="" loading="lazy">
          </iframe>
      </section>
      </div>
      
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/generals.scss';

h3 {
  color: #005792;
}

.bg-form {
  background-color: #76C7C0;
}

</style>
