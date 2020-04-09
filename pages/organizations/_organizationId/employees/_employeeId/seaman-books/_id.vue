<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Inspector ({{ inspector.first_name }} {{ inspector.last_name }}) Seaman Booklet</h1>
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
                  <h3 class="card-title">Edit Inspector Seaman Book Details</h3>
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
                  <div class="form-group">
                    <label class="form-label">Country</label>
                    <input type="text" class="form-control" placeholder="Enter country"
                      v-model="form.country"
                    >
                  </div>
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
                    >Update Inspector Seaman Book</button>
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
import moment from 'moment'

export default {
  name: 'UpdateInspectorSeamanBook',
  async asyncData({$axios, params}) {
    let inspector = await $axios.get(`/users/${params.employeeId}`)
    let seaman_book = await $axios.get(`/users/${params.employeeId}/seaman_books/${params.id}`)
    return {
      inspector: inspector.data.data,
      form: seaman_book.data.data
    }
  },
  components: {
    BackButton
  },
  methods: {
    async store() {
      try {
        await this.$axios.patch(`/users/${this.$route.params.employeeId}/seaman_books/${this.$route.params.id}`, this.form)
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