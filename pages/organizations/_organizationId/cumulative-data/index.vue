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
                      <tr align="center">
                        <th>Add To Email List</th>
                        <th>Sr. No.</th>
                        <th>Implementing Agency</th>
                        <th>Farmer's / Village Name</th>
                        <th>Pump (HP)</th>
                        <th>Pump Head (M) </th>
                        <th>Controller Sr. No</th>
                        <th>Location</th>
                        <th colspan="2">Geo-Coordinates</th>
                        <th>Date & Time </th>
                        <th>Pump Status</th>
                        <th>PV Input</th>
                        <th>Power (W)</th>
                        <th>Freq. (Hz)</th>
                        <th>Sys Temp (°C)</th>
                        <th>Motor Current (R-Y-B)</th>
                        <th>Flow Rate (LPM)</th>
                        <th>Output (LPD)</th>
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
                        align="center"
                      >
                        <td>
                          <input type="checkbox" value="1" v-model="unit.send_email" @change="updateEmailList(unit.id)">
                        </td>
                        <td>{{ u + 1 }}</td>
                        <td>{{ unit.implementing_agency }}</td>
                        <td>{{ unit.customer_name }}</td>
                        <td>{{ unit.pump_hp }}</td>
                        <td>{{ unit.pump_head }}</td>
                        <td>{{ unit.controller_sr_no }}</td>
                        <td>{{ unit.location }}</td>
                        <td>{{ unit.dummy }}</td>
                        <td>{{ unit.reserved }}</td>
                        <td>{{ unit.date_time }}</td>
                        <td>{{ unit.pump_status }}</td>
                        <td>{{ unit.vi }}</td>
                        <td></td>
                        <td>{{ unit.frequency }}</td>
                        <td>{{ unit.temperature }}</td>
                        <td>{{ unit.r_y_b }}</td>
                        <td>{{ unit.flow_rate }}</td>
                        <td>{{ unit.output }}</td>
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
import {pump_categories, getFlowRate} from '@/scripts/utilities.js'

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
      'Longitude': 'dummy',
      'Latitude': 'reserved',
      'Date & Time': 'date_time',
      'Pump Status': 'pump_status',
      'PV Input': 'vi',
      'Power (W)': 'power',
      'Freq. (Hz)': 'frequency',
      'Sys Temp (°C)': 'temperature',
      'Motor Current (R-Y-B)': 'r_y_b',
      'Flow Rate (LPM)': 'flow_rate',
      'Output (LPD)': 'output',
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
        item.data = item.data || {}
        units.push({
          'sr_no': i + 1,
          'id': item.id,
          'send_email': item.send_email,
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
          // 'data': item.data == null ? {} : item.data,
          'dummy': item.data.dummy,
          'reserved': item.data.reserved,
          'date_time': ((item.data.date || '') + ' ' + (item.data.time || '')),
          'pump_status': item.data == null ? '' : 
                          (item.data.pump_status == '00' ? 'SYSTEM OFF' :
                            (item.data.pump_status == '01' ? 'SYSTEM ON' :
                              (item.data.pump_status == '02' ? 'INPUT LOW' :
                                (item.data.pump_status == '03' ? 'INPUT HIGH' :
                                  (item.data.pump_status == '04' ? 'OUTPUT LOW' :
                                    (item.data.pump_status == '05' ? 'OUTPUT HIGH' :
                                      (item.data.pump_status == '06' ? 'BATTERY LOW' :
                                        (item.data.pump_status == '07' ? 'BATTERY HIGH' :
                                          (item.data.pump_status == '08' ? 'OVERLOAD' :
                                            (item.data.pump_status == '09' ? 'SHORT' :
                                              (item.data.pump_status == '10' ? 'DSAT' :
                                                (item.data.pump_status == '11' ? 'OVER TEMPERATURE' :
                                                  (item.data.pump_status == '12' ? 'PHASE OPEN' :
                                                    (item.data.pump_status == '13' ? 'PHASE UNBALANCE' :
                                                      (item.data.pump_status == '14' ? 'GROUND FAULT' :
                                                        (item.data.pump_status == '15' ? 'DRY RUN' :
                                                          (item.data.pump_status == '16' ? 'WATER TANK FULL' : '')
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      )
                                    )
                                  )
                                )
                              )
                            )
                          ),
        'vi': (item.data.voltage || '') + 'V, ' + (item.data.current || '') + 'A',
        'power': item.data.voltage * item.data.current,
        'frequency': item.data.frequency,
        'temperature': item.data.temperature,
        'r_y_b': (item.data.phase_current_r || '') + '-' + (item.data.phase_current_y || '') + '-' + (item.data.phase_current_b || ''),
        'flow_rate': getFlowRate((item.data.voltage * item.data.current), item.motor_category, item.motor_hp, item.motor_head_size).toFixed(2),
        'output': '',
        })
      })
      this.units = units
      this.loading = false
    },
    async updateEmailList(id) {
      let item = this.items.find(item => item.id == id)
      item.send_email = !item.send_email
      await this.$axios.patch(`units/${id}`, item)
      alert('Updated')
    }
  },
}
</script>