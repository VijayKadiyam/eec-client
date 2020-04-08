<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Inspector ({{ inspector.first_name }} {{ inspector.last_name }}) Visas</h1>
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
                  <h3 class="card-title">Add Inspector Visa Details</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Country</label>
                    <v-select 
                      v-model="form.country" 
                      :reduce="country => country.code" 
                      :options="countries"
                    ></v-select>
                    <span class="help-block" 
                      v-if="errors.country"
                    >{{ errors.country[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Entry Type</label>
                    <select class="form-control custom-select"
                      v-model="form.entry_type"
                    >
                      <option value="">Select entry SINGLE</option>
                      <option value="SINGLE">SINGLE</option>
                      <option value="MULTIPLE">MULTIPLE</option>
                    </select>
                    <span class="help-block" 
                      v-if="errors.entry_type"
                    >{{ errors.entry_type[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Type of Visa</label>
                    <select class="form-control custom-select"
                      v-model="form.type_of_visa"
                    >
                      <option value="">Select type of visa</option>
                      <option value="Visit / Tourist">Visit / Tourist</option>
                      <option value="Business">Business</option>
                    </select>
                    <span class="help-block" 
                      v-if="errors.type_of_visa"
                    >{{ errors.type_of_visa[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Date of issue</label>
                    <input type="text" class="form-control" v-mask="'##/##/####'" placeholder="dd/mm/yyyy"
                      v-model="form.date_of_issue"
                    >
                    <span class="help-block" 
                      v-if="errors.date_of_issue"
                    >{{ errors.date_of_issue[0] }}</span>
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
                    <label class="form-label">Attachment</label>
                    <br>
                    <input type="file" id="file" name="file" ref="file" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" multiple>
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                    >Create Inspector Visa Details</button>
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
import 'vue-select/dist/vue-select.css';

export default {
  name: 'CreateInspectorPassportDetails',
  async asyncData({$axios, params}) {
    let inspector = await $axios.get(`/users/${params.employeeId}`)
    return {
      inspector: inspector.data.data
    }
  },
  data: () => ({
    form: {
      country: '',
      entry_type: '',
      type_of_visa: ''
    },
    countries: [
      {'label': "Select Country", 'code': ""},
      {'label': "Australia", 'code': "Australia"},
      {'label': "China", 'code': "China"},
      {'label': "Egypt", 'code': "Egypt"},
      {'label': "Hong Kong", 'code': "Hong Kong"},
      {'label': "Iran", 'code': "Iran"},
      {'label': "Indonesia", 'code': "Indonesia"},
      {'label': "Japan", 'code': "Japan"},
      {'label': "Malaysia", 'code': "Malaysia"},
      {'label': "New Zealand", 'code': "New Zealand"},
      {'label': "Korea", 'code': "Korea"},
      {'label': "Phillipines", 'code': "Phillipines"},
      {'label': "Singapore", 'code': "Singapore"},
      {'label': "Schengen", 'code': "Schengen"},
      {'label': "Saudi", 'code': "Saudi"},
      {'label': "Turkey", 'code': "Turkey"},
      {'label': "Taiwan", 'code': "Taiwan"},
      {'label': "US", 'code': "US"},
      {'label': "UAE", 'code': "UAE"},
      {'label': "UK", 'code': "UK"},
      {'label': "Vietnam", 'code': "Vietnam"},
    ],
  }),
  mounted() {
    this.form.role_id = 3;
  },
  components: {
    BackButton
  },
  methods: {
    async store() {
      try {
        let admin = await this.$axios.post(`/users/${this.$route.params.employeeId}/visas`, this.form)
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
      formData.append('visaid', this.form.id);
      formData.append('attachment', this.attachment);
      await this.$axios.post('upload_visa_attachment', formData,
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