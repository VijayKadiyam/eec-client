<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Inspector ({{ inspector.first_name }} {{ inspector.last_name }}) Academic Qualification</h1>
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
                  <h3 class="card-title">Add Inspector Academic Qualification</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Qualification</label>
                    <v-select 
                      v-model="form.exam_name" 
                      :reduce="qualification => qualification.code" 
                      :options="qualifications"
                    ></v-select>
                    <span class="help-block" 
                      v-if="errors.exam_name"
                    >{{ errors.exam_name[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Stream</label>
                    <v-select 
                      v-model="form.stream" 
                      :reduce="stream => stream.code" 
                      :options="streams"
                    ></v-select>
                    <span class="help-block" 
                      v-if="errors.stream"
                    >{{ errors.stream[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Details</label>
                    <textarea class="form-control" v-model="form.details"
                      placeholder="Add other details" 
                    >
                    </textarea>
                    <span class="help-block" 
                      v-if="errors.details"
                    >{{ errors.details[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Year of  passing</label>
                    <v-select 
                      v-model="form.yr_of_passing" 
                      :reduce="year => year.code" 
                      :options="years"
                    ></v-select>
                    <span class="help-block" 
                      v-if="errors.yr_of_passing"
                    >{{ errors.yr_of_passing[0] }}</span>
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                      :disabled="loading"
                    >
                      {{ loading ? 'Saving...' : 'Add Academic Qualification' }}
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
import 'vue-select/dist/vue-select.css';

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
      exam_name: '',
      stream: '',
      yr_of_passing: ''
    },
    qualifications: [
      {'label': "Select Qualification", 'code': ""},
      {'label': "Graduate", 'code': "Graduate"},
      {'label': "Under Graduate", 'code': "Under Graduate"},
      {'label': "Post Graduate", 'code': "Post Graduate"},
    ],
    streams: [
      {'label': "Select Stream", 'code': ""},
      {'label': "Science", 'code': "Science"},
      {'label': "Commerce", 'code': "Commerce"},
      {'label': "Marine", 'code': "Marine"},
      {'label': "Others", 'code': "Others"},
    ],
    years: [
      {'label': "Select Year", 'code': ""},
      {'label': "2020", 'code': "2020"},
      {'label': "2019", 'code': "2019"},
      {'label': "2018", 'code': "2018"},
      {'label': "2017", 'code': "2017"},
      {'label': "2016", 'code': "2016"},
      {'label': "2015", 'code': "2015"},
      {'label': "2014", 'code': "2014"},
      {'label': "2013", 'code': "2013"},
      {'label': "2012", 'code': "2012"},
      {'label': "2011", 'code': "2011"},
      {'label': "2010", 'code': "2010"},
      {'label': "2009", 'code': "2009"},
      {'label': "2008", 'code': "2008"},
      {'label': "2007", 'code': "2007"},
      {'label': "2006", 'code': "2006"},
      {'label': "2005", 'code': "2005"},
      {'label': "2004", 'code': "2004"},
      {'label': "2003", 'code': "2003"},
      {'label': "2002", 'code': "2002"},
      {'label': "2001", 'code': "2001"},
      {'label': "2000", 'code': "2000"},
    ],
    loading: false
  }),
  methods: {
    async store() {
      this.loading = true
      try {
        await this.$axios.post(`/users/${this.$route.params.employeeId}/academic_qualifications`, this.form)
        this.$router.push(`/organizations/${this.organization.value}/employees/${this.$route.params.employeeId}/full`)
        this.loading = false
      }
      catch(e) {
        this.loading = false
      }
    }
  }
}
</script>