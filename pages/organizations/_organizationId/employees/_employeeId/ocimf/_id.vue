<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Inspector ({{ inspector.first_name }} {{ inspector.last_name }}) OCIMF Refresher Courses</h1>
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
                  <h3 class="card-title">Edit Inspector OCIMF Refresher Course Details</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Name of Course</label>
                    <select class="form-control custom-select"
                      v-model="form.name_of_course"
                    >
                      <option value="">Select course name</option>
                      <option value="ECDIS">ECDIS</option>
                      <option value="SIRE REFRESHER">SIRE REFRESHER</option>
                    </select>
                    <span class="help-block" 
                      v-if="errors.name_of_course"
                    >{{ errors.name_of_course[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Course Date</label>
                    <input type="text" class="form-control" placeholder="Enter course date"
                      v-model="form.course_date"
                    >
                    <span class="help-block" 
                      v-if="errors.course_date"
                    >{{ errors.course_date[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Place of course</label>
                    <input type="text" class="form-control" placeholder="Enter place of course"
                      v-model="form.place_of_course"
                    >
                    <span class="help-block" 
                      v-if="errors.place_of_course"
                    >{{ errors.place_of_course[0] }}</span>
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                    >Update Inspector OCIMF REfresher Course Details</button>
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
  name: 'EditInspectorPassportDetails',
  async asyncData({$axios, params}) {
    let inspector = await $axios.get(`/users/${params.employeeId}`)
    let ocimf = await $axios.get(`/users/${params.employeeId}/ocimf_refresher_courses/${params.id}`)
    return {
      inspector: inspector.data.data,
      form: ocimf.data.data
    }
  },
  methods: {
    async store() {
      try {
        await this.$axios.patch(`/users/${this.$route.params.employeeId}/ocimf_refresher_courses/${this.$route.params.id}`, this.form)
        this.$router.push(`/organizations/${this.organization.value}/employees/${this.$route.params.employeeId}/full`)
      }
      catch(e) {

      }
    }
  }
}
</script>