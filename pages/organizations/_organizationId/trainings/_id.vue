<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Trainings Details</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item">
                  <nuxt-link :to="`/organizations/${this.organization.value}/trainings`">Trainings</nuxt-link>
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
                  <h3 class="card-title">Edit Trainings Details</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" placeholder="Enter Training name"
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
                      {{ loading ? 'Saving...' : 'Update Training' }}
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
  name: 'EditTraining',
  async asyncData({$axios, params}) {
    let trainings = await $axios.get(`/trainings/${params.id}`)
    return {
      form: trainings.data.data,
    }
  },
  data: () => ({
    loading: false
  }),
  methods: {
    async store() {
      try {
        this.loading = true
        let admin = await this.$axios.patch(`/trainings/${this.$route.params.id}`, this.form)
        await this.handleFileUpload()
        this.$router.push(`/organizations/${this.organization.value}/trainings`)
        this.loading = false
      }
      catch(e) {
        this.loading = false
      }
    },
    async handleFileUpload() {
      this.attachment = this.$refs.file.files[0]
      let formData = new FormData();
      formData.append('trainingid', this.form.id);
      formData.append('attachment', this.attachment);
      await this.$axios.post('upload_training_attachment', formData,
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