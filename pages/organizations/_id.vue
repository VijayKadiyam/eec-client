<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Organizations</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item active">Organizations</li>
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
                  <h3 class="card-title">Update Organization <small>ID: {{ form.id }}</small></h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Organization name</label>
                    <input type="text" class="form-control" placeholder="Enter name"
                      v-model="form.name" maxlength="12" 
                    >
                    <span class="help-block" 
                      v-if="errors.name"
                    >{{ errors.name[0] }}</span>
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
                    <label class="form-label">Phone</label>
                    <input type="number" class="form-control" placeholder="Enter phone"
                      v-model="form.phone"
                    >
                    <span class="help-block" 
                      v-if="errors.phone"
                    >{{ errors.phone[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Address</label>
                    <input type="text" class="form-control" placeholder="Enter address"
                      v-model="form.address"
                    >
                    <span class="help-block" 
                      v-if="errors.address"
                    >{{ errors.address[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Logo</label>
                    <br>
                    <input type="file" id="file" name="file" ref="file" accept="application/ms-excel" multiple>
                    <img style="width: 100px; height: 100px;" :src="`${mediaUrl}${form.logo_path}`">
                  </div>
                  <div class="form-group">
                    <input type="checkbox" v-model="form.is_active">&nbsp;&nbsp;Is Active
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                    >Update Organization</button>
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
export default {
  name: 'UpdateOrganization',
  async asyncData({$axios, params}) {
    let organization = await $axios.get(`/companies/${params.id}`)
    organization = organization.data.data
    organization.is_active = parseInt(organization.is_active)
    return {
      form: organization
    }
  },
  data: () => ({
    imageData: '',
    genders: [
      {'label': "Select Gender", 'code': ""},
      {'label': "Male", 'code': "Male"},
      {'label': "Female", 'code': "Female"},
    ],
    marital_statuses: [
      {'label': "Select Marital Status", 'code': ""},
      {'label': "Married", 'code': "Married"},
      {'label': "UnMarried", 'code': "UnMarried"},
    ],
  }),
  methods: {
    async store() {
      await this.$axios.patch(`/companies/${this.$route.params.id}`, this.form)
      await this.handleFileUpload()
      this.$router.push('/organizations');
    },
    async handleFileUpload() {
      this.imageData = this.$refs.file.files[0]
      let formData = new FormData();
      formData.append('company_id', this.form.id);
      formData.append('imageData', this.imageData);
      await this.$axios.post('upload_company_logo', formData,
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