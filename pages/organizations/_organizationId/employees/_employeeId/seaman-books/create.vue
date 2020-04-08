<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Inspector ({{ inspector.first_name }} {{ inspector.last_name }}) Seaman Books</h1>
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
                  <h3 class="card-title">Add Inspector Seaman Book Details</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Book Number</label>
                    <input type="text" class="form-control" placeholder="Enter first name"
                      v-model="form.book_number"
                    >
                    <span class="help-block" 
                      v-if="errors.book_number"
                    >{{ errors.book_number[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Place of Issue</label>
                    <input type="text" class="form-control" placeholder="Enter place of issue"
                      v-model="form.place_of_issue"
                    >
                    <span class="help-block" 
                      v-if="errors.place_of_issue"
                    >{{ errors.place_of_issue[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Date of issue</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>
                      </div>
                      <input type="text" class="form-control" v-mask="'##/##/####'" placeholder="dd/mm/yyyy" v-model="form.date_of_issue">
                    </div>
                    <span class="help-block" 
                      v-if="errors.date_of_issue"
                    >{{ errors.date_of_issue[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Date of expiry</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>
                      </div>
                      <input type="text" class="form-control" v-mask="'##/##/####'" placeholder="dd/mm/yyyy" v-model="form.date_of_expiry">
                    </div>
                    <span class="help-block" 
                      v-if="errors.date_of_expiry"
                    >{{ errors.date_of_expiry[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Country</label>
                    <input type="text" class="form-control" placeholder="Enter country"
                      v-model="form.country"
                    >
                    <span class="help-block" 
                      v-if="errors.country"
                    >{{ errors.country[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Attachment</label>
                    <br>
                    <input type="file" id="file" name="file" ref="file" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" multiple>
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                    >Create Inspector Seaman Book</button>
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
  name: 'CreateInspectorSeamanBook',
  async asyncData({$axios, params}) {
    let inspector = await $axios.get(`/users/${params.employeeId}`)
    return {
      inspector: inspector.data.data
    }
  },
  data: () => ({
    form: {
    },
  }),
  components: {
    BackButton
  },
  methods: {
    async store() {
      try {
        let admin = await this.$axios.post(`/users/${this.$route.params.employeeId}/seaman_books`, this.form)
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
      formData.append('bookid', this.form.id);
      formData.append('attachment', this.attachment);
      await this.$axios.post('upload_seaman_book_attachment', formData,
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