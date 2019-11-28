<template>
  <form>
    <div class="form-control">
      <label for="title">Title</label>
      <input
        type="text"
        id="title"
        :value="input.title"
        @change="input.title = $event.target.value"
      />
    </div>

    <div class="form-control">
      <label for="price">Price</label>
      <input
        type="number"
        id="price"
        :value="input.price"
        @change="input.price = $event.target.value"
      />
    </div>

    <div class="form-control">
      <label for="date">Date</label>
      <input
        type="datetime-local"
        id="date"
        :value="input.date"
        @change="input.date = $event.target.value"
      />
    </div>

    <div class="form-control">
      <label for="description">Description</label>
      <textarea
        :value="input.description"
        @change="input.description = $event.target.value"
        rows="4"
      ></textarea>
    </div>

    <div class="form-error">
      <p>{{ error }}</p>
    </div>
  </form>
</template>


<script>
export default {
  props: {
    error: {
      type: String,
      default: null,
    },
    input: {
      title: String,
      description: String,
      price: String,
      date: String,
    },
  },
};
</script>