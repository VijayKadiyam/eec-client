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
              <a class="refresh" href="#" @click="getData">Refresh</a>
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
                        <th>Main Inspector Details</th>
                        <th>Backup Inspector Details</th>
                        <th>Oil Major</th>
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
                        <!-- <th>Agent Name</th>
                        <th>Agent Contact Details</th>
                        <th>Agent Phone</th>
                        <th>Agent Email</th>
                        <th>Agent Address</th>
                        <th>Operator Name</th>
                        <th>Operator Contact Details</th>
                        <th>Operator Phone</th>
                        <th>Operator Email</th> -->
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
                        <td>{{ job.oil_major }}</td>
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
                        <!-- <td>{{ job.agent_name }}</td>
                        <td>{{ job.agent_contact_person }}</td>
                        <td>{{ job.agent_phone }}, {{ job.agent_phone_2 }}</td>
                        <td>{{ job.agent_email }}</td>
                        <td>{{ job.agent_address }}</td>
                        <td>{{ job.operator_name }}</td>
                        <td>{{ job.operator_contact_person }}</td>
                        <td>{{ job.operator_phone }}, {{ job.operator_phone_2 }}</td>
                        <td>{{ job.operator_email }}</td> -->
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
                        <div class="row"
                          v-if="job.users.find(user => user.id == inspector.id)"
                        >
                          <div class="col-md-12">
                            <span v-if="job.users.find(user => user.id == inspector.id).pivot.assign_type == 'Main'"><b>Sent Nomination Email for Main Inspector</b><br></span>
                            <span v-if="job.users.find(user => user.id == inspector.id).pivot.assign_type == 'Back up'"><b>Sent Nomination Email for Back Up Inspector</b><br></span>
                            <span v-if="job.users.find(user => user.id == inspector.id).pivot.status == 0"><b>[On Hold]</b><br></span>
                            <span v-if="job.users.find(user => user.id == inspector.id).pivot.status == 1"><b>[Accepted]</b><br></span>
                            <span v-if="job.users.find(user => user.id == inspector.id).pivot.status == 2"><b>[Not Accepted]</b><br></span>
                          </div>
                        </div>
                        <div class="row"
                        >
                          <div class="col-md-6">
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#mainInspectorModal" @click="selectInspector(inspector.id)">
                              Assign as Main Inspector
                            </button>
                          </div>
                          <div class="col-md-6">
                            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#backUpInspectorModal" @click="selectInspector(inspector.id)">
                              Assign as Back Up Inspector
                            </button>
                          </div>
                        </div>
                      </div>
                      <br>
                    </div>
                  </div>
                </div>

                <!-- Main Inspector Modal -->
                <div class="modal fade" id="mainInspectorModal" tabindex="-1" data-backdrop="static" aria-labelledby="mainInspectorModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="mainInspectorModalLabel">Send Nomination Email (Main Inspector)</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="form-group row">
                          <label class="col-sm-2 col-form-label">To: </label>
                          <div class="col-sm-10">
                            {{ jobInspector.email }}
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-2 col-form-label">Message: </label>
                          <div class="col-sm-10 div-table">
                            <no-ssr placeholder="Loading...">
                              <editor 
                                :data="jobInspector.message"
                                @updateHtml="updateHtml"
                              ></editor>
                            </no-ssr>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="assignInspector('Main')"
                          :disabled="processingEmail"
                        >
                          {{ processingEmail ? 'Sending Email...' : 'Send Email' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Backup Inspector Modal -->
                <div class="modal fade" id="backUpInspectorModal" tabindex="-1" data-backdrop="static" aria-labelledby="backUpInspectorModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="backUpInspectorModalLabel">Send Nomination Email (Back Up Inspector)</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="form-group row">
                          <label class="col-sm-2 col-form-label">To: </label>
                          <div class="col-sm-10">
                            {{ jobInspector.email }}
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-2 col-form-label">Message: </label>
                          <div class="col-sm-10 div-table">
                            <no-ssr placeholder="Loading...">
                              <editor 
                                :data="jobInspector.message"
                                @updateHtml="updateHtml"
                              ></editor>
                            </no-ssr>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="assignInspector('Back up')"
                          :disabled="processingEmail"
                        >
                          {{ processingEmail ? 'Sending Email...' : 'Send Email' }}
                        </button>
                      </div>
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
import editor from '@/components/editor.vue'
import moment from 'moment'

export default {
  name: 'ManageJobs',
  data:() =>  ({
    searchData: '',
    items: [],
    loading: true,
    job_id: '',
    job: {},
    loadingInspectors: false,
    inspectors: '',
    inspector: {
    },
    jobInspector: {
      email: '',
      message: ''
    },
    processingEmail: false
  }),
  mounted() {
    this.getData()
  },
  components: {
    editor
  },
  methods: {
    updateHtml(html) {
      this.inspector.message = html
    },
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
        this.items = items.data.data
        this.loading = false
      }
    },
    getJob() {
      this.job = this.items.find(item => item.id == this.job_id)
      this.inspectors = []
    },
    async getJobFromApi() {
      let job = await this.$axios.get(`/jobs/${this.job.id}`)
      job = job.data.data
      this.job = job
      this.inspectors = []
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
    },
    async assignInspector(assignType) {
      this.processingEmail = true
      this.jobInspector.job_id = this.job_id
      this.jobInspector.user_id = this.inspector.id
      this.jobInspector.assign_type = assignType
      this.jobInspector.status = 0
      this.jobInspector.email_text = this.jobInspector.message
      this.jobInspector.reason = '-'
      await this.$axios.post('job_user', this.jobInspector)
      await this.sendEmail()
      await this.getJobFromApi()
      await this.searchInspectors()
      this.processingEmail = false
      $('#mainInspectorModal').modal('hide')
      $('#backUpInspectorModal').modal('hide')
    },
    async sendEmail() {
      let payload = {
        'jobId': this.job_id,
        'userId': this.inspector.id,
        'message': this.jobInspector.message
      }
      await this.$axios.post(`/emails/job-nomination`, payload)
    },
    selectInspector(id) {
      this.inspector = this.inspectors.find(inspector => inspector.id == id)
      this.jobInspector.email = this.inspector.email
      this.jobInspector.message = this.mainInspectorEmailContent()
    },
    mainInspectorEmailContent() {
      return `
        <table class="email-table">
          <tbody>
            <tr>
              <td>
                <b>Today's Date</b>
              </td>
              <td>
                ${moment()}
              </td>
            </tr>
          </tbody>
        </table>
        <br>
        Dear ${this.inspector.first_name} ${this.inspector.last_name},
        <br><br>
        Aethon Marine Services nominates you to inspect <b>${this.job.vessel_name}</b> on behalf of <b>${this.job.oil_major}</b> at <b>${this.job.location}</b>.
        <br><br>
        Details are as follows:
        <br>
        <table class="email-table">
          <tbody>
            <tr>
              <td>
                <b>Oil Major / Submitting Member</b>
              </td>
              <td>
                ${this.job.oil_major}
              </td>
            </tr>
          </tbody>
        </table>
        <br>
        <table class="email-table">
          <thead>
            <tr>
              <td colspan="4">
                <b>Vessel Information</b>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>Name</b>
              </td>
              <td>
                ${this.job.vessel_name}
              </td>
              <td>
                <b>Vessel Type</b>
              </td>
              <td>
                ${this.job.vessel_type}
              </td>
            </tr>
            <tr>
              <td>
                <b>Other Details</b>
              </td>
              <td>
                ${this.job.other_detail}
              </td>
              <td>
                <b>Cargo</b>
              </td>
              <td>
                ${this.job.cargo}
              </td>
            </tr>
            <tr>
              <td>
                <b>ETA</b>
              </td>
              <td>
                ${this.job.eta}
              </td>
              <td>
                <b>ETB</b>
              </td>
              <td>
                ${this.job.etb}
              </td>
            </tr>
            <tr>
              <td>
                <b>ETS</b>
              </td>
              <td>
                ${this.job.ets}
              </td>
              <td>
                <b>Operation</b>
              </td>
              <td>
                ${this.job.operation}
              </td>
            </tr>
            <tr>
              <td>
                <b>Location</b>
              </td>
              <td>
                ${this.job.location}
              </td>
              <td>
                <b>Port Name</b>
              </td>
              <td>
                ${this.job.port_name}
              </td>
            </tr>
          </tbody>
        </table>
        <br>
        <table class="email-table">
          <thead>
            <tr>
              <td>
                <b>Owner/Operator Details</b>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                ${this.job.operator_details}
                <br>
                <br>
              </td>
            </tr>
          </tbody>
        </table>
        <br>
        <table class="email-table">
          <thead>
            <tr>
              <td>
                <b>Agent Details</b>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                ${this.job.agent_details}
                <br>
                <br>
              </td>
            </tr>
          </tbody>
        </table>
        <br>
        <br>
        <br>
        Regards,
        <br>
        ${this.user.first_name}
        <br>
        <br>
      `
    }
  }
}
</script>

<style>
  .div-table table {
    width: 100%;
    table-layout: fixed;
  }
</style>