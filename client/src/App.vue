<template>
  <div id="app">
    <Navigation />
    <main class="main_content__wrapper">
      <div class="main_content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import Navigation from './components/Navigation';
export default {
  name: 'app',
  components: {
    Navigation,
  },
};
</script>

<style lang="sass">
@import './sass/colors';

body
  margin: 0;
  padding: 0;
  font-family: sans-serif;

.main_content__wrapper
  width: 100%;
  color: $text;

.main_content
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

</style>
