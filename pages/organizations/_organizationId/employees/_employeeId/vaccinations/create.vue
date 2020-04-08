<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Inspector ({{ inspector.first_name }} {{ inspector.last_name }}) Vaccinations</h1>
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
                  <h3 class="card-title">Add Inspector Vaccination Details</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Vaccination Type</label>
                    <select class="form-control custom-select"
                      v-model="form.vaccination_type"
                    >
                      <option value="">Select vaccination type</option>
                      <option value="Yellow Fever">Yellow Fever</option>
                      <option value="Cholera">Cholera</option>
                      <option value="Others">Others</option>
                    </select>
                    <span class="help-block" 
                      v-if="errors.vaccination_type"
                    >{{ errors.vaccination_type[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Certificate no</label>
                    <input type="text" class="form-control" placeholder="Enter certificate no"
                      v-model="form.certificate_no"
                    >
                    <span class="help-block" 
                      v-if="errors.certificate_no"
                    >{{ errors.certificate_no[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Date of expiry</label>
                    <input type="text" class="form-control" v-mask="'##/##/####'" placeholder="dd/mm/yyyy"
                      v-model="form.date_of_expiry"
                    >
                    <span class="help-block" 
                      v-if="errors.date_of_expiry"
                    >{{ errors.date_of_expiry[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Other Details</label>
                    <input type="text" class="form-control" placeholder="Enter other details"
                      v-model="form.other_details"
                    >
                    <span class="help-block" 
                      v-if="errors.other_details"
                    >{{ errors.other_details[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Attachment</label>
                    <br>
                    <input type="file" id="file" name="file" ref="file" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" multiple>
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                    >Create Inspector Vaccination Details</button>
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

export default {
  name: 'CreateInspectorVaccinationDetails',
  async asyncData({$axios, params}) {
    let inspector = await $axios.get(`/users/${params.employeeId}`)
    return {
      inspector: inspector.data.data
    }
  },
  data: () => ({
    form: {
      'vaccination_type': ''
    },
  }),
  components: {
    BackButton
  },
  methods: {
    async store() {
      try {
        let admin = await this.$axios.post(`/users/${this.$route.params.employeeId}/vaccinations`, this.form)
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
      formData.append('vaccinationid', this.form.id);
      formData.append('attachment', this.attachment);
      await this.$axios.post('upload_vaccination_attachment', formData,
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