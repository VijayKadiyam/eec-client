<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">RMS Primary Log</h1>
              <br>
              <client-only>
                <download-excel
                  class   = "btn btn-default"
                  :data   = "units"
                  :fields = "excel_fields"
                  worksheet = "Cumulative Repoort"
                  name    = "UnitCumulativeReport.xls"
                >
                  <a href="#" class="download">export to excel</a>
                </download-excel>
              </client-only>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item active">RMS Primary Log</li>
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
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Implementing Agency</th>
                        <th>Farmer's / Village Name</th>
                        <th>Pump (HP)</th>
                        <th>Pump Head (M) </th>
                        <th>Controller Sr. No</th>
                        <th>Location</th>
                        <th>Geo-Coordinates</th>
                        <th>Date & Time </th>
                        <th>Pump Status</th>
                        <th>PV Input</th>
                        <th>Power (W)</th>
                        <th>Frequency (Hz)</th>
                        <th>Sys Temp (°C)</th>
                        <th>Motor Current (R-Y-B)</th>
                        <th>Flow Rate (LPM)</th>
                        <th>Output (LPD)</th>
                        <th>Auto Generate Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      >
                        Loading...
                      </tr>
                      <tr
                        v-for="(unit, u) in units"
                        :key="`unit${u}`"
                        v-else
                      >
                        <td>{{ u + 1 }}</td>
                        <td>{{ unit.implementing_agency }}</td>
                        <td>{{ unit.customer_name }}</td>
                        <td>{{ unit.pump_hp }}</td>
                        <td>{{ unit.pump_head }}</td>
                        <td>{{ unit.controller_sr_no }}</td>
                        <td>{{ unit.location }}</td>
                        <td></td>
                        <td>{{ unit.data.date + ', ' + unit.data.time }}</td>
                        <td>
                          <div v-if="unit.data.pump_status == '00'">SYSTEM OFF</div>
                          <div v-if="unit.data.pump_status == '01'">SYSTEM ON</div>
                          <div v-if="unit.data.pump_status == '02'">INPUT LOW</div>
                          <div v-if="unit.data.pump_status == '03'">INPUT HIGH</div>
                          <div v-if="unit.data.pump_status == '04'">OUTPUT LOW</div>
                          <div v-if="unit.data.pump_status == '05'">OUTPUT HIGH</div>
                          <div v-if="unit.data.pump_status == '06'">BATTERY LOW</div>
                          <div v-if="unit.data.pump_status == '07'">BATTERY HIGH</div>
                          <div v-if="unit.data.pump_status == '08'">OVERLOAD</div>
                          <div v-if="unit.data.pump_status == '09'">SHORT</div>
                          <div v-if="unit.data.pump_status == '10'">DSAT</div>
                          <div v-if="unit.data.pump_status == '11'">OVER TEMPERATURE</div>
                          <div v-if="unit.data.pump_status == '12'">PHASE OPEN</div>
                          <div v-if="unit.data.pump_status == '13'">PHASE UNBALANCE</div>
                          <div v-if="unit.data.pump_status == '14'">GROUND FAULT</div>
                          <div v-if="unit.data.pump_status == '15'">DRY RUN</div>
                          <div v-if="unit.data.pump_status == '16'">WATER TANK FULL</div>
                        </td>
                        <td>{{ unit.data.voltage + 'V, ' + unit.data.current + 'A' }}</td>
                        <td></td>
                        <td>{{ unit.data.frequency }}</td>
                        <td>{{ unit.data.temperature }}</td>
                        <td>{{ unit.data.phase_current_r + '-' + unit.data.phase_current_y + '-' + unit.data.phase_current_b }}</td>
                        <td></td>
                        <td></td>
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
  name: 'ManageUnits',
  data:() =>  ({
    searchData: '',
    items: [],
    loading: true,
    currentSort:'name',
    currentSortDir:'asc',
    units: [],
    loading: false,
    excel_fields: {
      'Sr. No.': 'sr_no',
      'Implementing Agency': 'implementing_agency',
      'Farmer\'s / Village Name': 'customer_name',
      'Pump (HP)': 'pump_hp',
      'Pump Head (M)': 'pump_head',
      'Controller Sr. No': 'controller_sr_no',
      'Location': 'location',
    },
    title: 'RMS Primary Log',
  }),
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true;
      this.items = []
      let units = []
      this.loading = true
      let items = await this.$axios.get(`/units`)
      items = items.data.data
      this.items = items
      items.forEach((item, i) => {
        units.push({
          'sr_no': i + 1,
          'implementing_agency': this.organization.text,
          'customer_name': (item.first_name ? item.first_name : '') + ' ' + (item.middle_name ? item.middle_name : '') + ' ' + (item.last_name ? item.last_name : ''),
          'customer_details': `
            <b>Address: </b>${item.residence_address}
            <br>
            <b>Adhaar No: </b>${item.adhaar_no}
            <br>
            ${item.phone_no} ${item.email}
          `,
          'pump_hp': item.motor_hp ,
          'pump_head': item.motor_head_size,
          'controller_sr_no': item.serial_no_controller,
          'location': item.location_controller,
          'geo_location': '',
          'data': item.data == null ? {} : item.data 
        })
      })
      this.units = units
      this.loading = false
    },
    
  },
}
</script>