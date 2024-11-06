<script>
export default {
  name: 'Footer'
}
</script>

<template>
  <footer class="bg-dark py-3">
    <div class="container">
      <!-- <p class="mb-0"> Questo è il footer di B-doctors</p> -->
       <div class="row">
        <div class="d-flex">
          <div class="col-3">
            <a href="#">
              <img src="../../public/logo.png" alt="logo.png">
            </a>
          </div>
          <div class="col-3">
            <ul class="list-unstyled"><h6>La nostra copagnia</h6>
              <li><a href="">Chi siamo</a></li>
              <li><a href="">Contattaci</a></li>
              <li><a href="">Lavora con noi</a></li>
            </ul>
          </div>
          <div class="col-3">
            <ul class="list-unstyled"><h6>Servizi</h6>
              <li><a href="">Ricerca medico</a></li>
              <li><a href="">Prenota una visita</a></li>
            </ul>
          </div>
          <div class="col-3">
            <ul class="list-unstyled"><h6>Medici</h6>
              <li><a href="">Accedi</a></li>
              <li><a href="">Registrati</a></li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <p class="my-5">
              Le informazioni proposte in questo sito non sono un consulto medico. In nessun caso, queste informazioni sostituiscono un consulto, una visita o una diagnosi formulata dal medico. Non si devono considerare le informazioni disponibili come suggerimenti per la formulazione di una diagnosi, la determinazione di un trattamento o l'assunzione o sospensione di un farmaco senza prima consultare un medico di medicina generale o uno specialista.
            </p>
          </div>
          <div class="d-flex justify-content-between">
            <p>Copyright © 2024 BDoctors, tutti i diritti riservati.</p>
            <div>
              <i class="bi bi-facebook"></i>
              <i class="bi bi-instagram"></i>
              <i class="bi bi-linkedin"></i>
              <i class="bi bi-youtube"></i>
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
  color: #005792;
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
  width: 30%;
}

i {
  filter: invert(100%);
  margin-right: 5px;
}

p {
  font-size: 14px;
}

</style>
