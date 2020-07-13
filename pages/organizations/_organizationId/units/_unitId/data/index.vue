<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Unit Details (IMEI NO: {{ unit.imei_number }})</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item active">Unit Details</li>
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
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Customer / Farmer Details</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(data, d) in customer_datas"
                        :key="`cutomer${d}`"
                        style="padding: 20px;"
                      >
                        <td><b>{{ data.name }}</b></td>
                        <td>{{ data.value }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Controller Details</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(data, d) in controller_datas"
                        :key="`controller${d}`"
                        style="padding: 20px;"
                      >
                        <td><b>{{ data.name }}</b></td>
                        <td>{{ data.value }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">RMS Details</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(data, d) in rms_datas"
                        :key="`pump${d}`"
                        style="padding: 20px;"
                      >
                        <td><b>{{ data.name }}</b></td>
                        <td>{{ data.value }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Pump & Motor Details</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(data, d) in pump_datas"
                        :key="`pump${d}`"
                        style="padding: 20px;"
                      >
                        <td><b>{{ data.name }}</b></td>
                        <td>{{ data.value }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">LIVE DATA</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Pump Status</th>
                        <th>PV Input</th>
                        <th>Power (W)</th>
                        <th>Frequency (Hz)</th>
                        <th>Sys Temp (°C)</th>
                        <th>Motor Current (R-Y-B)</th>
                        <th>Flow Rate (LPM)</th>
                        <th>Output (LPD)</th>
                        <th>Location Coordinates</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(data, d) in live_datas"
                        :key="`live${d}`"
                        style="padding: 20px;"
                      >
                        <td><b>{{ d + 1 }}</b></td>
                        <td>{{ data.date }}</td>
                        <td>{{ data.time }}</td>
                        <td>
                          <div v-if="data.pump_status == '00'">SYSTEM OFF</div>
                          <div v-if="data.pump_status == '01'">SYSTEM ON</div>
                          <div v-if="data.pump_status == '02'">INPUT LOW</div>
                          <div v-if="data.pump_status == '03'">INPUT HIGH</div>
                          <div v-if="data.pump_status == '04'">OUTPUT LOW</div>
                          <div v-if="data.pump_status == '05'">OUTPUT HIGH</div>
                          <div v-if="data.pump_status == '06'">BATTERY LOW</div>
                          <div v-if="data.pump_status == '07'">BATTERY HIGH</div>
                          <div v-if="data.pump_status == '08'">OVERLOAD</div>
                          <div v-if="data.pump_status == '09'">SHORT</div>
                          <div v-if="data.pump_status == '10'">DSAT</div>
                          <div v-if="data.pump_status == '11'">OVER TEMPERATURE</div>
                          <div v-if="data.pump_status == '12'">PHASE OPEN</div>
                          <div v-if="data.pump_status == '13'">PHASE UNBALANCE</div>
                          <div v-if="data.pump_status == '14'">GROUND FAULT</div>
                          <div v-if="data.pump_status == '15'">DRY RUN</div>
                          <div v-if="data.pump_status == '16'">WATER TANK FULL</div>
                        </td>
                        <td>{{ data.voltage + 'V, ' + data.current + 'A' }}</td>
                        <td></td>
                        <td>{{ data.frequency }}</td>
                        <td>{{ data.temperature }}</td>
                        <td>{{ data.phase_current_r + '-' + data.phase_current_y + '-' + data.phase_current_b }}</td>
                        <td></td>
                        <td></td>
                        <td>{{ data.dummy }}-{{ data.reserved }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script type="text/javascript">
import moment from 'moment'

export default {
  name: 'ManageUnitDatas',
  data:() =>  ({
    loading: true,
    unit: {},
    datas: [],
    customer_datas: [],
    controller_datas: [],
    pump_datas: [],
    rms_datas: [],
    live_datas: []
  }),
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true
      let unit = await this.$axios.get(`/units/${this.$route.params.unitId}`);
      this.unit = unit.data.data
      let datas = await this.$axios.get(`/units/${this.$route.params.unitId}/datas`);
      this.datas = datas.data.data
      this.loading = false
      this.getCustomerData()
      this.getControllerData()
      this.getPumpData()
      this.getRmsData()
      this.getLiveData()
    },
    getCustomerData() {
      this.customer_datas = []
      this.customer_datas.push({name: 'First Name', value: this.unit.first_name})
      this.customer_datas.push({name: 'Middle Name', value: this.unit.middle_name})
      this.customer_datas.push({name: 'Last Name', value: this.unit.last_name})
      this.customer_datas.push({name: 'Residence Address', value: this.unit.residence_address})
      this.customer_datas.push({name: 'Phone No', value: this.unit.phone_no})
      this.customer_datas.push({name: 'Adhaar No', value: this.unit.adhaar_no})
      this.customer_datas.push({name: 'Email', value: this.unit.email})
    },
    getControllerData() {
      this.controller_datas = []
      this.controller_datas.push({name: 'Controller Serial No', value: this.unit.serial_no_controller})
      this.controller_datas.push({name: 'Controller Location', value: this.unit.location_controller})
      this.controller_datas.push({name: 'VFD Manufacturer', value: this.unit.manufacturer_vfd})
      this.controller_datas.push({name: 'VFD Serial No', value: this.unit.serial_no_vfd})
    },
    getPumpData() {
      this.pump_datas = []
      this.pump_datas.push({name: 'Motor Type', value: this.unit.motor_type})
      this.pump_datas.push({name: 'Motor Category', value: this.unit.motor_category})
      this.pump_datas.push({name: 'Motor Serial No', value: this.unit.motor_serial_no})
      this.pump_datas.push({name: 'Pump Serial No', value: this.unit.pump_serial_no})
      this.pump_datas.push({name: 'Motor HP', value: this.unit.motor_hp})
      this.pump_datas.push({name: 'Motor Head Size', value: this.unit.motor_head_size})
    },
    getRmsData() {
      this.rms_datas = []
      this.rms_datas.push({name: 'IMEI Number', value: this.unit.imei_number })
      this.rms_datas.push({name: 'Device ID', value: this.unit.device_id })
    },
    async getLiveData() {
      this.loading = true
      let datas = await this.$axios.get(`units/${this.unit.id}/datas`)
      datas = datas.data.data
      datas.forEach((data) => {
        data.created_at = moment(data.created_at).format('hh:mm:ss')
      })
      this.live_datas = datas
      this.loading = false
    },
  }
}
</script>