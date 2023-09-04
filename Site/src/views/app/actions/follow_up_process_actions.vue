<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/app/dashboards/dashboard">{{ $t('home') }}</a></li>
        <li class="breadcrumb-item active" aria-current="page"><strong>{{ $t('followup_process') }}</strong></li>
    </ol>

    
    
  </div>
  <!-- ============ Body content End ============= -->
</template>
<script>


export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Carrier Types"
  },
  data() {
    return {
        
    };
  },

  methods: {
      
  }
};
</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
