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
                  :link="`/organizations/${organization.value}/audit-reports`"
                  title="Hi"
                >
                </back-button>
                AUDITS/BUSINESS PERFORMANCE VERIFICATION Reports Details
              </h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item">
                  <nuxt-link :to="`/organizations/${this.organization.value}/audit-reports`">Audit Reports</nuxt-link>
                </li>
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
                  <h3 class="card-title">Edit AUDITS/BUSINESS PERFORMANCE VERIFICATION Reports Details</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Select Report Type</label>
                    <select class="form-control custom-select"
                      v-model="form.report_type"
                    >
                      <option value="">Select report type</option>
                      <option value="Internal Report">Internal Report</option>
                      <option value="External Report">External Report</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" placeholder="Enter Audit Report name"
                      v-model="form.name"
                    >
                    <span class="help-block" 
                      v-if="errors.name"
                    >{{ errors.name[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Link</label>
                    <input type="text" class="form-control" placeholder="Enter link"
                      v-model="form.link"
                    >
                    <span class="help-block" 
                      v-if="errors.link"
                    >{{ errors.link[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Attachment</label>
                    <br>
                    <a :href="mediaUrl + form.imagepath" target="_blank">{{ form.imagepath }}</a>
                    <input type="text" class="form-control" placeholder="Enter attachment"
                      v-model="form.imagepath"
                    >
                    <br>
                    <input type="file" id="file" name="file" ref="file" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" multiple>
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                      :disabled="loading"
                    >
                      {{ loading ? 'Saving...' : 'Update AUDITS/BUSINESS PERFORMANCE VERIFICATION Report' }}
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
  name: 'EditGoodPractice',
  async asyncData({$axios, params}) {
    let audit_reports = await $axios.get(`/audit_reports/${params.id}`)
    return {
      form: audit_reports.data.data,
    }
  },
  data: () => ({
    loading: false
  }),
  components: {
    BackButton
  },
  
  methods: {
    async store() {
      try {
        this.loading = true
        let admin = await this.$axios.patch(`/audit_reports/${this.$route.params.id}`, this.form)
        await this.handleFileUpload()
        this.$router.push(`/organizations/${this.organization.value}/audit-reports`)
        this.loading = false
      }
      catch(e) {
        this.loading = false
      }
    },
    async handleFileUpload() {
      this.attachment = this.$refs.file.files[0]
      let formData = new FormData();
      formData.append('goodid', this.form.id);
      formData.append('attachment', this.attachment);
      await this.$axios.post('upload_good_practice_attachment', formData,
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