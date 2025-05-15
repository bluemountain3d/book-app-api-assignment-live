<script setup>
  import { reactive, ref } from 'vue';
  import CTAButton from '@/components/ButtonComponent.vue';

  const API_URL = import.meta.env.VITE_API_URL;

  // Form data
  const form = reactive({
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

  const validateForm = () => {
    if (!form.title || !form.author || !form.description ||
        form.genres.length === 0 || !form.published_year || !form.image) {
      error.value = 'Alla fält måste fyllas i';
      return false;
    }
    return true;
  };

  const resetForm = () => {
    form.title = '';
    form.author = '';
    form.description = '';
    form.published_year = null;
    form.image = '';
    form.genres = [];
    genresInput.value = '';
  };

  const addBook = async (event) => {
    event.preventDefault();

    // Convert genresInput to array before validation
    if (genresInput.value) {
      form.genres = genresInput.value.split(',')
        .map(item => item.trim())
        .filter(item => item !== '');
    }

    if (!validateForm()) {
      return;
    }

    isLoading.value = true;
    error.value = '';
    message.value = '';

    try {
      const response = await fetch(`${API_URL}books`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      console.log('Response:', response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Något gick fel vid skapande av boken');
      }

      const data = await response.json();
      message.value = data.message || 'Boken har lagts till framgångsrikt';
      resetForm();
    } catch (err) {
      error.value = err.message || 'Ett fel uppstod vid tillägg av boken';
      console.error(err);
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
              v-model="form.title"
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
              v-model="form.author"
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
            v-model="form.description"
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
          <!-- <small class="form__help-text">Separera genrer med kommatecken</small> -->
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
              min="0"
              max="9999"
              v-model="form.published_year"
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
              v-model="form.image"
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
