<template>
  <div>
    <div
      id="carouselExampleIndicators"
      class="carousel mx_n15px rounded_breakpoint"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0"
        class="active carousel_indicators"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"
        class="carousel_indicators"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"
        class="carousel_indicators"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="w-100 header cusindex_header1" alt="#">
            <h2 class="header_text cusindex_header1_text">
              <span>生於臺灣純淨山林</span><br/>
              <span>聚天地精華而成</span>
            </h2>
          </div>
        </div>
        <div class="carousel-item">
          <div class="w-100 header cusindex_header2" alt="#">
            <h2 class="header_text cusindex_header2_text">
              <span>堅持有機農法</span><br/>
              <span>不使用化學藥劑</span>
            </h2>
          </div>
        </div>
        <div class="carousel-item">
          <div class="w-100 header cusindex_header3" alt="#">
            <h2 class="header_text cusindex_header3_text">
              <span>採取小農契作</span><br/>
              <span>兼顧品質與農民利益</span>
            </h2>
          </div>
        </div>
      </div>
      <a
        class="carousel_control carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel_control carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <div class="row cusindex_content_header flex_center display-4">為何要喝茶？</div>
    <div class="row">
      <div class="col-md-6 bg_cover cusindex_content cusindex_content1_img"></div>
      <div class="col-md-6 cusindex_content flex_center">根據醫學研究，茶葉具有提神、抗氧化、降低血糖及血脂等多重功效，是良好的保健食品。又茶葉是東亞文化中最重要的飲料，飲用茶葉、學習茶葉知識有助提升個人氣質、建立優雅的個人形象。</div>
    </div>
    <div class="row cusindex_content_header flex_center display-4">為何選擇劉記茗茶？</div>
    <div class="row d-flex">
      <div class="flex_center cusindex_content col-md-6 order-2 order-md-1">劉記販售的所有茶葉均為臺灣生產，生長環境純淨，以有機方式栽培不使用任何化學藥劑，採小農契作方式收購同時保障品質及農民權益，採收後即交由資歷豐富之茶師製茶。唯有堅持，才能產出得獎無數的精品茶葉。</div>
      <div class="col-md-6 bg_cover cusindex_content
      cusindex_content2_img order-1 order-md-2"></div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('SET_MSG', { event: 'showingCoupon' });
  },
};
</script>

<style>
</style>
