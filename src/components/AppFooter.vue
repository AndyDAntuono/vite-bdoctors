<script>
export default {
  name: 'Footer'
}
</script>

<template>
  <footer class="bg-dark py-5">
    <div class="container">
      <!-- <p class="mb-0"> Questo è il footer di B-doctors</p> -->
       <div class="row">
         <div class="col-6 col-md-3 col-lg-3">
           <router-link to="/">
            <img src="../../public/logo.png" alt="logo.png">
           </router-link>
         </div>
         <div class="col-6 col-md-3 col-lg-3">
           <ul class="list-unstyled"><h6>La nostra compagnia</h6>
             <li><router-link to="/about-us">Chi siamo</router-link></li>
             <li><router-link to="/contact-us">Contattaci</router-link></li>
           </ul>
         </div>
         <div class="col-6 col-md-3 col-lg-3">
           <ul class="list-unstyled"><h6>Servizi</h6>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/advanced-research">Ricerca avanzata</router-link></li>
           </ul>
         </div>
         <div class="col-6 col-md-3 col-lg-3">
           <ul class="list-unstyled"><h6>Medici</h6>
             <li><a href="http://127.0.0.1:8000/login" target="_blank">Accedi</a></li>
             <li><a href="http://127.0.0.1:8000/register" target="_blank">Registrati</a></li>
           </ul>
         </div>
        <div class="row">
          <div class="col-12">
            <p class="footer-info my-5">
              Le informazioni proposte in questo sito non sono un consulto medico. In nessun caso, queste informazioni sostituiscono un consulto, una visita o una diagnosi formulata dal medico. Non si devono considerare le informazioni disponibili come suggerimenti per la formulazione di una diagnosi, la determinazione di un trattamento o l'assunzione o sospensione di un farmaco senza prima consultare un medico di medicina generale o uno specialista.
            </p>
          </div>
          <div class="row">
            <div class="col-12 col-md-4 col-lg-4">
              <div class="footer-icons">
                <i class="bi bi-facebook"></i>
                <i class="bi bi-instagram"></i>
                <i class="bi bi-linkedin"></i>
                <i class="bi bi-youtube"></i>
              </div>
            </div>
            <div class="col-12 col-md-8 col-lg-8">
              <p class="copyright-text">Copyright © 2024 BDoctors, tutti i diritti riservati.</p>
            </div>
          </div>
        </div>
       </div>
      
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import '../styles/generals.scss';

footer h6 {
  color: $light-blue;
}

footer p {
  color: #FFFFFF;
}

footer a {
  text-decoration: none;
  color: #FFFFFF;
}

footer a:hover {
  color: #76C7C0;
}

img {
  max-width: 50%;
  height: auto;
}

i {
  filter: invert(100%);
  margin-right: 5px;
}

p {
  font-size: 14px;
}

.copyright-text {
  text-align: end;
}

@media (max-width: 1200px) {
  img {
    max-width: 50%;
  }
}

@media (max-width: 768px) {
  img {
    max-width: 40%;
  }
}

@media (max-width: 767px) {
  .footer-icons, .copyright-text {
    text-align: center;
  }
}

@media (max-width: 425px) {
  img {
    max-width: 50%;
  }

  h6 {
    font-size: 14px;
  }

  li {
    font-size: 13px;
  }

  .footer-info, .copyright-text, .footer-icons {
    font-size: 12px;
  }
}

@media (max-width: 375px) {
  img {
    max-width: 80%;
  }

  .footer-info, .copyright-text, .footer-icons {
    font-size: 11px;
  }
}

@media (max-width: 320px) {
  .footer-info, .copyright-text, .footer-icons {
    font-size: 10px;
  }
}


</style>
