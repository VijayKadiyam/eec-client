<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Inspector ({{ inspector.first_name }} {{ inspector.last_name }}) Passports</h1>
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
                  <h3 class="card-title">Edit Inspector Passport Details</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Name on Passport</label>
                    <input type="text" class="form-control" placeholder="Enter name on passport"
                      v-model="form.name_on_passport"
                    >
                    <span class="help-block" 
                      v-if="errors.name_on_passport"
                    >{{ errors.name_on_passport[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Passport Number</label>
                    <input type="text" class="form-control" placeholder="Enter passport number"
                      v-model="form.passport_number"
                    >
                    <span class="help-block" 
                      v-if="errors.passport_number"
                    >{{ errors.passport_number[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Alternate Phone</label>
                    <input type="number" class="form-control" placeholder="Enter alternate phone"
                      v-model="form.alt_phone"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Place of Issue</label>
                    <input type="text" class="form-control" placeholder="Enter place of issue"
                      v-model="form.place_of_issue"
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Date of issue</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>
                      </div>
                      <input type="text" class="form-control" placeholder="dd/mm/yyyy" v-model="form.date_of_issue">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Date of expiry</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>
                      </div>
                      <input type="text" class="form-control" placeholder="dd/mm/yyyy" v-model="form.date_of_expiry">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Country</label>
                    <input type="text" class="form-control" placeholder="Enter country"
                      v-model="form.country"
                    >
                  </div>
                  <div class="form-footer">
                    <button class="btn btn-primary btn-block"
                      @click="store"
                    >Update Inspector Passport Details</button>
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
  name: 'EditInspectorPassportDetails',
  async asyncData({$axios, params}) {
    let inspector = await $axios.get(`/users/${params.employeeId}`)
    let passport = await $axios.get(`/users/${params.employeeId}/passports/${params.id}`)
    return {
      inspector: inspector.data.data,
      form: passport.data.data
    }
  },
  data: () => ({
    form: {
      active: 1,
      role_id: ''
    },
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
        await this.$axios.patch(`/users/${this.$route.params.employeeId}/passports/${this.$route.params.id}`, this.form)
        this.$router.push(`/organizations/${this.organization.value}/employees/${this.$route.params.employeeId}/full`)
      }
      catch(e) {

      }
    }
  }
}
</script>