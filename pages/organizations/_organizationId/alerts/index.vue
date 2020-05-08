<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item active">ALERTS</li>
              </ol>
            </div><!-- /.col -->
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">ALERTS</h3> &nbsp;
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <div
                    v-if="loading"
                  >
                    Loading...  
                  </div>
                  <table class="table table-head-fixed table-striped">
                    <tbody>
                      <tr
                        v-for="(alert, a) in alerts"
                        :key="`alert${a}`"
                      >
                        <td
                          style="background-color: red;color: white;"
                        >
                          <h3>{{ alert }}</h3>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>
          </div>
          <!-- /.row -->
        </div>
      </section>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
  </section>
</template>

<script type="text/javascript">
export default {
  name: 'Alerts',
  data: () => ({
    alerts: [],
    loading: false,
  }),
  mounted() {
    this.getInspectorAlerts()
  },
  methods: {
    async getInspectorAlerts() {
      this.loading = true
      let alerts = await this.$axios.get('/alerts/inspectors')
      this.alerts = alerts.data.data
      this.loading = false
    }
  }
}

</script>