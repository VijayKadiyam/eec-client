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
                Inspector ({{ inspector.first_name }} {{ inspector.last_name }}) Visa</h1>
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
                <li class="breadcrumb-item active">Update</li>
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
                  <h3 class="card-title">Editt Inspector Visa Details</h3>
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
                    {{ this.form.date_of_issue }}
                    <client-only>
                      <date-picker
                        placeholder="DD-MM-YYYY"
                        :format="customIssueFormatter"
                        value="form.date_of_issue"
                      />
                    </client-only>
                    <span class="help-block" 
                      v-if="errors.date_of_issue"
                    >{{ errors.date_of_issue[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Date of expiry</label>
                    {{ this.form.date_of_expiry }}
                    <client-only>
                      <date-picker
                        placeholder="DD-MM-YYYY"
                        :format="customExpiryFormatter"
                        value="form.date_of_expiry"
                      />
                    </client-only>
                    <span class="help-block" 
                      v-if="errors.date_of_expiry"
                    >{{ errors.date_of_expiry[0] }}</span>
                  </div>

                  <!-- <div class="form-group">
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
                  </div> -->
                  <div class="form-group">
                    <label class="form-label">Attachment</label>
                    <br>
                    <a :href="mediaUrl + form.attachment" target="_blank">{{ form.attachment }}</a>
                    <input type="text" class="form-control" placeholder="Enter attachment"
                      v-model="form.attachment"
                    >
                    <br>
                    <input type="file" id="file" name="file" ref="file" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" multiple>
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                    >Update Inspector Visa Details</button>
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
import moment from 'moment'

export default {
  name: 'EditInspectorPassportDetails',
  async asyncData({$axios, params}) {
    let inspector = await $axios.get(`/users/${params.employeeId}`)
    let visa = await $axios.get(`/users/${params.employeeId}/visas/${params.id}`)
    return {
      inspector: inspector.data.data,
      form: visa.data.data
    }
  },
  data: () => ({
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
  components: {
    BackButton
  },
  methods: {
    async store() {
      try {
        await this.$axios.patch(`/users/${this.$route.params.employeeId}/visas/${this.$route.params.id}`, this.form)
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

    customIssueFormatter(date) {
      this.form.date_of_issue = moment(date).format('DD-MM-YYYY');
      return moment(date).format('DD-MM-YYYY');
    },

    customExpiryFormatter(date) {
      this.form.date_of_expiry = moment(date).format('DD-MM-YYYY');
      return moment(date).format('DD-MM-YYYY');
    },
  }
}
</script>