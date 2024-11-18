<script>
import { store } from '../store';
import axios from 'axios';
export default {
  data() {
    return {
      store,
      name: '',
      last_name: '',
      email: '',
      subject: '',
      message: '',
      sending: false
    }
  },
  name: 'PageContactUs',
  methods: {
    sendMail() {
      this.sending = true
      const info = {
        name: this.name,
        last_name: this.last_name,
        email: this.email,
        subject: this.subject,
        message: this.message
      }

      axios.post(`${store.url}${store.contact}`, info).then((res) => {
        if (res.data.success) {
          this.name = "",
            this.last_name = "",
            this.email = "",
            this.subject = "",
            this.message = "",
            this.sending = false
        } else {
          console.log("Errore invio messaggio")
          this.sending = false
        }
      })
    }
  }
}
</script>

<template>
  <div class="bg-contactus">
  <div class="container py-5">
    <div class="row">
      <div class="col-12 col-md-12 col-lg-6 mb-4">
        <div class="h-100 p-2">
          <h2>Scrivici un Messaggio</h2>
          <div class="bg-form rounded p-3">
            <form method="POST" @submit.prevent="sendMail">
              <div class="row">
                <div class="col-12 col-md-6 mb-2">
                  <label class="control-label" for="name">Nome:</label>
                  <input v-model="name" class="form-control" type="text" id="first_name" name="first_name"
                    required>
                </div>
                <div class="col-12 col-md-6 mb-2">
                  <label class="control-label" for="last_name">Cognome:</label>
                  <input v-model="last_name" class="form-control" type="text" id="last_name"
                    name="last_name" required>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-md-6 mb-2">
                  <label class="control-label" for="email">Email:</label>
                  <input v-model="email" class="form-control" type="email" id="email" name="email" required>
                </div>
                <div class="col-12 col-md-6 mb-2">
                  <label class="control-label" for="subject">Oggetto:</label>
                  <input v-model="subject" class="form-control" type="text" id="subject" name="subject"
                    required>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="control-label" for="message">Messaggio:</label>
                  <textarea v-model="message" class="form-control w-100" id="message" name="message"
                    rows="10" required></textarea>
                </div>
              </div>
              <div>
                <button class="mt-3 showbtn" type="submit" :disabled="sending">{{ sending ? 'Invio...' : "Invia messaggio"}}</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-12 col-lg-6 d-flex align-items-center">
        <div class="d-flex flex-column justify-content-center p-3">
          <div class="contact-details mb-4">
            <div class="d-flex justify-content-between">
              <div class="contact-item">
                <h3><i class="bi bi-telephone-fill me-1"></i> Telefono</h3>
                <p class="text-secondary">+39 123 456 789</p>
              </div>
              <div class="contact-item">
                <h3><i class="bi bi-geo-alt-fill me-1"></i> Indirizzo</h3>
                <p class="text-end text-secondary">Via Roma, 123<br>Roma, 00100</p>
              </div>
            </div>
          </div>
          <div id="map-location">
            <h3 class="text-center">Dove Trovarci</h3>
            <p>Consulta la mappa per raggiungerci facilmente presso la nostra sede.</p>
            <!-- Mappa incorporata -->
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243645.9711975291!2d12.492231!3d41.902784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61044c1f9fd1%3A0x1f27b19d56dd23bb!2sRoma!5e0!3m2!1sit!2sit!4v1634236208423!5m2!1sit!2sit"
              width="100%" height="275" style="border:0;" allowfullscreen="" loading="lazy">
            </iframe>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
@import '../styles/generals.scss';
.bg-contactus {
  background-color: $light-gray;
}

label {
  font-size: 18px;
  color: $navy-blue;
  font-weight: 700;
}

h2 {
  color: $navy-blue;
  font-weight: bolder;
    text-shadow: 2px 2px 3px rgb(192, 192, 192);
    cursor: default;
}

h3 {
  color: $navy-blue;
}

.bg-form {
  background-color: $warm-grey;
  box-shadow: 2px 2px 3px $dark-grey;
}

button:disabled {
  background-color: $mint-green;
  cursor: not-allowed;
}
</style>
