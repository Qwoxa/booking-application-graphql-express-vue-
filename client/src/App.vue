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
@import './sass/colors'

body
  margin: 0
  padding: 0
  font-family: sans-serif

.main_content__wrapper
  width: 100%
  color: $text

.main_content
  max-width: 1200px
  margin: 0 auto
  padding: 0 1rem

.btn
  cursor: pointer
  background-color: lighten($main, 15)
  font: inherit
  border: 1px solid $main
  border-radius: 3px
  padding: .25rem 1rem
  margin: 0 1rem
  box-shadow: 1px 1px 5px rgba(0, 0, 0, .26)

  &:hover
    background: $main

.form-control
  margin-bottom: 1rem

  label
    width: 100%
    display: block
    margin-bottom: .5rem
    text-align: left

  input
    width: 100%
    border-radius: 3px
    border: 1px solid #bbb
    padding: 5px 6px
    box-sizing: border-box


  textarea
    width: 100%
    border-radius: 3px
    border: 1px solid #bbb
    padding: 5px 6px
    box-sizing: border-box
    resize: none

.form-error
  color: $danger
  text-align: center

.form-actions
  display: flex
  justify-content: center
</style>
