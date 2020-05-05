<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">
                <back-button
                  :link="`/organizations/${organization.value}/employees/${inspector.id}/full`"
                  title="Hi"
                >
                </back-button>
                Inspector ({{ inspector.first_name }} {{ inspector.last_name }}) Medicals</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item">
                  <nuxt-link :to="`/organizations/${this.organization.value}/employees`">Inspectors</nuxt-link>
                </li>
                <li class="breadcrumb-item active">{{ inspector.first_name }} {{ inspector.last_name }}</li>
                <li class="breadcrumb-item active">Create</li>
              </ol>
            </div><!-- /.col -->
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">
          <div class="row justify-content-center">
            <!-- left column -->
            <div class="col-md-6">
              <!-- jquery validation -->
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Add Inspector Medical Details</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Report Number</label>
                    <input type="text" class="form-control" placeholder="Enter report number"
                      v-model="form.report_number"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Issue Date</label>
                    {{ form.issue_date }}
                    <date-picker
                      placeholder="DD-MM-YYYY"
                      :format="customDoiFormatter"
                      value="form.issue_date"
                    />
                    <!-- <input type="text" class="form-control" placeholder="Enter issue date"
                      v-model="form.issue_date"
                    > -->
                    <span class="help-block" 
                      v-if="errors.issue_date"
                    >{{ errors.issue_date[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Place of Issue</label>
                    <input type="text" class="form-control" placeholder="Enter place of issue"
                      v-model="form.place_of_issue"
                    >
                    <span class="help-block" 
                      v-if="errors.place_of_issue"
                    >{{ errors.place_of_issue[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Date of expiry</label>
                    {{ form.date_of_expiry }}
                    <client-only>
                      <date-picker
                        placeholder="DD-MM-YYYY"
                        :format="customDoeFormatter"
                        value="form.date_of_expiry"
                      />
                    </client-only>
                    <!-- <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>
                      </div>
                      <input type="text" class="form-control" v-mask="'##/##/####'" placeholder="dd/mm/yyyy" v-model="form.date_of_expiry">
                    </div> -->
                  </div>
                  <div class="form-group">
                    <label class="form-label">Doctor Name</label>
                    <input type="text" class="form-control" placeholder="Enter doctor name"
                      v-model="form.doctor_name"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Medically Fit</label>
                    <select class="form-control custom-select"
                      v-model="form.fit"
                    >
                      <option value="">Select YES/NO</option>
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Remarks</label>
                    <input type="text" class="form-control" placeholder="Enter remarks"
                      v-model="form.remarks"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Attachment</label>
                    <br>
                    <input type="file" id="file" name="file" ref="file" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" multiple>
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                    >Create Inspector Medical Details</button>
                  </div>
                </div>
              </div>
              <!-- /.card -->
            </div>
            <!--/.col (left) -->
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
import BackButton from '@/components/back-button.vue'
import moment from 'moment'

export default {
  name: 'CreateInspectorMedicalDetails',
  async asyncData({$axios, params}) {
    let inspector = await $axios.get(`/users/${params.employeeId}`)
    return {
      inspector: inspector.data.data
    }
  },
  data: () => ({
    form: {
      'fit': '',
      date_of_expiry: '',
      issue_date: '',
    },
  }),
  components: {
    BackButton
  },
  methods: {
    async store() {
      try {
        let admin = await this.$axios.post(`/users/${this.$route.params.employeeId}/medicals`, this.form)
        this.form.id = admin.data.data.id
        this.form.user_id = admin.data.data.user_id
        await this.handleFileUpload()
        this.$router.push(`/organizations/${this.organization.value}/employees/${this.$route.params.employeeId}/full`)
      }
      catch(e) {

      }
    },
    async handleFileUpload() {
      this.attachment = this.$refs.file.files[0]
      let formData = new FormData();
      formData.append('userid', this.form.user_id);
      formData.append('medicalid', this.form.id);
      formData.append('attachment', this.attachment);
      await this.$axios.post('upload_medical_attachment', formData,
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
    customDoiFormatter(date) {
      this.form.issue_date = moment(date).format('DD-MM-YYYY');
      return moment(date).format('DD-MM-YYYY');
    },
    customDoeFormatter(date) {
      this.form.date_of_expiry = moment(date).format('DD-MM-YYYY');
      return moment(date).format('DD-MM-YYYY');
    },
  }
}
</script>