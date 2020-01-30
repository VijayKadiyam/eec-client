<template>
  <section>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Inspector ({{ inspector.first_name }} {{ inspector.last_name }}) Visas</h1>
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
                  <h3 class="card-title">Editt Inspector Visa Details</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <div class="card-body">
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
                    <label class="form-label">Is Schengen</label>
                    <select class="form-control custom-select"
                      v-model="form.is_shengen"
                    >
                      <option value="">Select Yes/No</option>
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                    <span class="help-block" 
                      v-if="errors.is_shengen"
                    >{{ errors.is_shengen[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Entry Type</label>
                    <select class="form-control custom-select"
                      v-model="form.entry_type"
                    >
                      <option value="">Select entry SINGLE</option>
                      <option value="SINGLE">SINGLE</option>
                      <option value="MULTIPLE">MULTIPLE</option>
                    </select>
                    <span class="help-block" 
                      v-if="errors.entry_type"
                    >{{ errors.entry_type[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Type of Visa</label>
                    <select class="form-control custom-select"
                      v-model="form.type_of_visa"
                    >
                      <option value="">Select type of visa</option>
                      <option value="Visit / Tourist">Visit / Tourist</option>
                      <option value="Business">Business</option>
                    </select>
                    <span class="help-block" 
                      v-if="errors.type_of_visa"
                    >{{ errors.type_of_visa[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Date of issue</label>
                    <input type="text" class="form-control" placeholder="Enter date of issue"
                      v-model="form.date_of_issue"
                    >
                    <span class="help-block" 
                      v-if="errors.date_of_issue"
                    >{{ errors.date_of_issue[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Date of expiry</label>
                    <input type="text" class="form-control" placeholder="Enter date of expiry"
                      v-model="form.date_of_expiry"
                    >
                    <span class="help-block" 
                      v-if="errors.date_of_expiry"
                    >{{ errors.date_of_expiry[0] }}</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Attachment</label>
                    <input type="text" class="form-control" placeholder="Enter attachment"
                      v-model="form.attachment"
                    >
                    <span class="help-block" 
                      v-if="errors.attachment"
                    >{{ errors.attachment[0] }}</span>
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
export default {
  name: 'EditInspectorPassportDetails',
  async asyncData({$axios, params}) {
    let inspector = await $axios.get(`/users/${params.employeeId}`)
    let visa = await $axios.get(`/users/${params.employeeId}/visas/${params.id}`)
    return {
      inspector: inspector.data.data,
      form: visa.data.data
    }
  },
  methods: {
    async store() {
      try {
        await this.$axios.patch(`/users/${this.$route.params.employeeId}/visas/${this.$route.params.id}`, this.form)
        this.$router.push(`/organizations/${this.organization.value}/employees/${this.$route.params.employeeId}/full`)
      }
      catch(e) {

      }
    }
  }
}
</script>