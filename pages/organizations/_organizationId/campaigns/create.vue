<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Campaigns Details</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item">
                  <nuxt-link :to="`/organizations/${this.organization.value}/campaigns`">Campaigns</nuxt-link>
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
                  <h3 class="card-title">Add Campaigns Details</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Select Campaign Type</label>
                    <select class="form-control custom-select"
                      v-model="form.campaign_type"
                    >
                      <option value="">Select campaign type</option>
                      <option value="Health Campaign">Health Campaign</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" placeholder="Enter Campaign name"
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
                    <input type="file" id="file" name="file" ref="file" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" multiple>
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                      :disabled="loading"
                    >
                      {{ loading ? 'Saving...' : 'Create Campaign' }}
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

export default {
  name: 'CreateCampaign',
  data: () => ({
    form: {

    },
    loading: false
  }),
  methods: {
    async store() {
      try {
        this.loading = true
        let admin = await this.$axios.post(`/campaigns`, this.form)
        this.form.id = admin.data.data.id
        await this.handleFileUpload()
        this.$router.push(`/organizations/${this.organization.value}/campaigns`)
        this.loading = false
      }
      catch(e) {
        this.loading = false
      }
    },
    async handleFileUpload() {
      this.attachment = this.$refs.file.files[0]
      let formData = new FormData();
      formData.append('campaignid', this.form.id);
      formData.append('attachment', this.attachment);
      await this.$axios.post('upload_campaign_attachment', formData,
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