<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Jobs</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item active">Job Reports</li>
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
              <input type="text" class="form-control" v-model="searchData" @keydown.enter="search" placeholder="Search here...">
              <a class="refresh" href="#" @click="getData">Refresh</a>
              <br>
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Jobs</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Select</th>
                        <th>Main Inspector Details</th>
                        <th>Backup Inspector Details</th>
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
                        :key="`job${i}`"
                      >
                        <td>{{ i + 1 }}</td>
                        <td class="w-1">
                          <div class="form-check">
                            <input type="radio" :value="job.id" class="form-check-input" v-model="job_id" @change="getJob">
                          </div>
                        </td>
                        <td>
                          <span
                            v-for="(main, u) in job.users"
                            :key="`main${u}`"
                            v-if="main.pivot.assign_type == 'Main'"
                          >
                            {{ u + 1 }}. {{ main.first_name }} {{ main.middle_name }} {{ main.last_name }}
                            <span v-if="main.pivot.status == 0"><b>(On Hold)</b></span>
                            <span v-if="main.pivot.status == 1"><b>(Accepted)</b></span>
                            <span v-if="main.pivot.status == 2"><b>(Not Accepted)</b></span>
                            <br>
                          </span>
                        </td>
                        <td>
                          <span
                            v-for="(back, u) in job.users"
                            :key="`back${u}`"
                            v-if="back.pivot.assign_type == 'Back up'"
                          >
                            {{ u + 1 }}. {{ back.first_name }} {{ back.middle_name }} {{ back.last_name }}
                            <span v-if="back.pivot.status == 0"><b>(On Hold)</b></span>
                            <span v-if="back.pivot.status == 1"><b>(Accepted)</b></span>
                            <span v-if="back.pivot.status == 2"><b>(Not Accepted)</b></span>
                            <br>
                          </span>
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
              <br>
              <div class="card"
                v-if="job_id"
              >
                <div class="card-header">
                  <h3 class="card-title">Job Reports</h3> &nbsp;
                  <button type="button" class="btn btn-small btn-primary" data-toggle="modal" data-target="#reportModal" @click="getReportModal">
                    Add New
                  </button>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-head-fixed table-striped">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Actions</th>
                        <th>Added By</th>
                        <th>Report</th>
                        <th>Details</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(report, i) in job.job_reports"
                        :key="`report${i}`"
                      >
                        <td>{{ i + 1 }}</td>
                        <td>
                          <button class="btn btn-flat" data-toggle="modal" data-target="#reportModal" @click="getReportModal(report)">
                            <i class="fa fa-edit"></i>
                          </button>
                          <button class="btn btn-flat"
                            @click="delReport(report.id)"
                          >
                            <i class="fa fa-trash"></i>
                          </button>
                        </td>
                        <td>{{ report.user.first_name }} {{ report.user.middle_name }} {{ report.user.last_name }}</td>
                        <td><a :href="mediaUrl + report.file_path" target="_blank">{{ report.file_path }}</a></td>
                        <td>{{ report.details }}</td>
                        <td v-if="report.status == 0">Uploaded</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->


              <!-- Report Modal -->
              <div class="modal fade" id="reportModal" tabindex="-1" data-backdrop="static" aria-labelledby="reportModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="reportModalLabel">Add Report</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div class="form-group">
                        <a :href="mediaUrl + report.file_path" target="_blank">{{ report.file_path }}</a>
                        <br>
                        <label class="form-label">Attachment</label>
                        <br>
                        <input type="file" id="file" name="file" ref="file" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" multiple>
                      </div>
                      <div class="form-group">
                        <label class="form-label">Details</label>
                        <br>
                        <textarea class="form-control" v-model="report.details"></textarea>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary"
                        :disabled="processingReport" @click="saveReport"
                      >
                        {{ processingReport ? 'Saving Report...' : 'Save Report' }}
                      </button>
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
  name: 'ManageJobReports',
  data:() =>  ({
    searchData: '',
    items: [],
    loading: true,
    job_id: '',
    job: {},
    processingReport: false,
    report: {
      job_id: '',
      user_id: '',
      status: '',
      details: '',
      file_path: ''
    }
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
    getJob() {
      this.job = this.items.find(item => item.id == this.job_id)
    },
    async getJobFromApi() {
      let job = await this.$axios.get(`/jobs/${this.job.id}`)
      job = job.data.data
      this.job = job
    },
    getReportModal(report = {}) {
      this.report = report
    },
    async delReport(id) {
      let r = confirm('Are you sure you want to delete the data?')
      if(r == true)
      {
        await this.$axios.delete(`/jobs/${this.job.id}/job_reports/${id}`)
        this.getJobFromApi()
      }
    },
    async saveReport() {
      this.processingReport = true
      this.report.job_id = this.job.id
      this.report.user_id = this.user.id
      this.report.status = 0
      let job = {}
      if(!this.report.id) {
        job = await this.$axios.post(`/jobs/${this.job.id}/job_reports`, this.report)
        job = job.data.data
      }
      else {
        job = await this.$axios.patch(`/jobs/${this.job.id}/job_reports/${this.report.id}`, this.report)
        job = job.data.data
      }
      this.report.id = job.id
      await this.handleFileUpload()
      await this.getJobFromApi()
      this.processingReport = false
      $('#reportModal').modal('hide')
    },
    async handleFileUpload() {
      this.attachment = this.$refs.file.files[0]
      let formData = new FormData();
      formData.append('reportid', this.report.id);
      formData.append('attachment', this.attachment);
      await this.$axios.post('upload_job_report_attachment', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(response => {
      })
      .catch(function(){
        console.log('FAILURE!!');
      });
    },
  }
}
</script>