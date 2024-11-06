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
        <div class="col-3">
          <ul class="list-unstyled"><h6>La nostra copagnia</h6>
            <li><a href="">Chi siamo</a></li>
            <li><a href="">Lavora con noi</a></li>
          </ul>
          <i class="bi bi-facebook"></i>
        </div>
        <div class="col-9">
        </div>
        <div class="col-3">
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

footer a {
  text-decoration: none;
  color: #6B6B6B;
}

footer a:hover {
  color: #76C7C0;
}
</style>
