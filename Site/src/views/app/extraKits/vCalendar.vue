<template>
  <div class="main-content">
    <breadcumb :page="'Vue Calendar'" :folder="'Extra Kits'" />
    <b-row>
      <b-col lg="6" md="12" sm="12" class="mb-30">
        <b-card class="o-hidden">
          <h5 class="mb-2">Basic Calendar</h5>
          <p class="text-muted mb-30">Simple Basic Calendar</p>
          <v-calendar is-expanded />
        </b-card>
      </b-col>
      <b-col lg="6" md="12" sm="12" class=" mb-30">
        <b-card class="o-hidden">
          <h5 class="mb-2">Basic Calendar with Full Width</h5>
          <p class="text-muted mb-30">
            <code>is-expanded</code> used for full width
          </p>
          <v-calendar is-expanded />
        </b-card>
      </b-col>
      <b-col lg="6" md="12 mb-30">
        <b-card class="o-hidden">
          <h5 class="mb-4">Date Picker Calendar</h5>

          <v-date-picker
            is-expanded
            mode="range"
            :value="null"
            color="red"
            is-inline
          />
        </b-card>
      </b-col>
      <b-col lg="6" md="12 mb-30">
        <b-card class="o-hidden">
          <h5 class="mb-4 ">Dark Date Picker Calendar</h5>
          <v-date-picker
            is-expanded
            mode="range"
            :value="null"
            color="red"
            is-dark
            is-inline
          />
        </b-card>
      </b-col>
      <b-col lg="6" md="12 mb-30">
        <b-card class="o-hidden">
          <h5 class="mb-4 ">
            Aligned Title by using <code>title-position="right" or left</code>
          </h5>
          <v-calendar title-position="right" is-expanded />
        </b-card>
      </b-col>
      <b-col lg="6" md="12 mb-30">
        <b-card class="o-hidden">
          <h5 class="mb-4 ">More Than One Column</h5>
          <v-calendar is-expanded :columns="$screens({ default: 1, lg: 2 })" />
        </b-card>
      </b-col>
      <b-col lg="12" md="12 mb-30">
        <b-card class="o-hidden">
          <h5 class="mb-4 ">More Than One Column</h5>
          <v-calendar
            :columns="$screens({ default: 1, lg: 2 })"
            :rows="$screens({ default: 1, lg: 2 })"
            :is-expanded="$screens({ default: true, lg: true })"
          />
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "VCalendar"
  },
  data() {
    return {};
  }
};
</script>

