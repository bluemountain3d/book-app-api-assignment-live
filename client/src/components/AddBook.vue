<script setup>
  import { reactive, ref } from 'vue';
  import { useAuthStore } from '@/stores/auth.js';
  import CTAButton from '@/components/ButtonComponent.vue';

  const authStore = useAuthStore();
  const API_URL = import.meta.env.VITE_API_URL;
  console.log('API URL:', API_URL);

  // Form data
  const bookData = reactive({
    title: '',
    author: '',
    description: '',
    published_year: null,
    image: '',
    genres: []
  });

  // Status messages
  const message = ref('');
  const error = ref('');
  const isLoading = ref(false);

  // Temporary variable for genre input as string
  const genresInput = ref('');

  const addBook = async (event) => {
    event.preventDefault();
    isLoading.value = true;
    error.value = '';
    message.value = '';

    // Convert comma-separated string to array of genres
    // Note: No .value needed when updating bookData
    bookData.genres = genresInput.value
      .split(',')
      .map(genre => genre.trim())
      .filter(genre => genre !== '');

    // Transform form data - no .value needed here
    const formData = {
      title: bookData.title,
      author: bookData.author,
      description: bookData.description,
      published_year: parseInt(bookData.published_year),
      image: bookData.image,
      genres: bookData.genres
    };

    try {
      const response = await fetch(`${API_URL}books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authStore.token}`
        },
        body: JSON.stringify(formData)
      });

      // Handle the response
      const rawText = await response.text();

      if (!rawText) {
        throw new Error('Server returned an empty response');
      }

      let data;
      try {
        data = JSON.parse(rawText);
      } catch (jsonError) {
        console.error('Failed to parse JSON:', jsonError);
        throw new Error(`Server returned invalid response: ${rawText.substring(0, 100)}...`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add the book');
      }

      // Reset form - notice how much cleaner it is without .value
      bookData.title = '';
      bookData.author = '';
      bookData.description = '';
      bookData.published_year = null;
      bookData.image = '';
      bookData.genres = [];
      genresInput.value = '';

      message.value = 'Book saved successfully!';
    } catch (err) {
      console.error('Error during fetch:', err);
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };
</script>

<template>
  <details class="details">
    <summary class="details__summary">Lägg till bok</summary>
    <div class="details__content">
      <!-- Status messages -->
      <div v-if="message" class="form__message form__message--success">{{ message }}</div>
      <div v-if="error" class="form__message form__message--error">{{ error }}</div>

      <form class="form" @submit="addBook">
        <!-- Group: Title and Author -->
        <fieldset class="form__group">
          <legend class="form__group-title visually-hidden">Bokinformation</legend>

          <div class="form__field">
            <label class="form__label visually-hidden" for="title">Titel</label>
            <input
              class="form__input"
              type="text"
              id="title"
              name="title"
              placeholder="Titel"
              v-model="bookData.title"
              required
            >
          </div>

          <div class="form__field">
            <label class="form__label visually-hidden" for="author">Författare</label>
            <input
              class="form__input"
              type="text"
              id="author"
              name="author"
              placeholder="Författare"
              v-model="bookData.author"
              required
            >
          </div>
        </fieldset>

        <!-- Description textarea -->
        <div class="form__field">
          <label class="form__label visually-hidden" for="description">Beskrivning</label>
          <textarea
            class="form__textarea"
            id="description"
            name="description"
            placeholder="Beskrivning"
            v-model="bookData.description"
            required
          ></textarea>
        </div>

        <!-- Field for genres -->
        <div class="form__field">
          <label class="form__label visually-hidden" for="genres">Genrer</label>
          <input
            class="form__input"
            type="text"
            id="genres"
            name="genres"
            placeholder="Action, Äventyr, Fantasy"
            v-model="genresInput"
            required
          >
        </div>

        <!-- Group: Published Year, Image Name and Genres -->
        <fieldset class="form__group">
          <legend class="form__group-title visually-hidden">Ytterligare detaljer</legend>

          <div class="form__field">
            <label class="form__label visually-hidden" for="published-year">Utgivningsår</label>
            <input
              class="form__input"
              type="number"
              id="published-year"
              name="publishedYear"
              placeholder="Utgivningsår"
              minlength="0"
              maxlength="4"
              max="9999"
              v-model="bookData.published_year"
              required
            >
          </div>

          <div class="form__field">
            <label class="form__label visually-hidden" for="image-name">Bildnamn</label>
            <input
              class="form__input"
              type="text"
              id="image-name"
              name="imageName"
              placeholder="Bildnamn"
              v-model="bookData.image"
              required
            >
          </div>
        </fieldset>

        <!-- Submit button using CTA-button component -->
        <div class="form__actions">
          <CTAButton
            label="Lägg till bok"
            type="submit"
            typeOfBtn="primary-btn"
            :disabled="isLoading"
          />
        </div>
      </form>

    </div>
  </details>
</template>

<style lang="scss" scoped></style>
