<script>
export default {
  name: 'PageAboutUs'
}
</script>

<template>
  <div class="container my-5">
    <div class="row my-5">
      <div class="col-12 col-md-4 col-lg-2 text-center">
        <img src="../../public/eye-exam.png" alt="eye-exam.png">
      </div>
      <div class="col-12 col-md-8 col-lg-10">
        <h2>Chi Siamo</h2>
        <p>
          BDoctors è un'azienda medica che si dedica a migliorare l'accesso alle cure sanitarie per tutti. La nostra piattaforma permette ai pazienti di trovare rapidamente il medico di cui hanno bisogno e di prenotare una visita con facilità.
        </p>
        <p>
          Siamo composti da un team di professionisti che lavora per rendere l'assistenza sanitaria più accessibile e meno complessa. Crediamo che ognuno debba avere la possibilità di prendersi cura della propria salute in modo comodo e sicuro.
        </p>
      </div>
    </div>
    <div class="row my-5">
      <div class="col-12 order-2 col-md-8 order-md-2 col-lg-10">
        <h2>La nostra Mission</h2>
        <p>
          La mission di BDoctors è offrire a ogni paziente l'accesso a un'assistenza sanitaria di qualità, attraverso una piattaforma innovativa e facile da usare. Il nostro obiettivo è semplificare il processo di ricerca e prenotazione delle visite mediche, rendendo tutto a portata di clic.
        </p>
      </div>
      <div class="col-12 order-1 col-md-4 order-md-1 col-lg-2 order-lg-2 text-center">
        <img src="../../public/healthcare.png" alt="healthcare.png">
      </div>
    </div>
    <div class="row my-5">
      <div class="col-12 col-md-4 col-lg-2 text-center">
        <img src="../../public/eye.png" alt="eye.png">
      </div>
      <div class="col-12 col-md-8 col-lg-10">
        <h2>La nostra Vision</h2>
        <p>
          Immaginiamo un mondo dove ogni individuo possa prendersi cura della propria salute senza difficoltà. BDoctors lavora per abbattere le barriere tra pazienti e medici, creando un sistema di assistenza sanitaria più accessibile per tutti.
        </p>
      </div>
    </div>
    <div class="row my-5">
      <div class="col-12 order-2 col-md-8 order-md-2 col-lg-10 order-lg-1">
        <h2>Il Nostro Team</h2>
        <p>
          Il nostro team è composto da medici, esperti di tecnologia e assistenza clienti, tutti impegnati per offrire il meglio ai nostri pazienti. Con competenza e dedizione, siamo pronti ad assistervi in ogni fase del vostro percorso di cura.
        </p>
      </div>
      <div class="col-12 order-1 col-md-4 order-md-1 col-lg-2 order-lg-2 text-center">
        <img src="../../public/team.png" alt="team.png">
      </div>
    </div>
    <div class="row my-5">
      <div class="col-12 col-md-4 col-lg-2 text-center">
        <img src="../../public/doctor.png" alt="doctor.png">
      </div>
      <div class="col-12 col-md-8 col-lg-10">
        <h2>Cerca un Medico</h2>
        <p>
          Su BDoctors, puoi cercare il medico giusto per te in base alla specializzazione, alla posizione e alla disponibilità. La nostra piattaforma ti permette di prenotare facilmente una visita, con pochi clic.
        </p>
        <p><router-link to="/advanced-research">Trova un medico</router-link></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/generals.scss';

img {
  width: 50%;
}

h2 {
  color: #005792;
}

@media (max-width: 1200px) {
  img {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 768px) {
  img {
    width: 110px;
    height: 110px;
  }
}

@media (max-width: 425px) {
  img {
    width: 70px;
    height: 70px;
  }
}

@media (max-width: 375px) {
  img {
    width: 65px;
    height: 65px;
  }
}

@media (max-width: 320px) {
  img {
    width: 60px;
    height: 60px;
  }
}

</style>
