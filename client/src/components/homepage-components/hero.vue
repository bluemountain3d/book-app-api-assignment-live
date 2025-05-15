<script setup>
</script>

<template>
  <main>
    <section class="hero-image">
      <img
        src="@/assets/home-banner-image.png"
        alt="Bild på person i en hängmatta som läser en bok"
        class="bg-img"
      />
      <div class="overlay"></div>
      <div class="text-overlay">
        <h1 class="header">B.O.K. <span class="header-text">– Biooptiskt Organiserad Kunskap</span></h1>
        <p class="paragraph">Där orden får mening</p>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.hero-image {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: 3rem;

  .bg-img {
    width: 100%;
    max-width: 70rem;
    height: auto;
    display: block;
  }

  .overlay {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 70rem;
    height: 81%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .text-overlay {
    position: absolute;
    top: 50%;
    left: 45%;
    transform: translate(-50%, -50%);
    color: white;

    z-index: 2;

    .header {
      font-size: var(--font-size-800);
      font-weight: 500;
      margin-bottom: 0.5rem;

      .header-text {
        font-size: var(--font-size-600);
        font-weight: 500;
      }
    }

  .paragraph {
      font-size: var(--font-size-500);
      font-weight: 400;
    }
  }
}
</style>


