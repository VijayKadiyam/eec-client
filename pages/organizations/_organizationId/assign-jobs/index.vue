<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Assign Jobs</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item active">Assign Jobs</li>
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
              <input type="text" class="form-control" v-model="searchData" @keydown.enter="search" placeholder="Search by port name">
              <a href="#" @click="getData">Refresh</a>
              <br>
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Assign Job</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Select</th>
                        <th>Vessel Name</th>
                        <th>Vessel Type</th>
                        <th>Vessel Details</th>
                        <th>ETA</th>
                        <th>ETB</th>
                        <th>ETS</th>
                        <th>Operation</th>
                        <th>Cargo</th>
                        <th>Location</th>
                        <th>Port name</th>
                        <th>Agent Name</th>
                        <th>Agent Contact Details</th>
                        <th>Agent Phone</th>
                        <th>Agent Email</th>
                        <th>Agent Address</th>
                        <th>Operator Name</th>
                        <th>Operator Contact Details</th>
                        <th>Operator Phone</th>
                        <th>Operator Email</th>
                        <th>Oil Major</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="loading"
                      > 
                        <td colspan="4">Loading...</td>
                      </tr>
                      <tr v-for="(job, i) in items"
                        :key="`job{i}`"
                      >
                        <td>{{ i + 1 }}</td>
                        <td class="w-1">
                          <div class="form-check">
                            <input type="checkbox" class="form-check-input" v-model="job_id">
                          </div>
                        </td>
                        <td>{{ job.vessel_name }}</td>
                        <td>{{ job.vessel_type }}</td>
                        <td>{{ job.other_detail }}</td>
                        <td>{{ job.eta }}</td>
                        <td>{{ job.etb }}</td>
                        <td>{{ job.ets }}</td>
                        <td>{{ job.operation }}</td>
                        <td>{{ job.cargo }}</td>
                        <td>{{ job.location }}</td>
                        <td>{{ job.port_name }}</td>
                        <td>{{ job.agent_name }}</td>
                        <td>{{ job.agent_contact_person }}</td>
                        <td>{{ job.agent_phone }}, {{ job.agent_phone_2 }}</td>
                        <td>{{ job.agent_email }}</td>
                        <td>{{ job.agent_address }}</td>
                        <td>{{ job.operator_name }}</td>
                        <td>{{ job.operator_contact_person }}</td>
                        <td>{{ job.operator_phone }}, {{ job.operator_phone_2 }}</td>
                        <td>{{ job.operator_email }}</td>
                        <td>{{ job.oil_major }}</td>
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
          <div class="row">
            <div class="col-12">
              <button class="btn btn-primary btn-block"
                @click="searchInspectors"
              >Search Inspectors</button>
              <div align="center"
                v-if="loadingInspectors"
              >
                <br>
                <img src="/loading.gif"/>
              </div>
            </div>
          </div>
          <!-- /.row -->
          <br>
          <div class="row">
            <div class="col-12">
              <!-- Inspector List -->
              <div class="row">
                <div class="col-md-4"
                  v-for="(inspector, i) in inspectors"
                  :key="`inspector${i}`"
                >
                  <div class="card" align="center">
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                      <br>
                      <div class="col-md-12">
                        <div class="row">
                          <div class="col-md-6">
                            <img style="width: 70px; height: 70px; border-raduis: 5px;" :src="mediaUrl + (inspector.attachment ? inspector.attachment : '/user.png')">
                          </div>
                          <div class="col-md-6">
                            {{ inspector.emp_code }} | {{ inspector.addresses.length ? inspector.addresses[0].country : '' }}
                            <br>
                            <h4>{{ inspector.first_name }} {{ inspector.last_name }}</h4>
                          </div>
                        </div>
                      </div>
                      <br>
                      <div class="col-md-12">
                        <div class="row">
                          <div class="col-md-6">
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#mainInspectorModal">
                              Assign as Main Inspector
                            </button>

                            <!-- Modal -->
                            <div class="modal fade" id="mainInspectorModal" tabindex="-1" role="dialog" aria-labelledby="mainInspectorModalLabel" aria-hidden="true">
                              <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="mainInspectorModalLabel">Send Nomination Email</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                    <div class="form-group row">
                                      <label class="col-sm-2 col-form-label">To: </label>
                                      <div class="col-sm-10">
                                        <input type="email" class="form-control" placeholder="Enter email id" v-model="inspector.email">
                                      </div>
                                    </div>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Send Email</button>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                          <div class="col-md-6">
                            <button class="btn btn-info">Assign as Back Up Inspector</button>
                          </div>
                        </div>
                      </div>
                      <br>
                    </div>
                  </div>
                </div>
              </div>
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
  name: 'ManageJobs',
  data:() =>  ({
    searchData: '',
    items: [],
    loading: true,
    job_id: '',
    loadingInspectors: false,
    inspectors: '',
  }),
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.items = []
      this.loading = true
      let items = await this.$axios.get(`/jobs?page=1`)
      this.items = items.data.data
      this.loading = false
    },
    async search() {
      if(this.searchData != "")
      {
        this.loading = true
        let items = await this.$axios.get(`/jobs?search=${this.searchData}`);
        console.log(items)
        this.items = items.data.data
        this.loading = false
      }
    },
    async searchInspectors() {
      if(this.job_id == '') {
        alert('Please select job')
        return
      }
      this.loadingInspectors = true
      let inspectors = await this.$axios.get(`/users?role_id=3&job_id=${this.job_id}`)
      this.inspectors = inspectors.data.data
      this.loadingInspectors = false
    }
  }
}
</script>