<template>
    <section class="section banner">
      <div class="container-boxed">
        <div class="banner__inner">
          <picture class="banner__image">
            <source
              srcset="/images/home-banner-image-w1440.avif"
              type="image/avif"
            />
            <source
              srcset="/images/home-banner-image-w1440.webp"
              type="image/webp"
            />
            <img
              src="/images/home-banner-image-w1440.jpg"
              alt="Bild på person i en hängmatta som läser en bok"
              class="book__cover-img"
            />
          </picture>
          <div class="banner__overlay">
            <div class="banner__content">
              <h1 class="banner__title">B.O.K. <span class="banner__subtitle">– Biooptiskt Organiserad Kunskap</span></h1>
              <p class="banner__byline">Där orden får mening</p>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<style scoped lang="scss">
.banner {

  &__inner {
    position: relative;
    width: 100%;
    height: auto;

    display: flex;
    justify-content: center;
    align-items: center;

    aspect-ratio: 3/1;
    overflow: clip;
  }

  &__image {
    position: absolute;
    inset: 0;
  }

  &__image img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(black, 0.5);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    color: white;
  }

  &__content {
    display: grid;
    gap: 1rem;
  }

  &__title {
    // width: 100%;
    font-size: var(--font-size-900);
    font-weight: 500;
    line-height: 1.2;
    // argin-bottom: 0.25em;
  }

  &__subtitle {
    font-size: var(--font-size-800);
  }

  &__byline {
    font-size: var(--font-size-600);
    font-weight: 500;
    line-height: 1.3;
  }

}
</style>


