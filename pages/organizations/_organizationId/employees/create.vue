<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Inspector Details</h1>
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
            <div class="col-md-6">
              <!-- jquery validation -->
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Add Inspector Details</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Emp Code</label>
                    <input type="text" class="form-control" placeholder="Enter emp code"
                      v-model="form.emp_code"
                    >
                    <span class="help-block" 
                      v-if="errors.emp_code"
                    >{{ errors.emp_code[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">First Name</label>
                    <input type="text" class="form-control" placeholder="Enter first name"
                      v-model="form.first_name"
                    >
                    <span class="help-block" 
                      v-if="errors.first_name"
                    >{{ errors.first_name[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Middle Name</label>
                    <input type="text" class="form-control" placeholder="Enter middle name"
                      v-model="form.middle_name"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Last Name</label>
                    <input type="text" class="form-control" placeholder="Enter last name"
                      v-model="form.last_name"
                    >
                    <span class="help-block" 
                      v-if="errors.last_name"
                    >{{ errors.last_name[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" placeholder="Enter email"
                      v-model="form.email"
                    >
                    <span class="help-block" 
                      v-if="errors.email"
                    >{{ errors.email[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Email 2</label>
                    <input type="email" class="form-control" placeholder="Enter email 2"
                      v-model="form.email_2"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Phone</label>
                    <input type="number" class="form-control" placeholder="Enter phone"
                      v-model="form.phone"
                    >
                    <span class="help-block" 
                      v-if="errors.phone"
                    >{{ errors.phone[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Phone 2</label>
                    <input type="number" class="form-control" placeholder="Enter phone 2"
                      v-model="form.phone_2"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Landline</label>
                    <input type="number" class="form-control" placeholder="Enter landline"
                      v-model="form.landline"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Gender</label>
                    <select class="form-control custom-select"
                      v-model="form.gender"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Age</label>
                    <input type="number" class="form-control" placeholder="Enter age"
                      v-model="form.age"
                    >
                    <span class="help-block" 
                      v-if="errors.age"
                    >{{ errors.age[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Date of birth</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>
                      </div>
                      <input type="text" class="form-control" placeholder="dd/mm/yyyy" v-model="form.dob">
                    </div>
                    <span class="help-block" 
                      v-if="errors.dob"
                    >{{ errors.dob[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Marital Status</label>
                    <select class="form-control custom-select"
                      v-model="form.marital_status"
                    >
                      <option value="">Select marital status</option>
                      <option value="Married">Married</option>
                      <option value="Unmarried">Unmarried</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Skype ID</label>
                    <input type="text" class="form-control" placeholder="Enter skype id"
                      v-model="form.skype_id"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Remarks</label>
                    <input type="text" class="form-control" placeholder="Enter remarks"
                      v-model="form.remarks"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Photo</label>
                    <br>
                    <input type="file" id="file" name="file" ref="file" accept="application/ms-excel" multiple>
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                      :disabled="loading"
                    >
                      {{ loading ? 'Saving...': 'Create Inspector' }}
                    </button>
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
  name: 'CreateInspector',
  data: () => ({
    form: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      gender: '',
      marital_status: '',
      active: 1,
      role_id: ''
    },
    userid: '',
    loading: false
  }),
  mounted() {
    this.form.role_id = 3;
  },
  components: {
    BackButton
  },
  methods: {
    async store() {
      this.loading = true
      try {
        let admin = await this.$axios.post(`/users`, this.form)
        this.userid = admin.data.data.id
        // Assign Role
        let role_payload = {
          user_id: admin.data.data.id,
          role_id: this.form.role_id
        }
        await this.$axios.post('/role_user', role_payload)
        // Assign Organization
        let organization_payload = {
          user_id: admin.data.data.id,
          company_id: this.$route.params.organizationId
        }
        await this.$axios.post('/company_user', organization_payload)
        await this.handleFileUpload()
        this.$router.push(`/organizations/${this.organization.value}/employees`)
        this.loading = false
      }
      catch(e) {
        this.loading = false
      }
    },
    async handleFileUpload() {
      this.attachment = this.$refs.file.files[0]
      let formData = new FormData();
      formData.append('userid', this.userid);
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
  }
}
</script>