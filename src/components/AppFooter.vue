<script>
export default {
  name: 'Footer'
}
</script>

<template>
  <footer class="bg-dark py-3">
    <div class="container">
      <!-- <p class="mb-0"> Questo è il footer di B-doctors</p> -->
       <div class="d-flex">
        <div class="col-4">
          <a href="#">
            <img src="../../public/logo.png" alt="logo.png">
          </a>
          <p>
            Le informazioni proposte in questo sito non sono un consulto medico. In nessun caso, queste informazioni sostituiscono un consulto, una visita o una diagnosi formulata dal medico. Non si devono considerare le informazioni disponibili come suggerimenti per la formulazione di una diagnosi, la determinazione di un trattamento o l'assunzione o sospensione di un farmaco senza prima consultare un medico di medicina generale o uno specialista
          </p>
          <p>Copyright © 2024 BDoctors, tutti i diritti riservati.</p>
        </div>
        <div class="col-4">
          <ul class="list-unstyled"><h6>La nostra copagnia</h6>
            <li><a href="">Chi siamo</a></li>
            <li><a href="">Contattaci</a></li>
            <li><a href="">Lavora con noi</a></li>
          </ul>
          <ul class="list-unstyled"><h6>Servizi</h6>
            <li><a href="">Ricerca medico</a></li>
            <li><a href="">Prenota una visita</a></li>
          </ul>
        </div>
        <div class="col-4">
          <ul class="list-unstyled"><h6>Medici</h6>
            <li><a href="">Accedi</a></li>
            <li><a href="">Registrati</a></li>
          </ul>
          <i class="bi bi-facebook"></i>
          <i class="bi bi-instagram"></i>
          <i class="bi bi-linkedin"></i>
          <i class="bi bi-youtube"></i>
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

i {
  filter: invert(100%);
  margin-right: 5px;
}

</style>
