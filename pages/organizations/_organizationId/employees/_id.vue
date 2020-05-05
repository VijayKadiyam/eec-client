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
                  :link="`/organizations/${organization.value}/employees`"
                  title="Hi"
                >
                </back-button>
                Inspector Details</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item">
                  <nuxt-link :to="`/organizations/${this.organization.value}/employees`">Inspectors</nuxt-link>
                </li>
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
            <div class="col-md-12">
              <!-- jquery validation -->
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Edit Inspector Details</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Emp Code</label>
                        <input type="text" class="form-control" placeholder="Enter emp code"
                          v-model="form.emp_code"
                        >
                        <span class="help-block" 
                          v-if="errors.emp_code"
                        >{{ errors.emp_code[0] }}</span>
                      </div>      
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Prefix</label>
                        <select class="form-control" v-model="form.prefix">
                          <option value="">Select Prefix</option>
                          <option value="Capt">Capt</option>
                          <option value="Mr">Mr</option>
                          <option value="Ms">Ms</option>
                        </select>
                        <span class="help-block" 
                          v-if="errors.prefix"
                        >{{ errors.prefix[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">First Name</label>
                        <input type="text" class="form-control" placeholder="Enter first name"
                          v-model="form.first_name"
                        >
                        <span class="help-block" 
                          v-if="errors.first_name"
                        >{{ errors.first_name[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Middle Name</label>
                        <input type="text" class="form-control" placeholder="Enter middle name"
                          v-model="form.middle_name"
                        >
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Last Name</label>
                        <input type="text" class="form-control" placeholder="Enter last name"
                          v-model="form.last_name"
                        >
                        <span class="help-block" 
                          v-if="errors.last_name"
                        >{{ errors.last_name[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" placeholder="Enter email"
                          v-model="form.email"
                        >
                        <span class="help-block" 
                          v-if="errors.email"
                        >{{ errors.email[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Email 2</label>
                        <input type="email" class="form-control" placeholder="Enter email 2"
                          v-model="form.email_2"
                        >
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Phone</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <country-codes
                              :option.sync="form.phone_code"
                            ></country-codes>
                          </div>
                          <input type="number" class="form-control" placeholder="Enter phone" v-mask="'###############'" v-model="form.phone">
                        </div>
                        <span class="help-block" 
                          v-if="errors.phone"
                        >{{ errors.phone[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Phone 2</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <country-codes
                              :option.sync="form.phone_2_code"
                            ></country-codes>
                          </div>
                          <input type="number" class="form-control" placeholder="Enter phone 2" v-mask="'###############'"
                            v-model="form.phone_2"
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Landline</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <country-codes
                              :option.sync="form.landline_code"
                            ></country-codes>
                          </div>
                          <input type="number" class="form-control" placeholder="Enter landline"
                            v-model="form.landline"
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Gender</label>
                        <v-select 
                          v-model="form.gender" 
                          :reduce="gender => gender.code" 
                          :options="genders"
                        ></v-select>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Date of birth</label>
                        {{ form.dob }}
                        <client-only>
                          <date-picker
                            placeholder="DD-MM-YYYY"
                            :format="customDobFormatter"
                            value="form.dob"
                          />
                        </client-only>
                        <span class="help-block" 
                          v-if="errors.dob"
                        >{{ errors.dob[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Age (In Years)</label>
                        <input type="number" class="form-control" placeholder="Enter age"
                          v-model="form.age"
                        >
                        <span class="help-block" 
                          v-if="errors.age"
                        >{{ errors.age[0] }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Marital Status</label>
                        <v-select 
                          v-model="form.marital_status" 
                          :reduce="marital_status => marital_status.code" 
                          :options="marital_statuses"
                        ></v-select>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Skype ID</label>
                        <input type="text" class="form-control" placeholder="Enter skype id"
                          v-model="form.skype_id"
                        >
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Remarks</label>
                        <input type="text" class="form-control" placeholder="Enter remarks"
                          v-model="form.remarks"
                        >
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">Photo</label>
                        <br>
                        <a :href="mediaUrl + form.attachment" target="_blank">{{ form.attachment }}</a>
                        <input type="text" class="form-control" placeholder="Enter attachment"
                          v-model="form.attachment"
                        >
                        <br>
                        <input type="file" id="file" name="file" ref="file" accept="application/ms-excel" multiple>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">CV/Resume</label>
                        <br>
                        <a :href="mediaUrl + form.cv_path" target="_blank">{{ form.cv_path }}</a>
                        <input type="text" class="form-control" placeholder="Enter cv path"
                          v-model="form.cv_path"
                        >
                        <br>
                        <input type="file" id="file1" name="file1" ref="file1" accept="application/ms-excel" multiple>
                      </div>
                    </div>
                  </div>
                  <!-- End row -->
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                      :disabled="loading"
                    >
                      {{ loading ? 'Saving...': 'Update Inspector' }}
                    </button>
                  </div>
                </div>
                <!-- end form start -->
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
import CountryCodes from '@/components/country-codes.vue'
import 'vue-select/dist/vue-select.css';
import moment from 'moment'

export default {
  name: 'UpdateInspector',
  async asyncData({$axios, params}) {
    let inspector = await $axios.get(`/users/${params.id}`)
    return {
      form: inspector.data.data
    }
  },
  data: () => ({
    loading: false,
    genders: [
      {'label': "Select Gender", 'code': ""},
      {'label': "Male", 'code': "Male"},
      {'label': "Female", 'code': "Female"},
    ],
    marital_statuses: [
      {'label': "Select Marital Status", 'code': ""},
      {'label': "Married", 'code': "Married"},
      {'label': "UnMarried", 'code': "UnMarried"},
      {'label': "Divorced", 'code': "Divorced"},
    ],
  }),
  mounted() {
    //Datemask dd/mm/yyyy
    $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
    //Money Euro
    $('[data-mask]').inputmask()

    this.form.role_id = 3;
  },
  components: {
    BackButton,
    CountryCodes
  },
  methods: {
    async store() {
      this.loading = true
      try {
        await this.$axios.patch(`/users/${this.$route.params.id}`, this.form)
        await this.handleFileUpload()
        await this.handleCVUpload()
        this.$router.push(`/organizations/${this.organization.value}/employees/${this.$route.params.id}/full`)
        this.loading = false
      }
      catch(e) {
        this.loading = false
      }
    },
    async handleFileUpload() {
      this.attachment = this.$refs.file.files[0]
      let formData = new FormData();
      formData.append('userid', this.form.id);
      formData.append('attachment', this.attachment);
      await this.$axios.post('upload_user_photo', formData,
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
    async handleCVUpload() {
      this.attachment = this.$refs.file1.files[0]
      let formData = new FormData();
      formData.append('userid', this.form.id);
      formData.append('attachment', this.attachment);
      await this.$axios.post('upload_user_cv', formData,
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
    customDobFormatter(date) {
      let age = moment().diff(date, 'years',false);
      if(age > 25) {
        this.form.age = age
        this.form.dob = moment(date).format('DD-MM-YYYY');
        return moment(date).format('DD-MM-YYYY');
      }
      else
        alert('Age can\'t be less than 25 Years')
    },
  }
}
</script>