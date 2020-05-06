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
                  :link="`/organizations/${organization.value}/screenings`"
                  title="Hi"
                >
                </back-button>
                Screening
              </h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item">
                  <nuxt-link :to="`/organizations/${this.organization.value}/incident-reports`">Screening</nuxt-link>
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
                  <h3 class="card-title">Add Screening</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Ship Name</label>
                    <input type="text" class="form-control" placeholder="Enter ship name"
                      v-model="form.ship_name"
                    >
                    <span class="help-block" 
                      v-if="errors.ship_name"
                    >{{ errors.ship_name[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Report Number</label>
                    <input type="text" class="form-control" placeholder="Enter report number"
                      v-model="form.report_number"
                    >
                    <span class="help-block" 
                      v-if="errors.report_number"
                    >{{ errors.report_number[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Date</label>
                    {{ form.date }}
                    <client-only>
                      <date-picker
                        placeholder="DD-MM-YYYY"
                        :format="customDateFormatter"
                        value="form.date"
                      />
                    </client-only>
                    <span class="help-block" 
                      v-if="errors.date"
                    >{{ errors.date[0] }}</span>
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
                    >Update Screening</button>
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
  name: 'CreateGoodPractice',
  async asyncData({$axios, params}) {
    let screening = await $axios.get(`/screenings/${params.id}`)
    return {
      form: screening.data.data
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
        let admin = await this.$axios.patch(`/screenings/${this.form.id}`, this.form)
        this.form.id = admin.data.data.id
        await this.handleFileUpload()
        this.$router.push(`/organizations/${this.organization.value}/screenings`)
        this.loading = false
      }
      catch(e) {
        this.loading = false
      }
    },
    async handleFileUpload() {
      this.attachment = this.$refs.file.files[0]
      let formData = new FormData();
      formData.append('screeningid', this.form.id);
      formData.append('attachment', this.attachment);
      await this.$axios.post('upload_screening_attachment', formData,
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
    customDateFormatter(date) {
      this.form.date = moment(date).format('DD-MM-YYYY');
      return moment(date).format('DD-MM-YYYY');
    },
  }
}
</script>