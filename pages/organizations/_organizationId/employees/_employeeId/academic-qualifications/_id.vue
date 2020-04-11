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
                Inspector ({{ inspector.first_name }} {{ inspector.last_name }}) Academic Qualification</h1>
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
                  <h3 class="card-title">Edit Inspector Academic Qualification</h3>
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
                      {{ loading ? 'Saving...' : 'Update Inspector Academic Qualification' }}
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
  name: 'EditInspectorAcademicQualification',
  async asyncData({$axios, params}) {
    let inspector = await $axios.get(`/users/${params.employeeId}`)
    let academic_qualifications = await $axios.get(`/users/${params.employeeId}/academic_qualifications/${params.id}`)
    return {
      inspector: inspector.data.data,
      form: academic_qualifications.data.data
    }
  },
  data: () => ({
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
      {'label': "1999", 'code': "1999"},
      {'label': "1998", 'code': "1998"},
      {'label': "1997", 'code': "1997"},
      {'label': "1996", 'code': "1996"},
      {'label': "1995", 'code': "1995"},
      {'label': "1994", 'code': "1994"},
      {'label': "1993", 'code': "1993"},
      {'label': "1992", 'code': "1992"},
      {'label': "1991", 'code': "1991"},
      {'label': "1990", 'code': "1990"},
      {'label': "1989", 'code': "1989"},
      {'label': "1988", 'code': "1988"},
      {'label': "1987", 'code': "1987"},
      {'label': "1986", 'code': "1986"},
      {'label': "1985", 'code': "1985"},
      {'label': "1984", 'code': "1984"},
      {'label': "1983", 'code': "1983"},
      {'label': "1982", 'code': "1982"},
      {'label': "1981", 'code': "1981"},
      {'label': "1980", 'code': "1980"},
      {'label': "1979", 'code': "1979"},
      {'label': "1978", 'code': "1978"},
      {'label': "1977", 'code': "1977"},
      {'label': "1976", 'code': "1976"},
      {'label': "1975", 'code': "1975"},
      {'label': "1974", 'code': "1974"},
      {'label': "1973", 'code': "1973"},
      {'label': "1972", 'code': "1972"},
      {'label': "1971", 'code': "1971"},
      {'label': "1970", 'code': "1970"},
    ],
  }),
  components: {
    BackButton
  },
  methods: {
    async store() {
      this.loading = true
      try {
        await this.$axios.patch(`/users/${this.$route.params.employeeId}/academic_qualifications/${this.$route.params.id}`, this.form)
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