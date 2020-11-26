<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Upload Data</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item active">Upload Data</li>
              </ol>
            </div><!-- /.col -->
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->

      <section class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Manage Users Uploads</h3>
                  &nbsp;&nbsp;
                  <a
                    :href="`${mediaUrl}data-sample.xlsx`"
                    target="_blank"
                  >
                    [ Download Sample Excel ]
                  </a>
                </div>
                <div class="card-body">
                  <input 
                    type="file"
                    id="file"
                    name="file" 
                    ref="file" 
                    accept="application/ms-excel"
                    multiple
                  >
                  <br>
                  <button class="btn btn-link"
                    @click="truncateDatas"
                  >Truncate List</button>
                  <br>
                  <span style="color: red;">
                    {{ message }}
                  </span>
                  <div v-if="processing">
                    Uploading...
                  </div>
                  <div class="form-footer"
                    v-if="crude_datas.length == 0"
                  >
                    <button class="btn btn-primary btn-block"
                      @click="handleFileUpload"
                    >Upload file</button>
                  </div>
                  <div class="form-footer"
                    v-else
                  >
                    <button class="btn btn-danger btn-block"
                      @click="processFile"
                    >Process file</button>
                  </div>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table card-table table-striped table-vcenter">
                      <thead>
                        <tr align="center">
                          <th>Sr. No.</th>
                          <th>IMEI Number</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Pump Status</th>
                          <th>Voltage</th>
                          <th>Current</th>
                          <th>Frequency</th>
                          <th>Water Supply (in HRS)</th>
                          <th>Water Supply QTY (in KL)</th>
                          <th>Temperature</th>
                          <th>Phase Current R</th>
                          <th>Phase Current Y</th>
                          <th>Phase Current B</th>
                          <th>Dummy</th>
                          <th>Reserved</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(data, i) in crude_datas"
                          :key="`data${i}`"
                          align="center"
                        >
                          <td>{{ i + 1 }}</td>
                          <td>{{ data.imei_number }}</td>
                          <td>{{ data.date }}</td>
                          <td>{{ data.time }}</td>
                          <td>{{ data.pump_status }}</td>
                          <td>{{ data.voltage }}</td>
                          <td>{{ data.current }}</td>
                          <td>{{ data.frequency }}</td>
                          <td>{{ data.water_supply_hrs }}</td>
                          <td>{{ data.water_supply_qty }}</td>
                          <td>{{ data.temperature }}</td>
                          <td>{{ data.phase_current_r }}</td>
                          <td>{{ data.phase_current_y }}</td>
                          <td>{{ data.phase_current_b }}</td>
                          <td>{{ data.dummy }}</td>
                          <td>{{ data.reserved }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
export default {
  name: 'ManageDataUploads',
  async asyncData({$axios, $params}) {
    let crude_datas = await $axios.get(`/crude_datas`);
    return {
      crude_datas: crude_datas.data.data
    }
  },
  data: () => ({
    processing: false,
    crude_datas: [],
    message: '',
  }),
  mounted() {
  },
  methods: {
    async handleFileUpload() {
      this.processing = true
      this.datas = this.$refs.file.files[0]
      let formData = new FormData();
      formData.append('datas', this.datas);
      await this.$axios.post('upload_datas', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(response => {
        if(response.data.data) 
          this.crude_datas = response.data.data
        this.processing = false
        alert('Uploaded Successfully')
      })
      .catch(function(){
        console.log('FAILURE!!');
      });
      this.processing = false
    },
    async processFile() {
      try {
        this.processing = true
        await this.$axios.get('process_datas')
        alert("Processed Successfully")
        await this.$axios.get('truncate_datas')
        this.crude_datas = []
        this.processing = false
      }
      catch(e) {}
    },
    async truncateDatas() {
      await this.$axios.get('truncate_datas')
      alert("Truncated Successfully")
      this.crude_datas = []
    },
    async deleteDocument($id) {
      var r = confirm("Are you sure you want to delete the document!");
      if (r == true) {
        await this.$axios.delete(`crude_datas/${$id}`)
        this.crude_datas = this.crude_datas.filter(d => d.id != $id);
      }
    }
  }
}
</script>