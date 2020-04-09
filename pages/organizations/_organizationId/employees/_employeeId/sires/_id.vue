<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Inspector ({{ inspector.first_name }} {{ inspector.last_name }}) OCIMF SIRE accreditation</h1>
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
                  <h3 class="card-title">Edit Inspector OCIMF SIRE accreditation</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">ID Number</label>
                    <input type="text" class="form-control" placeholder="Enter id number"
                      v-model="form.id_number"
                    >
                    <span class="help-block" 
                      v-if="errors.id_number"
                    >{{ errors.id_number[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Expiry Date</label>
                    <input type="text" class="form-control" v-mask="'##/##/####'" placeholder="dd/mm/yyyy"
                      v-model="form.expiry_date"
                    >
                    <span class="help-block" 
                      v-if="errors.expiry_date"
                    >{{ errors.expiry_date[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Last Audit Date</label>
                    <input type="text" class="form-control" v-mask="'##/##/####'" placeholder="dd/mm/yyyy"
                      v-model="form.last_audit_date"
                    >
                    <span class="help-block" 
                      v-if="errors.last_audit_date"
                    >{{ errors.last_audit_date[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Type</label>
                    <select class="form-control custom-select"
                      v-model="form.type"
                    >
                      <option value="">Select type</option>
                      <option value="Oil">Oil</option>
                      <option value="Oil/Chemical">Oil/Chemical</option>
                      <option value="Oil/Gas">Oil/Gas</option>
                      <option value="Oil/Chemical/Gas">Oil/Chemical/Gas</option>
                    </select>
                    <span class="help-block" 
                      v-if="errors.type"
                    >{{ errors.type[0] }}</span>
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
                    >Update Inspector OCIMF SIRE accreditation</button>
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
  name: 'EditInspectorSire',
  async asyncData({$axios, params}) {
    let inspector = await $axios.get(`/users/${params.employeeId}`)
    let sire = await $axios.get(`/users/${params.employeeId}/sires/${params.id}`)
    return {
      inspector: inspector.data.data,
      form: sire.data.data
    }
  },
  data: () => ({
    form: {
      type: ''
    },
  }),
  methods: {
    async store() {
      try {
        await this.$axios.patch(`/users/${this.$route.params.employeeId}/sires/${this.$route.params.id}`, this.form)
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
      formData.append('sireid', this.form.id);
      formData.append('attachment', this.attachment);
      await this.$axios.post('upload_sire_attachment', formData,
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