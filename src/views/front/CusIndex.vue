<!-- eslint-disable max-len -->
<template>
  <div class="container-fluid px-0">
    <div
      id="carouselExampleIndicators"
      class="carousel"
      data-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="w-100 header cusindex-header1">
            <h2 class="header-text cusindex-header-text">
              <span>生於臺灣純淨山林</span><br/>
              <span>聚天地精華而成</span>
            </h2>
          </div>
        </div>
        <div class="carousel-item">
          <div class="w-100 header cusindex-header2">
            <h2 class="header-text cusindex-header-text">
              <span>堅持有機農法</span><br/>
              <span>不使用化學藥劑</span>
            </h2>
          </div>
        </div>
        <div class="carousel-item">
          <div class="w-100 header cusindex-header3">
            <h2 class="header-text cusindex-header-text">
              <span>採取小農契作</span><br/>
              <span>兼顧品質與農民利益</span>
            </h2>
          </div>
        </div>
      </div>
      <a
        class="carousel-control carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span
          class="carousel-control-prev-icon"
          aria-hidden="true"
        />
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span
          class="carousel-control-next-icon"
          aria-hidden="true"
        />
        <span class="sr-only">Next</span>
      </a>
    </div>
    <h2 class="cusindex-content-header flex-center">精選茗茶</h2>
    <div class="row cusindex-container-limit">
      <a
        href="#"
        class="col cusindex-btn1 bg-cover flex-center"
        @click.prevent="jumpToCusProducts('')"
      >
        <span class="cusindex-btn-mask"/>
        <span class="h2 cusindex-btn-text">所有茶品</span>
      </a>
      <a
        href="#"
        class="col cusindex-btn2 flex-center bg-cover"
        @click.prevent="jumpToCusProducts('經典烏龍')"
      >
        <span class="cusindex-btn-mask"/>
        <span class="h2 cusindex-btn-text">經典烏龍</span>
      </a>
      <a
        href="#"
        class="col cusindex-btn3 flex-center bg-cover"
        @click.prevent="jumpToCusProducts('極品紅茶')"
      >
        <span class="cusindex-btn-mask"/>
        <span class="h2 cusindex-btn-text">極品紅茶</span>
      </a>
    </div>
    <h2 class="cusindex-content-header flex-center">為何要喝茶？</h2>
    <div class="row cusindex-container-limit">
      <div class="col-md-6 bg-cover cusindex-content-img1"/>
      <p class="col-md-6 cusindex-content flex-center">根據醫學研究，茶葉具有提神、抗氧化、降低血糖及血脂等多重功效，是良好的保健食品。又茶葉是東亞文化中最重要的飲料，飲用茶葉、學習茶葉知識有助提升個人氣質、建立優雅的個人形象。</p>
    </div>
    <h2 class="cusindex-content-header flex-center">為何選擇劉記茗茶？</h2>
    <div class="row d-flex cusindex-container-limit">
      <p class="flex-center cusindex-content col-md-6 order-2 order-md-1">劉記販售的所有茶葉均為臺灣生產，生長環境純淨，採有機栽培不使用任何化學藥劑，以小農契作方式收購同時保障品質及農民權益，採收後即交由資歷豐富之茶師製茶。唯有堅持，才能產出得獎無數的精品茶葉。</p>
      <div class="col-md-6 bg-cover cusindex-content-img2 order-1 order-md-2"/>
    </div>
    <h2 class="flex-center flex-column flex-sm-row text-white mt-4 mt-md-5 mb-4">
      <div class="d-sm-inline-block">劉記茗茶，</div>
      您最值得信賴的茗茶專家
    </h2>
    <VueSlickCarousel
      v-bind="settings"
      class="mx-4"
    >
      <product-card
        v-for="cusProduct in shuffleCusProducts"
        :key="cusProduct.id"
        :cusProduct="cusProduct"
      />
    </VueSlickCarousel>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import VueSlickCarousel from 'vue-slick-carousel';
import ProductCard from '@/components/ProductCard.vue';

export default {
  components: { VueSlickCarousel, ProductCard },
  data() {
    return {
      settings: {
        adaptiveHeight: true,
        arrows: true,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 800,
            settings: {
              adaptiveHeight: true,
              arrows: true,
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 576,
            settings: {
              adaptiveHeight: true,
              arrows: true,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(['cusProducts', 'cats', 'cusProductsActive']),
    shuffleCusProducts() {
      return this.cusProducts;
    },
  },
  created() {
    this.SET_MSG({ event: 'showingCoupon' });
    this.SET_CUSACTIVE('CusIndex');
  },
  methods: {
    ...mapMutations(['SET_MSG', 'SET_CUSACTIVE', 'SET_CUSPRODUCTSACTIVE']),
    jumpToCusProducts(cat) {
      this.SET_CUSPRODUCTSACTIVE(cat);
      this.$router.push('/products');
    },
  },
};
</script>

<style>
</style>
