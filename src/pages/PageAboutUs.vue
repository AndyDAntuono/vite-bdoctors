<script>
export default {
  name: 'PageAboutUs'
}
</script>

<template>
  <div class="bg-aboutus">
    <div class="container py-3">
      <div class="row my-5">
        <div class="col-12">
          <div class="about-section">
            <div class="col-12 col-md-4 col-lg-2 d-flex justify-content-center">
              <div class="about-images-box">
                <img src="../../public/eye-exam.png" alt="eye-exam.png">
              </div>
            </div>
            <div class="col-12 col-md-8 col-lg-10">
              <div class="about-box">
                <h2 class="about-title">Chi siamo</h2>
                <p class="about-text">
                  <strong>BDoctors</strong> è un'azienda medica che si dedica a migliorare l'accesso alle cure sanitarie per
                  tutti. La nostra
                  <strong>piattaforma gratuita</strong> permette ai pazienti di trovare rapidamente il medico di cui hanno
                  bisogno e di contattarlo con
                  facilità.
                </p>
                <p class="about-text">
                  Il nostro team di professionisti lavora per rendere l'<strong>assistenza sanitaria più accessibile e meno
                    complessa</strong>.
                  Crediamo che ognuno debba avere la possibilità di prendersi cura della propria salute in modo comodo e
                  sicuro!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row my-5">
        <div class="about-section">
          <div class="col-12 order-2 col-md-8 order-md-2 col-lg-10">
            <div class="about-box">
              <h2 class="about-title">La nostra Mission</h2>
              <p class="about-text">
                La <em>mission</em> di BDoctors è offrire a ogni paziente l'accesso a un'<strong>assistenza sanitaria di
                  qualità</strong>, attraverso
                una piattaforma innovativa e facile da usare. Il nostro obiettivo è semplificare il processo di ricerca e
                di contatto dei medici, rendendo tutto a portata di clic.
              </p>
            </div>
          </div>
          <div class="col-12 order-1 col-md-4 order-md-1 col-lg-2 order-lg-2 d-flex justify-content-center">
            <div class="about-images-box">
              <img src="../../public/healthcare.png" alt="healthcare.png">
            </div>
          </div>
        </div>
      </div>
      <div class="row my-5">
        <div class="about-section">
          <div class="col-12 col-md-4 col-lg-2 d-flex justify-content-center">
            <div class="about-images-box">
              <img src="../../public/eye.png" alt="eye.png">
            </div>
          </div>
          <div class="col-12 col-md-8 col-lg-10">
            <div class="about-box">
              <h2 class="about-title">La nostra Vision</h2>
              <p class="about-text">
                Immaginiamo un mondo dove ogni individuo possa prendersi cura della propria salute senza difficoltà.
                BDoctors lavora per <strong>abbattere le barriere tra pazienti e medici</strong>, creando un sistema di
                assistenza sanitaria
                più accessibile per tutti.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row my-5">
        <div class="about-section">
          <div class="col-12 order-2 col-md-8 order-md-2 col-lg-10 order-lg-1">
            <div class="about-box">
              <h2 class="about-title">Il nostro Team</h2>
              <p class="about-text">
                Il nostro team è composto da medici, esperti di tecnologia e assistenza clienti, tutti impegnati per
                offrire
                il meglio ai nostri pazienti. Con competenza e dedizione, siamo pronti ad assistervi in ogni fase del
                vostro
                percorso di cura.
              </p>
            </div>
          </div>
          <div class="col-12 order-1 col-md-4 order-md-1 col-lg-2 order-lg-2 d-flex justify-content-center">
            <div class="about-images-box">
              <img src="../../public/team.png" alt="team.png">
            </div>
          </div>
        </div>
      </div>
      <div class="row my-5">
        <div class="about-section">
          <div class="col-12 col-md-4 col-lg-2 d-flex justify-content-center">
            <div class="about-images-box">
              <img src="../../public/doctor.png" alt="doctor.png">
            </div>
          </div>
          <div class="col-12 col-md-8 col-lg-10">
            <div class="about-box">
              <h2 class="about-title">Cerca un medico</h2>
              <p class="about-text">
                Su BDoctors, puoi cercare il medico giusto per te in base alla specializzazione, alla posizione e alle
                valutazioni di altri pazienti. La nostra piattaforma ti permette di <strong>prenotare facilmente</strong>
                una visita.
              </p>
              <p class="about-text">
                Inizia subito!
              </p>
              <div class="mt-4 mb-2">
                <router-link to="/advanced-research" class="send text-decoration-none"><i class="bi bi-search"></i> Trova
                  un
                  medico</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/generals.scss';

.bg-aboutus {
  background-color: $light-gray;
}

.about-section {
  display: flex;
  align-items: center;
}

.about-box {
  background-color: $pure-white;
  box-shadow: 2px 2px 3px $dark-grey;
  padding: 20px;

  .about-title {
    font-weight: bolder;
    text-shadow: 2px 2px 3px rgb(192, 192, 192);
    cursor: default;
  }

  .about-text {
    font-size: 18px;
    cursor: default;
  }
}

.about-images-box {
  max-width: 120px;
  max-height: 120px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}


h2 {
  color: #005792;
}

@media (max-width: 1200px) {
  
}

@media (max-width: 768px) {
  .about-section {
    flex-direction: column;
  }
  
  .about-images-box {
    margin-bottom: 20px;
  }
}

@media (max-width: 425px) {
  
}

@media (max-width: 375px) {
  
}

@media (max-width: 320px) {
  
}
</style>
