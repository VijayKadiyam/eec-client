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
                  :link="`/organizations/${organization.value}/employees/${inspector.id}/full`"
                  title="Hi"
                >
                </back-button>
                Inspector ({{ inspector.first_name }} {{ inspector.last_name }}) Additional Qualifications</h1>
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
                  <h3 class="card-title">Edit Inspector Additional Qualification Details</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Name</label>
                    <v-select 
                      v-model="form.name" 
                      :reduce="name => name.code" 
                      :options="names"
                    ></v-select>
                    <span class="help-block" 
                      v-if="errors.name"
                    >{{ errors.name[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea type="text" class="form-control" placeholder="Enter description" v-model="form.description"></textarea>
                    <span class="help-block" 
                      v-if="errors.description"
                    >{{ errors.description[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Attachment</label>
                    <br>
                    <a :href="mediaUrl + form.attachment" target="_blank">{{ form.attachment }}</a>
                    <input type="text" class="form-control" placeholder="Enter attachment"
                      v-model="form.image_path"
                    >
                    <br>
                    <input type="file" id="file" name="file" ref="file" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" multiple>
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                    >Update Inspector Additional Qualification Details</button>
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
import 'vue-select/dist/vue-select.css';

export default {
  name: 'EditInspectorProfessionalCourse',
  async asyncData({$axios, params}) {
    let inspector = await $axios.get(`/users/${params.employeeId}`)
    let additional_qualification = await $axios.get(`/users/${params.employeeId}/additional_qualifications/${params.id}`)
    return {
      inspector: inspector.data.data,
      form: additional_qualification.data.data
    }
  },
  data: () => ({
    form: {
      active: 1,
      role_id: ''
    },
    names: [
      {'label': "Select Qualification", 'code': ""},
      {'label': "Marine Sup.", 'code': "Marine Sup."},
      {'label': "Technical Sup.", 'code': "Technical Sup."},
      {'label': "Accident/Incident Investigator", 'code': "Accident/Incident Investigator"},
      {'label': "STS Suprintendency", 'code': "STS Suprintendency"},
      {'label': "Auditor", 'code': "Auditor"},
      {'label': "CDI (Marine)", 'code': "CDI (Marine)"},
      {'label': "CDI (Terminal)", 'code': "CDI (Terminal)"},
      {'label': "Pilotage", 'code': "Pilotage"},
      {'label': "Others", 'code': "Others"},
    ],
  }),
  mounted() {
    this.form.role_id = 3;
  },
  components: {
    BackButton
  },
  methods: {
    async store() {
      try {
        await this.$axios.patch(`/users/${this.$route.params.employeeId}/additional_qualifications/${this.$route.params.id}`, this.form)
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
      formData.append('additionalqualificationid', this.form.id);
      formData.append('attachment', this.attachment);
      await this.$axios.post('upload_additional_qualification_attachment', formData,
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