<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Inspector ({{ inspector.first_name }} {{ inspector.last_name }}) Professional Courses</h1>
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
                  <h3 class="card-title">Add Inspector Professional Course</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Name of course</label>
                    <input type="text" class="form-control" placeholder="Enter name of course"
                      v-model="form.name_of_course"
                    >
                    <span class="help-block" 
                      v-if="errors.name_of_course"
                    >{{ errors.name_of_course[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Date of issue</label>
                    <input type="text" class="form-control" placeholder="Enter date of issue"
                      v-model="form.date_of_issue"
                    >
                    <span class="help-block" 
                      v-if="errors.date_of_issue"
                    >{{ errors.date_of_issue[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Date of expiry</label>
                    <input type="text" class="form-control" placeholder="Enter date of expiry"
                      v-model="form.date_of_expiry"
                    >
                    <span class="help-block" 
                      v-if="errors.date_of_expiry"
                    >{{ errors.date_of_expiry[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Plase of issue</label>
                    <input type="text" class="form-control" placeholder="Enter place of expiry"
                      v-model="form.place_of_issue"
                    >
                    <span class="help-block" 
                      v-if="errors.place_of_issue"
                    >{{ errors.place_of_issue[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Attachment</label>
                    <br>
                    <input type="file" id="file" name="file" ref="file" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" multiple>
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                      :disabled="loading"
                    >
                      {{ loading ? 'Saving...' : 'Add Professional Qualification' }}
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
  name: 'CreateInspectorAcademicQualification',
  async asyncData({$axios, params}) {
    let inspector = await $axios.get(`/users/${params.employeeId}`)
    return {
      inspector: inspector.data.data
    }
  },
  data: () => ({
    form: {
    },
    loading: false
  }),
  methods: {
    async store() {
      this.loading = true
      try {
        let admin = await this.$axios.post(`/users/${this.$route.params.employeeId}/professional_courses`, this.form)
        this.form.id = admin.data.data.id
        this.form.user_id = admin.data.data.user_id
        await this.handleFileUpload()
        this.$router.push(`/organizations/${this.organization.value}/employees/${this.$route.params.employeeId}/full`)
        this.loading = false
      }
      catch(e) {
        this.loading = false
      }
    },
    async handleFileUpload() {
      this.attachment = this.$refs.file.files[0]
      let formData = new FormData();
      formData.append('userid', this.form.user_id);
      formData.append('professionalqualificationid', this.form.id);
      formData.append('attachment', this.attachment);
      await this.$axios.post('upload_professional_qualification_attachment', formData,
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